import House from "../models/House";
import User from "../models/User";

class HouseController {
  // filtro se a casa esta disponivel ou nao
  async index(req, res) {
    // pegando a query que mando via HTTP
    const { status } = req.query;
    // procurando a casa de acordo com a query passada
    const houses = await House.find({ status });
    // listando as casas encontradas
    return res.json(houses);
  }

  // cadastrando uma nova casa
  async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }

  // editando uma casa
  async update(req, res) {
    // recebendo id da casa que quero editar
    const { house_id } = req.params;
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      res.status(401).json({ error: "Não Autorizado.  " });
    }

    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    return res.send();
  }

  // excluindo uma casa
  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      res.status(401).json({ error: "Não Autorizado.  " });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.json({ message: "Casa deletada com sucesso!" });
  }
}

export default new HouseController();
