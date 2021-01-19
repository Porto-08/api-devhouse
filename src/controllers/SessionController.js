//metodos: index, show, update, store, destroy
import User from "../models/User";
import * as Yup from "yup";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });
    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: "Email invalido!" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
      return res.json({
        message: `Usuario cadastrado com sucesso! Bem vindo, ${user.email}`,
      });
    }
    return res.json(user);
  }
}

export default new SessionController();
