import carDal from "./car.dal.js";

class CarController {

  newCar = async(req, res)=>{
    try {
      const {model, year, price, number_of_owners, kilometres, description} = JSON.parse(req.body.newCar);
      const {user_id} = req;

      let data = {
        model,
        year,
        price,
        number_of_owners,
        kilometres,
        description,
        images: req.files,
        user_id
      }

      const carId = await carDal.newCar(data);

      res.status(200).json({message: "creado correctamente", carId});
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

}

export default new CarController();