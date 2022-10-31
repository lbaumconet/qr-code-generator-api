const express = require("express");
const QRCode = require("qrcode");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/api/v1", async (req, res) => {
  const { data } = req.query;

  if (!data) {
    res.json({ error: "parameter data required to string" });
    return;
  }

  const url = await QRCode.toDataURL(data);

  res.json({ base64: url.substring(url.indexOf(",") + 1), url });
});

app.post("/api/v1", async (req, res) => {
  const data = req.body?.data;

  if (!data) {
    res.json({ error: "body is missing data property" });
    return;
  }

  const url = await QRCode.toDataURL(data);

  res.json({ base64: url.substring(url.indexOf(",") + 1), url });
});

app.get("/", (_, res) => {
  res.json({ api: "/api/v1" });
});

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
