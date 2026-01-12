export default function handler(req, res) {
  const {
    title = 'Capítulo 1',
    percent = 50,
    color = '30e66a'
  } = req.query;

  const safePercent = Math.min(100, Math.max(0, Number(percent)));
  const barWidth = (safePercent / 100) * 300;

  const svg = `
<svg width="450" height="150" viewBox="0 0 450 150"
     xmlns="http://www.w3.org/2000/svg">

  <style>
    .title {
      font: 600 16px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
      fill: #2dd4bf;
    }
    .label {
      font: 400 13px -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
      fill: #c9d1d9;
    }
  </style>

  <rect x="0.5" y="0.5" rx="12" ry="12"
        width="449" height="149"
        fill="#0d1117"
        stroke="#30363d"/>

  <text x="20" y="32" class="title">${title}</text>

  <rect x="20" y="60" rx="5" ry="5"
        width="300" height="8"
        fill="#30363d"/>

  <rect x="20" y="60" rx="5" ry="5"
        width="${barWidth}" height="8"
        fill="#${color}"/>

  <circle cx="24" cy="95" r="5" fill="#${color}"/>

  <text x="36" y="99" class="label">
    ${title} — ${safePercent}%
  </text>
</svg>
`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);
}
