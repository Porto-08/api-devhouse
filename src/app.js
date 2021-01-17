import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();

    //conexao com o banco
    mongoose.connect(
      "mongodb+srv://devhouse:Elaedmais_18@devhouse.2ixbi.mongodb.net/devhouse?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // executando meus metodos
    this.middlewares();
    this.routes();
  }

  // criando metodo de middlewares e rotas
  middlewares() {
    this.server.use(cors());
    //middlewares para acessar as imagens da aplicação
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
