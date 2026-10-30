export function HouseSigil({ symbol, name }: { symbol: string; name: string }) {
  return <div className="house-sigil" role="img" aria-label={`Emblema de ${name}`}><span aria-hidden="true">{symbol}</span></div>;
}
