import { Router } from "express";
import BandBusiness from "../business/BandBusiness";
import BandController from "../controller/BandController";
import { BandDataBase } from "../data/BandDataBase";
import { Authenticator } from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";

export const bandRouter = Router()

const bandBusiness = new BandBusiness(
new BandDataBase(),
new Authenticator(),
new IdGenerator())

const bandController = new BandController(bandBusiness)

bandRouter.post("/add", bandController.createBandController)