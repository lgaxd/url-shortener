import { MongoClient } from "mongodb";

let mongoClient;

export default async function conectarAoBanco(stringConexao) {
  if (!mongoClient) {
    try {
      console.log("Conectando ao cluster do banco de dados...");
      mongoClient = new MongoClient(stringConexao, {
        useUnifiedTopology: true,
      });
      await mongoClient.connect();
      console.log("Conexão ao MongoDB Atlas estabelecida com sucesso!");
    } catch (erro) {
      console.error("Erro ao conectar ao MongoDB:", erro);
      process.exit(1);
    }
  }
  return mongoClient;
}
