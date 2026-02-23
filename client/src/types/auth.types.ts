export interface User {
  user_id: string;
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
  car_id: string;
  model: string;
  year: number;
  price:number;
  number_of_owners:number;
  kilometres:number;
  description: string;
}