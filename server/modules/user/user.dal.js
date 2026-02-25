import executeQuery from "../../config/db.js";

class UserDal {

  register = async(values)=>{
    try {
      let sql = "INSERT INTO users (name_user, last_name, type, city, province, email, password, phone) VALUES (?,?,?,?,?,?,?,?)"
      let result = await executeQuery(sql, values)
      return result

    } catch (error) {
      throw error;
    }
  }

   verifyEmail = async (email) => {
    try {
      let sql = "UPDATE users SET is_confirmed = 1 WHERE email = ?";
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

    findUserByEmail = async (email) => {
    try {
      let sql =
        "SELECT user_id, password, is_confirmed FROM users WHERE email = ? AND is_deleted = 0";
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

   userByToken = async (id) => {
    try {
      let sql =
        `SELECT 
    u.user_id,
    u.name_user,
    u.last_name,
    u.email,
    u.type,
    u.city,
    u.province,
    u.phone,
    u.picture_user,

    c.car_id,
    c.model,
    c.year,
    c.price,
    c.number_of_owners,
    c.kilometres,
    c.description,

    JSON_ARRAYAGG(g.file) AS pictures

FROM users u

LEFT JOIN car c 
ON u.user_id = c.user_id 
AND c.car_is_deleted = 0

LEFT JOIN gallery g 
ON c.car_id = g.car_id
AND g.image_is_deleted = 0

WHERE u.user_id = ?

GROUP BY c.car_id;`;
      let result = await executeQuery(sql, [id]);
     
      const car = []
      const user = {
        user_id: result[0].user_id,
        name_user: result[0].name_user,
        last_name: result[0].last_name,
        email: result[0].email,
        city: result[0].city,
        province: result[0].province,
        phone: result[0].phone,
        picture_user: result[0].picture_user,
        type: result[0].type
      }

       result.forEach(e => {
        if (e.car_id) {
          car.push({
            user_id: e.user_id,
            car_id: e.car_id,
            model: e.model,
            year: e.year,
            price: e.price,
            number_of_owners: e.number_of_owners,
            kilometres: e.kilometres,
            description: e.description
          })
        }
      })
     

      return {user, car};
    } catch (error) {
      throw error;
    }
  };

 

  editUser = async(values)=>{
    try {
      let sql = 'UPDATE users SET name_user=?, last_name=?, city=?, province=?, phone=? WHERE user_id = ? AND is_deleted = 0'

      if (values.length === 7) {
          sql = 'UPDATE users SET name_user=?, last_name=?, city=?, province=?, phone=?, picture_user=? WHERE user_id = ? AND is_deleted = 0'
      }

      await executeQuery(sql, values);
    } catch (error) {
      throw error
    }
  }

  allUsersCars = async()=>{
    try {
      let sql = `SELECT 
    u.user_id,
    u.name_user,
    u.last_name,
    u.picture_user,
    c.car_id,
    c.model,
    c.year,
    c.price,
    MIN(g.file) AS file
FROM users AS u
JOIN car AS c
    ON u.user_id = c.user_id
JOIN gallery AS g
    ON c.car_id = g.car_id
WHERE 
    u.is_deleted = 0
    AND c.car_is_deleted = 0
    AND g.image_is_deleted = 0
GROUP BY 
    c.car_id, u.user_id`

    let result = await executeQuery(sql);
    return result
    } catch (error) {
      throw error
    }
  }

 

}

export default new UserDal();