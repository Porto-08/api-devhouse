import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";

class ReserveController {
  async store(req, res) {
    const { house_id } = req.params;
    const { user_id } = req.headers;
    const { date } = req.body;

    const house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ error: "Imovel não existe. " });
    }
    if (house.status != true) {
      return res.status(400).json({ error: "Imovel ja está reservada. " });
    }
    const user = await User.findById(user_id);
    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ error: "Não autorizado. " });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    // populando meu retorno para o front-end ter mais dados.
    await reserve.populate("house").populate("user").execPopulate();

    return res.json(reserve);
  }

  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user: user_id }).populate("house");

    res.json(reserves);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await  Reserve.findByIdAndDelete({ _id: reserve_id });

    res.send()
  }
}

export default new ReserveController();
