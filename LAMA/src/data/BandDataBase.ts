import Band from "../model/Band";
import { BaseDatabase } from "../connection/BaseDatabase";
import { ShowsDays } from "../types/BandInputDTO";


export class BandDataBase extends BaseDatabase{
   protected TABLE_NAME = "TABELA_BANDAS"
   protected TABLE_SHOWS = "TABELA_SHOWS"

   async insertBand(band:Band){
      try{
         const result =  await BaseDatabase.connection(this.TABLE_NAME)
         .insert(band)

         return result
      }catch (error:any){
         throw new Error(error.sqlMessage || error.message)
      }
    }


   async selectNameBand(name:string){
      try{
         const result = await BaseDatabase.connection(this.TABLE_NAME)
         .select("*")
         .where({name : name})
          
         return result

      }catch(error:any){
         throw new Error(error.sqlMessage || error.message)
      }
   }


   public async detailsBand (idBand : string){
      const result = await BaseDatabase.connection(this.TABLE_NAME).select("*")
      .where({id : idBand})
      return result
   }

   public async showsDays(addedShows : ShowsDays){
      const result = await BaseDatabase.connection(this.TABLE_SHOWS).insert(addedShows)
      return result
   }

   public async searchShows(days : string , order : string){
      const result = await BaseDatabase.connection(this.TABLE_SHOWS).select("*")
      .where({week_day : days})

      .orderBy('start_time' , `${order}`)

      return result
   }
}