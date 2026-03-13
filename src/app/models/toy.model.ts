export interface ToyModel {
  id: number;               // Jedinstveni identifikator igračke
  name: string;             // Naziv igračke [cite: 7, 10, 12]
  description: string;      // Opis igračke [cite: 7, 10, 12]
  type: string;             // Tip (npr. slagalica, figura, karakter...) [cite: 7, 10, 12]
  ageGroup: string;         // Uzrast (npr. 3-5 godina) [cite: 7, 10, 12]
  targetGroup: 'svi' | 'dečak' | 'devojčica'; // Ciljna grupa [cite: 7, 10, 12]
  productionDate: string;   // Datum proizvodnje [cite: 7, 10, 12]
  price: number;            // Cena igračke [cite: 7, 10, 12]
  imageUrl: string;         // Putanja do slike (npr. /img/1.png)
  rating: number;           // Ocena igračke (1-5) [cite: 12, 16]
  
  // Polja potrebna za simulaciju korpe i rezervacija 
  status?: 'rezervisano' | 'pristiglo' | 'otkazano'; // Status naručene igračke [cite: 12, 15]
  userReview?: string;      // Recenzija koju ostavlja korisnik [cite: 10, 16]
}