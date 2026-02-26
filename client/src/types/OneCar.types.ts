export interface OneSocialCar {
   car_id:  number;
  model: string;
  year: number;
  price:number;
  number_of_owners:number;
  kilometres:number;
  description: string;
  main_image:string;
}

export interface OneCarResponse {
  car: OneSocialCar;
}