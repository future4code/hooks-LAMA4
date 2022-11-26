export default class Ticket{
    constructor(
        private id: string,
        private name : string,
        private value : number,
        private quantity : number,
    ){}
}

export interface TicketInputDTO  {
    name : string
    value : number
    showId : string
    quantity : number
}


export type TicketShow ={
    id : string
    name : string
    value : number
    quantity : number
    show_id : string
}