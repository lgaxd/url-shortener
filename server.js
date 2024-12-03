import express from "express";
import routes from "./src/routes/urlRoutes.js";
import dotenv from "dotenv";
import conectarAoBanco from "./src/config/dbconfig.js";

dotenv.config();

conectarAoBanco(process.env.STRING_CONEXAO)
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

dotenv.config();

const app = express();
const router = express.Router();

routes(router);

app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000...");
});