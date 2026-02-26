import adminDal from "./admin.dal.js";

class AdminController {

  getAllUsers = async (req, res) => {
    try {
      let rows = await adminDal.getAllUsers();

      if (!rows.length) {
        return res.status(404).json({
          message: "No hay usuarios"
        });
      }

      res.status(200).json({
        users: rows
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);

    }
  }

  blockUser = async(req, res)=>{
      const { user_id } = req.params;
        try {

    await adminDal.blockUser(user_id);

    res.status(200).json({
      message:"Usuario actualizado"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error servidor"});
  }
  }

}

export default new AdminController();