import { encurtarUrl, encontrarUrlOriginal, encontrarUrlEncurtada } from "../models/urlModel.js";
import shortid from "shortid";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    let url = await encontrarUrlEncurtada(originalUrl);
    if (url) {
      return res.json({ shortUrl: `${BASE_URL}/${url.shortUrl}` });
    }

    const shortUrl = shortid.generate();
    await encurtarUrl(originalUrl, shortUrl);

    res.json({ shortUrl: `${BASE_URL}/${shortUrl}` });
  } catch (err) {
    console.error("Erro ao encurtar URL:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getUrl(req, res) {
  try {
    const shortUrl = req.params.code;
    const url = await encontrarUrlOriginal(shortUrl);

    if (url) {
      return res.redirect(url.originalUrl);
    }

    res.status(404).json({ message: "URL not found" });
  } catch (err) {
    console.error("Erro ao buscar URL:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}