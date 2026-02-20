import bcrypt from 'bcrypt';
import userDal from './user.dal';

class UserController {

  register = async (req, res) =>{
    try {
       let { name_user, last_name, phone, email, province, city, password, type } = req.body;

        // Si type es null o undefined, asignar 3 (cliente)
        if (type === null || type === undefined) {
          type = 3;
        }
        
        let hashedPass = await bcrypt.hash(password, 10);

        let values = [name_user, last_name, phone, email, province, city, hashedPass, type]

        await userDal.register(values)


    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Error al registrar al usuario"})
      
    }
  }

}

export default new UserController();