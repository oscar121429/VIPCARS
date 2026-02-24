import { dbPool } from "../../config/db.js";

class CarDal {

  newCar = async (data) => {
    const { model, year, price, number_of_owners, kilometres, description, user_id, images } = data;

    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      //1 insert del viaje
      let sql = 'INSERT INTO car (model, year, price, number_of_owners, kilometres, description, user_id) VALUES (?,?,?,?,?,?,?)'
      let values = [model, year, price, number_of_owners, kilometres, description, user_id]

      let result = await connection.query(sql, values);

      //rescato el id del car reción añadido
      const carId = result[0].insertId

      //insercción de las img del coche 
      let idImage = 0;
      images.forEach(async (image) => {
        let sql = 'INSERT INTO gallery (car_id, image_id, file) VALUES (?,?,?)';

        //incrementar el idImage, sumandole 1 
        idImage++;
        let values = [carId, idImage, image.filename]
        await connection.query(sql, values)

        //para confirmar el guardado en la bds
        await connection.commit();
        return carId
      })

    } catch (error) {
      //si hay algún error revertimos todo
      connection.rollback();
      throw error;

    } finally {
      if (connection) {
        connection.release();
      }
    }

  }

}

export default new CarDal();