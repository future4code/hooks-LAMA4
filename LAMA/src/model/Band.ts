export default class Band {
   constructor(
       private id: string,
       private name: string,
       private music_genre: string,
       private responsible: string
   ) { }

   public getId() {
       return this.id
   }

   public getName() {
       return this.name
   }
   public getGenre() {
       return this.music_genre
   }
   public getResponsible() {
       return this.responsible
   }
} 