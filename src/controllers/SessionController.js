//metodos: index, show, update, store, destroy
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    // procurando se o email existe
    let user = await User.findOne({ email });
    // se nao existe, casdastre um novo
    if(!user){
        user = await User.create({ email });
        return res.json({message: `Usuario cadastrado com sucesso! Bem vindo, ${user.email}`});
    }
    return res.json(user);
  }
}

export default new SessionController();
