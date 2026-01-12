export default function handler(req, res) {
  const {
    title = 'Capítulo 1',
    percent = 50,
    color = '30e66a'
  } = req.query;

  const safePercent = Math.min(100, Math.max(0, Number(percent)));
  const barWidth = (safePercent / 100) * 300;

  const svg = `
<svg width="450" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="#0d1117" stroke="#30363d"/>
  <text x="20" y="32" fill="#2dd4bf"
        font-size="16" font-weight="600"
        font-family="Segoe UI, Helvetica, Arial">
    ${title}
  </text>

  <rect x="20" y="60" width="300" height="8" rx="4" fill="#30363d"/>
  <rect x="20" y="60" width="${barWidth}" height="8" rx="4" fill="#${color}"/>

  <circle cx="24" cy="95" r="5" fill="#${color}"/>
  <text x="36" y="99" fill="#c9d1d9"
        font-size="13"
        font-family="Segoe UI, Helvetica, Arial">
    ${title} — ${safePercent}%
  </text>
</svg>
`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);
}
