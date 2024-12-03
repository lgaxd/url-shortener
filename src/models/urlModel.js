import conectarAoBanco from "../config/dbconfig.js";

export async function encurtarUrl(originalUrl, shortUrl) {
  const client = await conectarAoBanco(process.env.STRING_CONEXAO);
  const db = client.db("url-shortener");
  const colecao = db.collection("shortened-urls");

  const resultado = await colecao.insertOne({
    originalUrl,
    shortUrl,
    createdAt: new Date(),
  });

  return resultado.insertedId;
}

export async function encontrarUrlOriginal(shortUrl) {
  const client = await conectarAoBanco(process.env.STRING_CONEXAO);
  const db = client.db("url-shortener");
  const colecao = db.collection("shortened-urls");

  return colecao.findOne({ shortUrl });
}

export async function encontrarUrlEncurtada(originalUrl) {
  const client = await conectarAoBanco(process.env.STRING_CONEXAO);
  const db = client.db("url-shortener");
  const colecao = db.collection("shortened-urls");

  return colecao.findOne({ originalUrl });
}