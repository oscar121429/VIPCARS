import executeQuery from "../../config/db.js";

class AdminDal {

   getAllUsers = async()=>{
    try {
      let sql = `  SELECT 
      user_id,
      name_user,
      last_name,
      email,
      phone,
      picture_user,
      is_deleted
    FROM users
    WHERE type = 3
    AND is_deleted = 0`

    let result = await executeQuery(sql);
    return result

    } catch (error) {
      throw error
    }
  }

  blockUser = async(user_id)=>{
    try {
      let sql = ` UPDATE users
    SET is_deleted = NOT is_deleted
    WHERE user_id = ?`
    
    let result = await executeQuery(sql, [user_id]);
    return result

    } catch (error) {
      throw error
    }
  }

}

export default new AdminDal();