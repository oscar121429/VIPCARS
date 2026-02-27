import bcrypt from 'bcrypt';
import userDal from './user.dal.js';
import jwt from "jsonwebtoken";
import { generateToken } from '../../utils/jwtUtils.js';
import { sendEmail } from '../../services/emailService.js';
import { compareString } from '../../utils/bcryptUtils.js';

class UserController {

  register = async (req, res) => {
    try {
      let { name_user, last_name, phone, email, province, city, password, type } = req.body;

      // Si type es null o undefined, asignar 3 (cliente)
      if (type === null || type === undefined) {
        type = 3;
      }

      let hashedPass = await bcrypt.hash(password, 10);

      let values = [name_user, last_name, type, city, province, email, hashedPass, phone]

      const result = await userDal.register(values);

      const token = generateToken({ email }, process.env.SECRET_TOKEN_KEY, { expiresIn: "1d" });

      const verifyUrl = `${process.env.BACKEND_URL}/user/verifyEmail/${token}`

      const html = `
    <div style="background:#f4efe8;padding:30px 12px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;padding:28px;font-family:Raleway,Arial,sans-serif;color:#3a2f2a;">

      <h1 style="margin:0 0 10px 0;font-family:Lora,Georgia,serif;font-size:28px;color:#6bb3a7;text-align:center;">
        Bienvenido a VipCar
      </h1>

      <p style="margin:0 0 14px 0;font-size:16px;line-height:1.5;text-align:center;">
        Hola <strong>${name_user}</strong>, gracias por registrarte.
      </p>

      <p style="margin:0 0 18px 0;font-size:16px;line-height:1.5;text-align:center;">
        Por favor, verifica tu cuenta aquí:
      </p>

      <div style="text-align:center;margin:20px 0 18px 0;">
        <a href="${verifyUrl}"
           style="display:inline-block;background:#6bb3a7;color:#ffffff;text-decoration:none;font-weight:700;
                  padding:12px 22px;border-radius:999px;font-size:15px;">
          Verificar mi cuenta
        </a>
      </div>

      <p style="margin:0;font-size:13px;color:#6a5a50;text-align:center;">
        Este enlace expira en 24 horas.
      </p>

      <hr style="border:none;border-top:1px solid rgba(0,0,0,0.08);margin:22px 0;" />

    </div>
  </div>
`;

      try {
        await sendEmail(email, html);
      } catch (error) {
        console.log('Error al enviar email:', error);
      }

      res.status(201).json({ message: "Registro completado. Revisa tu correo para verificar la cuenta." });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al registrar al usuario" })

    }
  }

  verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;

      const tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);

      await userDal.verifyEmail(tokenVerified.email);

      res.redirect(`${process.env.FRONTEND_URL}/login`);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'No se pudo verificar el email' });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let result = await userDal.findUserByEmail(email)

      if (result.length === 0) {
        res.status(401).json({ message: 'El email no existe' });
      } else if (result[0].is_confirmed === 0) {
        res.status(401).json({ message: 'Primero verifica tu email' });
      } else {
        let match = await compareString(password, result[0].password);

        if (match === false) {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        } else {
          const token = generateToken({ user_id: result[0].user_id });
          res.status(200).json({ message: 'Login ok', token });
        }
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al iniciar sesión' });

    }
  }

  userByToken = async (req, res) => {
    try {
      const { user_id } = req;

      const result = await userDal.userByToken(user_id);


      res.status(200).json({
        message: "Usuario cargado",
        user: result.user,
        car: result.car
      });

      console.log(".....................................", result.car);
      




    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al cargar el usuario' });
    }
  };

  editUser = async (req, res) => {
    try {
      const { name_user, last_name, city, province, phone, user_id } = JSON.parse(req.body.editUser);
      let values = [name_user, last_name, city, province, phone, user_id]

      if (req.file) {
        values = [name_user, last_name, city, province, phone, req.file.filename, user_id]
      }

      await userDal.editUser(values);

      res.status(200).json({
        message: "update oki",
        newAvatar: req.file?.filename
      })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  allUsersCars = async (req, res) => {
    try {
      let result = await userDal.allUsersCars();
      res.status(200).json({ message: "datos recibidos", result })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  userById = async (req, res) => {
    const { user_id } = req.params;
    try {

      let rows = await userDal.userById(user_id);

      if (!rows.length) {
        return res.status(404).json({
          message: "Usuario sin imágenes"
        });
      }

      let userProfile = {
        user_id: rows[0].user_id,
        name_user: rows[0].name_user,
        last_name: rows[0].last_name,
        picture_user: rows[0].picture_user,
        images: rows.map(r => r.file)
      };

      res.status(200).json({ userProfile });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error servidor" });
    }
  }

  

}

export default new UserController();