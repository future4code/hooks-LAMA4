export type BandInputDTO = {
   name: string,
   music_genre: string,
   responsible: string
}

export enum DAYS_SHOWS{
   SEXTA = "SEXTA",
   SABADO = "SABADO",
   DOMINGO = "DOMINGO"
}

export interface ShowsDaysDTO {
   weekDay : string
   startTime : number
   endTime : number
    bandId : string
}

export type ShowsDays = {
   id: string
   week_day : string
   start_time : number
   end_time : number
   band_id : string
}