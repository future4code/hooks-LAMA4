import { Router } from "express";
import BandBusiness from "../business/BandBusiness";
import BandController from "../controller/BandController";
import { BandDataBase } from "../data/BandDataBase";
import { Authenticator } from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";

export const bandRouter = Router()

const bandController = new BandController()

bandRouter.post("/add", bandController.createBandController)
bandRouter.post("/added/:bandId" , bandController.showsDays)


bandRouter.get("/details/:idBand" , bandController.detailsBand)
bandRouter.get("/search" , bandController.searchShows)