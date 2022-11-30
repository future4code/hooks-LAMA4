import { Router } from "express";
import BandController from "../controller/BandController";

export const bandRouter = Router()

const bandController = new BandController()

bandRouter.post("/add", bandController.createBandController)
bandRouter.post("/added/:bandId" , bandController.showsDays)
bandRouter.post("/ticket/:showId" , bandController.createTicket)

bandRouter.get("/details/:idBand" , bandController.detailsBand)
bandRouter.get("/search" , bandController.searchShows)