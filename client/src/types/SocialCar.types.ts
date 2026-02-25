export interface SocialCar {
  user_id: number;
  name_user: string;
  last_name: string;
  picture_user: string;
  car_id: number;
  model: string;
  year: number;
  price: number;
  file: string;
}

export interface AllUsersCarsResponse {
  result: SocialCar[];
}