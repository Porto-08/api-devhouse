import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";

import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import DashboardController from "./controllers/DashboardController";
import ReserveController from "./controllers/ReserveController";

const routes = new Router();
const upload = multer(uploadConfig); // importando minhas config de upload de img

// chamando meu metodo STORE do meu controler
routes.post("/sessions", SessionController.store);

routes.get("/houses", HouseController.index);
routes.post("/houses", upload.single("thumbnail"), HouseController.store);
routes.put("/houses/:house_id", upload.single("thumbnail"), HouseController.update);
routes.delete("/houses", HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/house/:house_id/reserve', ReserveController.store)
routes.get('/reserves', ReserveController.index)
routes.delete('/reserves/cancel', ReserveController.destroy)


export default routes;
