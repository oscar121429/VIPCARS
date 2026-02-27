import carDal from "./car.dal.js";

class CarController {

  newCar = async (req, res) => {
    try {
      const { model, year, price, number_of_owners, kilometres, description } = JSON.parse(req.body.newCar);
      const { user_id } = req;

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

      res.status(200).json({ message: "creado correctamente", carId });
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  getCarsByUser = async (req, res) => {
    const { user_id } = req.params;

    try {

      const rows = await carDal.getCarsByUser(user_id);

      const cars = {};

      rows.forEach(row => {

        // si no existe ese coche aún lo creamos
        if (!cars[row.car_id]) {
          cars[row.car_id] = {
            car_id: row.car_id,
            model: row.model,
            year: row.year,
            price: row.price,
            number_of_owners: row.number_of_owners,
            kilometres: row.kilometres,
            description: row.description,
            user_id: row.user_id,
            images: []
          };
        }

        // si hay imagen la añadimos
        if (row.image_id) {
          cars[row.car_id].images.push({
            image_id: row.image_id,
            file: row.file
          });
        }

      });

      const carsArray = Object.values(cars);

      return res.json({
        car: carsArray
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting cars" });
    }
  };

  getImages = async (req, res) => {
    const { car_id } = req.params;
    try {
      const result = await carDal.getImages(car_id);

      res.status(200).json({ message: 'imagenes recibidas', result })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  addPictures = async (req, res) => {
    try {
      const { car_id } = req.params;
      let updatePics = await carDal.addPictures(req.files, car_id);

      res.status(200).json({
        message: "todo oki",
        updatePics
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  delImage = async (req, res) => {
    const { car_id, image_id } = req.body;
    try {
      await carDal.delImage([image_id, car_id]);
      res.status(200).json({ message: "del ok" })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  delLogicCar = async (req, res) => {
    const { car_id } = req.params;
    try {
      await carDal.delLogicCar(car_id);
      res.status(200).json({ message: "borrado lógico completado" })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  updateCar = async (req, res) => {
    try {
      const { car_id } = req.params;
      const { model, year, price, number_of_owners, kilometres, description } = req.body;

      let values = [model, year, price, number_of_owners, kilometres, description, car_id];

      let updatedCar = await carDal.updateCar(values);
      res.status(200).json({ message: "edición completada", updatedCar })

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  carById = async (req, res) => {
    const { car_id } = req.params;
    try {
      let rows = await carDal.carById(car_id);

      if (!rows.length) {
        return res.status(404).json({ message: "Coche no encontrado" });
      }

      res.status(200).json({
        car: rows[0]
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

}

export default new CarController();