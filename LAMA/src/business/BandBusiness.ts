import { BandDataBase } from "../data/BandDataBase";
import { BaseError } from "../error/BaseError";
import Band from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import  {IdGenerator}  from "../services/IdGenerator";
import { BandInputDTO } from "../types/BandInputDTO";

export default class BandBusiness {
    constructor(
        private bandDataBase: BandDataBase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    async createBand(band:BandInputDTO, token:string){
       
        if (!token) {
            throw new BaseError(401,'Not authorized')
        }

        const authenticatorRole = this.authenticator.getData(token)

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

        const id = this.idGenerator.generate()

        const modelBand = new Band(
            id,
            name,
            music_genre,
            responsible
        )
        console.log(modelBand);
        

        await this.bandDataBase.insertBand(modelBand)
        
    }

}