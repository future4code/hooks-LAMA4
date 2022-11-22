import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import { BandInputDTO } from "../types/BandInputDTO";

export default class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) { }
     createBandController = async (req: Request, res: Response)=> {

      try {
         const { name, music_genre, responsible } = req.body

         const token: string = req.headers.authorization as string

         const input: BandInputDTO = {
            name, music_genre, responsible
         }

         const result = await  this.bandBusiness.createBand(input, token)

         console.log(result)
            
         res.status(201).send({message: "Added band"})

      } catch (error: any) {
         console.log(error.message);
         console.log( error.sqlMessage);
         res.send({ message: error.sqlMessage || error.message })
      }
   }
}