import type { CarFormErrors, CarPictures, CreateCarDTO } from "../types/addCar.types"


export const validateCar = (
  car: CreateCarDTO,
  pictures: CarPictures
): CarFormErrors => {

  const errors: CarFormErrors = {}

  if (!car.model.trim()) {
    errors.model = "El modelo es obligatorio"
  }

  if (!car.year || car.year < 1900) {
    errors.year = "Año inválido"
  }

  if (!car.price || car.price <= 0) {
    errors.price = "El precio debe ser mayor que 0"
  }

  if (car.number_of_owners < 0) {
    errors.number_of_owners = "Número de propietarios inválido"
  }

  if (car.kilometres < 0) {
    errors.kilometres = "Kilómetros inválidos"
  }

  if (!car.description.trim()) {
    errors.description = "Descripción obligatoria"
  }

  if (pictures.length === 0) {
    errors.pictures = "Debes subir al menos una imagen"
  }

  return errors
}