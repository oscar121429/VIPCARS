import type {  CarWithImages } from "./auth.types";



export interface CreateCarDTO {
  car_id:  number;
  model: string;
  year: number;
  price:number;
  number_of_owners:number;
  kilometres:number;
  description: string;
  user_id:number;
}

export type CarFormErrors = {
  model?: string
  year?: string
  price?: string
  number_of_owners?: string
  kilometres?: string
  description?: string
  pictures?: string
}

export interface CreateCarResponse {
  message: string;
  carId: number;
}

export type CarPictures = File[]



export interface GetCarsByUserResponse {
  car: CarWithImages[];
}