import Band from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";


export class BandDataBase extends BaseDatabase{
   protected TABLE_NAME = "TABELA_BANDAS"

   async insertBand(band:Band){
      try{
         const result =  await this.getConnection()
         .insert(band)

         return result
      }catch (error:any){
         throw new Error(error.sqlMessage || error.message)
      }
    }

   async selectNameBand(name:string){
      try{
         const [result] = await this.getConnection()
         .select("*")
         .where({name})
          
         return result

      }catch(error:any){
         throw new Error(error.sqlMessage || error.message)
      }
   }
}