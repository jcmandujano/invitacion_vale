import http from 'node:http';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep, extname } from 'node:path';
import { spawn } from 'node:child_process';

const root = resolve('dist');
const privateGuests = JSON.parse(await readFile(resolve('sombrero/src/private/guests.json'), 'utf8'));
const testGuest = privateGuests.find((guest) => guest.id === 'g23b');
if (!testGuest) throw new Error('Falta el registro de prueba del grupo de cinco lugares.');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!path.startsWith('/xv-vale-ruiz/')) { response.writeHead(404).end(); return; }
    let file = resolve(root, `.${path.slice('/xv-vale-ruiz'.length)}`);
    if (path.endsWith('/')) file = join(file, 'index.html');
    if (!file.startsWith(root + sep)) { response.writeHead(404).end(); return; }
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': mime[extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch { response.writeHead(404).end(); }
});
await new Promise((resolveServer) => server.listen(0, '127.0.0.1', resolveServer));
const port = server.address().port;
const startUrl = process.env.SMOKE_URL ?? `http://127.0.0.1:${port}/xv-vale-ruiz/`;
const profile = await mkdtemp(join(tmpdir(), 'sombrero-smoke-'));
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, startUrl,
], { stdio: 'ignore', windowsHide: true });
const pause = (ms) => new Promise((resolvePause) => setTimeout(resolvePause, ms));
let socket;
try {
  let debugPort;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { debugPort = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; }
    catch { await pause(100); }
  }
  if (!debugPort) throw new Error('Chrome no inició.');
  const pages = await fetch(`http://127.0.0.1:${debugPort}/json`).then((response) => response.json());
  const page = pages.find((item) => item.type === 'page');
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((ok, fail) => { socket.onopen = ok; socket.onerror = fail; });
  let id = 0;
  const pending = new Map();
  const runtimeErrors = [];
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text);
    const job = pending.get(message.id);
    if (!job) return;
    pending.delete(message.id);
    if (message.error) job.reject(new Error(message.error.message)); else job.resolve(message.result);
  };
  const command = (method, params = {}) => new Promise((ok, fail) => { const current = ++id; pending.set(current, { resolve: ok, reject: fail }); socket.send(JSON.stringify({ id: current, method, params })); });
  const evaluate = async (expression) => {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const waitFor = async (expression) => {
    for (let attempt = 0; attempt < 100; attempt++) { if (await evaluate(`!!(${expression})`)) return; await pause(100); }
    throw new Error(`No se cumplió: ${expression}`);
  };
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await waitFor('document.documentElement.dataset.appReady === "true"');
  await evaluate('document.querySelector(".skip-link").click()');
  await waitFor('document.documentElement.dataset.siteState === "ready"');
  if (!(await evaluate('document.documentElement.scrollWidth === innerWidth'))) throw new Error('Desbordamiento horizontal en la invitación.');
  await evaluate('document.querySelector("#tu-casa a").click()');
  await waitFor('location.pathname.endsWith("/sombrero/") && !!document.querySelector("input[type=search]")');
  await evaluate(`(() => { const input = document.querySelector('input[type=search]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, ${JSON.stringify(testGuest.displayName)}); input.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await waitFor('document.querySelector(".guest-results button")');
  await evaluate('document.querySelector(".guest-results button").click()');
  await waitFor('document.querySelector(".result-card")');
  if (!(await evaluate('document.querySelector(".result-card").textContent.includes("Ravenclaw") && document.querySelector(".result-card").textContent.includes("5 lugares")'))) throw new Error('La asignación no es la esperada.');
  if (!(await evaluate('(() => { const r = document.querySelector(".result-actions").getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; })()'))) throw new Error('Las acciones del resultado quedan fuera de la pantalla móvil.');
  await evaluate('document.querySelector(".round-button").click()');
  await evaluate('document.querySelector(".invitation-return").click()');
  await waitFor(`location.pathname === ${JSON.stringify(new URL(startUrl).pathname)} && document.documentElement.dataset.siteState === "ready"`);
  if (!(await evaluate('location.hash === "#tu-casa"'))) throw new Error('El enlace de regreso no conserva la sección.');
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await pause(300);
  const desktopMetrics = await evaluate('({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })');
  if (desktopMetrics.scrollWidth > desktopMetrics.width) throw new Error(`Desbordamiento horizontal en escritorio: ${JSON.stringify(desktopMetrics)}`);
  if (runtimeErrors.length) throw new Error(`Errores de JavaScript: ${runtimeErrors.join(', ')}`);
  console.log('Recorrido móvil integrado, subruta, búsqueda, resultado, regreso, movimiento reducido y anchura de escritorio: correctos.');
} finally {
  socket?.close();
  chrome.kill();
  server.closeAllConnections();
  await new Promise((done) => server.close(done));
  await pause(1000);
  await rm(profile, { recursive: true, force: true, maxRetries: 3 });
}
