import multer from "multer";
import path from "path";
export default {
  storage: multer.diskStorage({
    // lugar onde as fotos ficarao guardadas
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      // pegando o nome da extensao da foto
      const ext = path.extname(file.originalname);
      // pegando o nome da foto
      const name = path.basename(file.originalname, ext);

      // chamando o callback apos pegar as informacoes das imagens
      cb(null, `${name}-${Date.now()}-${ext}`);
    },
  }),
};
