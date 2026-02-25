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

  getImages = async(req, res)=>{
    const {car_id} = req.params;
    try {
      const result = await carDal.getImages(car_id);

      res.status(200).json({message:'imagenes recibidas', result})
    } catch (error) {
      console.log(error);
      
    }
  }

  addPictures = async(req, res)=>{
    try {
      const {car_id}=req.params;
      let updatePics = await carDal.addPictures(req.files, car_id);

      res.status(200).json({
        message: "todo oki",
        updatePics
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  delImage = async(req, res)=>{
    const {car_id, image_id} = req.body;
    try {
        await carDal.delImage([ image_id, car_id]);
      res.status(200).json({message: "del ok"})
    } catch (error) {
      console.log(error);
      
    }
  }

  delLogicCar = async(req, res)=>{
    const {car_id} = req.params;
    try {
      await carDal.delLogicCar(car_id);
      res.status(200).json({message: "borrado lógico completado"})
    } catch (error) {
      console.log(error);
      
    }
  }

  updateCar = async (req, res)=>{
    try {
      const {car_id} = req.params;
      const {model, year, price, number_of_owners, kilometres, description} = req.body;

      let values = [model, year, price, number_of_owners, kilometres, description, car_id];

      let updatedCar = await carDal.updateCar(values);
      res.status(200).json({message: "edición completada", updatedCar})

    } catch (error) {
      console.log(error);
      
    }
  }

}

export default new CarController();