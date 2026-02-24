export interface CreateCarDTO {
  model: string
  year: number
  price: number
  number_of_owners: number
  kilometres: number
  description: string
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

export type CarPictures = File[]