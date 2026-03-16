import { Injectable } from '@angular/core';
import { ToyModel } from './models/toy.model';;

@Injectable({
  providedIn: 'root',
})
export class Utils {
  // Funkcija za generisanje pune putanje do slike
  getToyImage(toy: ToyModel | null): string {
    if (!toy || !toy.imageUrl) {
      return 'https://placehold.co/400'; 
    }
    return `https://toy.pequla.com${toy.imageUrl}`;
  }

  formatDate(iso: string) {
    if (!iso) return '';
    return new Date(iso).toLocaleString('sr-RS', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}