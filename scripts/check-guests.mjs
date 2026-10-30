import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const guestList = fileURLToPath(new URL('../sombrero/src/private/guests.json', import.meta.url));
if (!existsSync(guestList)) {
  console.error('Falta sombrero/src/private/guests.json. El build oficial requiere la lista de invitados local.');
  process.exit(1);
}
