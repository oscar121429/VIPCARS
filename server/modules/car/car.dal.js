import executeQuery, { dbPool } from "../../config/db.js";

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

  getImages = async (car_id) => {
    try {
      let sql = 'SELECT * FROM gallery WHERE image_is_deleted = 0 AND car_id = ?'
      const result = await executeQuery(sql, [car_id]);


      return result;
    } catch (error) {
      throw error
    }
  }

  addPictures = async (files, car_id) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      //averiguar cual es el image_id mas alto
      let sql = 'SELECT IFNULL(MAX(image_id), 0) AS max_id FROM gallery WHERE car_id=?'

      let [result] = await connection.query(sql, [car_id]);
      let maxId = result[0].max_id;

      //hacer un bucle para insertar todas las fotos
      files.forEach(async elem => {
        maxId++
        let sqlImages = 'INSERT INTO gallery (car_id, image_id, file) VALUES (?,?,?)'
        let values = [car_id, maxId, elem.filename];
        await connection.query(sqlImages, values)
      })

      let sqlUpdateFiles = 'SELECT * FROM gallery WHERE car_id=? AND image_is_deleted = 0'
      let [updatePics] = await connection.query(sqlUpdateFiles, [car_id])

      await connection.commit();
      return updatePics
    } catch (error) {
      await connection.rollback();
      throw error

    } finally {
      //cerrar la conexion
      if (connection) {
        connection.release();
      }
    }
  }

  delImage = async (values) => {
    try {
      let sql = 'DELETE FROM gallery WHERE image_id=? AND car_id=?'
      await executeQuery(sql, values)
    } catch (error) {
      throw error
    }
  }

  delLogicCar = async (car_id) => {
    try {
      let sql = 'UPDATE car LEFT JOIN gallery ON car.car_id = gallery.car_id SET car.car_is_deleted = 1, gallery.image_is_deleted = 1 WHERE car.car_id = ?'
      await executeQuery(sql, [car_id]);
    } catch (error) {
      throw error
    }
  }

  updateCar = async (values) => {
    try {
      let sql = `UPDATE car
   SET 
      model = ?,
      year = ?,
      price = ?,
      number_of_owners = ?,
      kilometres = ?,
      description = ?
   WHERE car_id = ?
   AND car_is_deleted = 0`

      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error
    }
  }

  carById = async(car_id)=>{
    try {
      let sql = ` SELECT c.car_id,
  c.model,
  c.year,
  c.price,
  c.number_of_owners,
  c.kilometres,
  c.description,
  MIN(g.file) AS main_image
FROM car c
LEFT JOIN gallery g 
  ON c.car_id = g.car_id
  AND g.image_is_deleted = 0
  AND g.file IS NOT NULL
  AND g.file <> ''
WHERE c.car_id = ?
AND c.car_is_deleted = 0
GROUP BY c.car_id`

      let result = await executeQuery(sql, [car_id]);

      return result
      
    } catch (error) {
      throw error
    }
  }

}

export default new CarDal();