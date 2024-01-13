import express from "express";
import { config } from "dotenv"; config();
import { routes } from "./src/app/importsRoutes";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((err: any, req: any, res: any, next: any) => {
  if(err instanceof SyntaxError){
    res.status(400).json({ message: 'No se pudo procesar la solicitud, error de sintaxis.' });
  } else {
    next(err); 
  }
});


app.use(routes);
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});
