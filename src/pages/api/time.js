export default function handler(req, res) {
  const currentTime = new Date().toLocaleString();
  res.status(200).json({ time: currentTime });
}
