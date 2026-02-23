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
        "SELECT user_id, name_user, last_name, type, city, province, email, phone, picture_user FROM users WHERE user_id = ? AND is_deleted = 0";
      let result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

}

export default new UserDal();