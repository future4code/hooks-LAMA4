import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import { BandDataBase } from "../data/BandDataBase";
import { BandInputDTO, ShowsDaysDTO } from "../types/BandInputDTO";

const bandBusiness = new BandBusiness(new BandDataBase())
export default class BandController {
 
     createBandController = async (req: Request, res: Response)=> {
      try {
         const { name, music_genre, responsible } = req.body

         const token = req.headers.authorization as string

         const input: BandInputDTO = {
            name, music_genre, responsible
         }

         const result = await bandBusiness.createBand(input, token)

         console.log(result)
            
         res.status(201).send({message: "Added band"})

      } catch (error: any) {
         console.log(error.message);
         console.log( error.sqlMessage);
         res.send({ message: error.sqlMessage || error.message })
      }
   }


   async detailsBand ( req : Request , res : Response){
      try{
        const idBand =  req.params.idBand as string
       

         const result = await bandBusiness.detailsBand(idBand)
         res.send(result)

      }catch (error: any) {
         console.log(error.message);
         console.log( error.sqlMessage);
         res.send({ message: error.sqlMessage || error.message })
   }
}

 async showsDays(req : Request , res : Response){
   try {
      const token = req.headers.authorization as string
      const input : ShowsDaysDTO = {
         weekDay : req.body.weekDay,
         startTime : req.body.startTime,
         endTime : req.body.endTime,
         bandId : req.params.bandId
      }

       await bandBusiness.showsDays(input , token)
      res.send({message : "Added Shows" , input})
   } catch (error : any) {
      res.send(error.message)
   }}

   async searchShows(req : Request , res : Response){
      try {
         let days = req.query.days as string
         let order = req.query.order as string
         const result = await bandBusiness.searchShows(days , order )
         
         res.send(result)
   

      } catch (error:any) {
         res.send(error.message)
      }
   }
}