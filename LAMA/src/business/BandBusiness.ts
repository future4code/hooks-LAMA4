import { localeData } from "moment";
import { BandDataBase } from "../data/BandDataBase";
import { BaseError } from "../error/BaseError";
import Band, { BandDTO } from "../model/Band";
import Ticket, { TicketShow } from "../model/Ticket";
import { Authenticator } from "../services/Authenticator";
import  {IdGenerator}  from "../services/IdGenerator";
import { BandInputDTO, ShowsDays, ShowsDaysDTO } from "../types/BandInputDTO";


const authenticator= new Authenticator()
 const idGenerator= new IdGenerator()


export default class BandBusiness {
    constructor(
       private bandDataBase : BandDataBase
    ){}

    async createBand(band:BandInputDTO, token:string){
       
        if (!token) {
            throw new BaseError(401,'Not authorized')
        }

        const authenticatorRole = authenticator.getData(token)

        if(authenticatorRole.role !== "ADMIN"){
            throw new BaseError(406,'Invalid values')
        }

        const {name, music_genre, responsible} = band
    
        const registeredNameBand = await this.bandDataBase.selectNameBand(name)
       
        if(registeredNameBand){
            throw new BaseError(409,"Band already registered")
        }

        if (!name || !music_genre || !responsible) {
            throw new BaseError(406,'Fill in the fields, please')
        }

        if (name !== String(name) || music_genre !== String(music_genre) || responsible !== String(responsible)) {
            throw new BaseError(406,'Invalid values')
        }

        const id = idGenerator.generate()

        const modelBand = new Band(
            id,
            name,
            music_genre,
            responsible
        )
        await this.bandDataBase.insertBand(modelBand)
        
    }

    async detailsBand(idBand : string){
        try{
            // if(!token){
            //     throw new Error("Insira o authorization")
            // }
           
          
           if(!idBand){
            throw new Error("Insira um id ")
           }

           if(idBand.length === 0){
            throw new Error("Insira um id correto")
           }

            const result = await this.bandDataBase.detailsBand(idBand)

            return result;
        }catch(error : any  ){
            console.log(error.message)
            console.log("Erro na business")
        }
    }

    async showsDays(input : ShowsDaysDTO , token : string){
        try {
            if(!token){
                throw new BaseError(401,'Not authorized')
            }
            const authenticatorRole = authenticator.getData(token)

            if(authenticatorRole.role !== "ADMIN"){
                throw new BaseError(406 , "Invalid values" )
            }

            const {weekDay , startTime , endTime , bandId} = input

            

            if(!weekDay || !startTime || !endTime || !bandId){
                throw new BaseError(406,'Fill in the fields, please')
            }
            
            if (isNaN(startTime) || !Number.isInteger(startTime) || isNaN(endTime) || !Number.isInteger(endTime) || startTime<8 || endTime<8 || startTime>23 || endTime>23) {
                throw new BaseError(401, `Start_time and end_time have to be an integer number between 8 and 23!`)
            };
    
            if (weekDay.toLowerCase() !== "friday" && weekDay.toLowerCase() !== "saturday" && weekDay.toLowerCase() !== "sunday") {
                throw new BaseError(422, `Week_day only accepts 'friday', 'saturday' or 'sunday' as a valid result`)
            }

            const id  = idGenerator.generate()
    
            const addedShows : ShowsDays = {
                id : id,
                week_day : weekDay,
                start_time : startTime,
                end_time : endTime,
                band_id : bandId
            }
        
            const result = await this.bandDataBase.showsDays(addedShows)
            
            return result
        } catch ( error : any) {
           throw new BaseError(400, error.message)
        }
      
    }

    async searchShows(days : string , order : string){
        try{
            if(!order){
                order = "asc"
            }
            if(!days){
                throw new BaseError(422, `Invalid fields!`)
            }

            if (days.toLowerCase() !== "friday" && days.toLowerCase() !== "saturday" && days.toLowerCase() !== "sunday") {
                throw new BaseError(422, `Week_day only accepts 'friday', 'saturday' or 'sunday' as a valid result`)
            };

            const result = await this.bandDataBase.searchShows(days , order)
            return result
        }catch(error:any){
            console.log(error.message)
        }
    }

    async createTicket(input : any , token : string) : Promise<Ticket>{
        try {
             if(!token){
                 throw new BaseError(401,'Not authorized')
            }

            const authenticatorRole = authenticator.getData(token)

            if(authenticatorRole.role !== "ADMIN"){
                throw new BaseError(406 , "Invalid values" )
            }

            const {name , value ,quantity , showId} = input 
            
            if(!name || !value || !quantity || !showId){
                throw new BaseError(406,'Fill in the fields, please')
            }

            if(quantity <= 0){
                throw new BaseError(402 , "Invalid amount")
            }

            const id  = idGenerator.generate()
            const addTicket : TicketShow = {
                id,
                name,
                value,
                quantity,
                show_id : showId
            }

            const result = await this.bandDataBase.createTicket(addTicket)

            return result
            
        } catch (error:any) {
            throw new BaseError(400 , error.message)
        }
    }
}