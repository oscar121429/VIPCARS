import type { Car } from "./auth.types";

export interface Gallery {
  image_id:string;
  car_id: Car["car_id"]
  file:string;
}

export interface GetCarImagesResponse {
  message: string;
  result: Gallery[];
}

export interface AddPicturesResponse {
  message: string;
  updatePics: Gallery[];
}