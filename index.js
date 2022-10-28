const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const QRCode = require("qrcode");

app.get("/api/v1", async (req, res) => {
  const { data } = req.query;
  console.log(req.query);

  if (!data) {
    res.json({ error: "parameter data required to string" });
    return;
  }

  const url = await QRCode.toDataURL(data);

  console.log(url.indexOf(","), url);

  res.json({ base64: url.substring(url.indexOf(",") + 1), dataBase64: url });
});

app.get("/", (req, res) => {
  res.json({ api: "/api/v1" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
