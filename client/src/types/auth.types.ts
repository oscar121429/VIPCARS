import type { Gallery } from "./images.type";

export interface User {
  user_id: number;
  name_user: string;
  last_name:string
  email: string;
  type: number;
  city:string;
  province:string;
  phone:string;
  picture_user:string;
}

export interface Car {
  car_id:  number;
  model: string;
  year: number;
  price:number;
  number_of_owners:number;
  kilometres:number;
  description: string;
  user_id:number;
}

export interface CarWithImages extends Car {
  images: Gallery[];
}

export interface UpdateCarResponse {
  message: string;
  updatedCar: Car;
}