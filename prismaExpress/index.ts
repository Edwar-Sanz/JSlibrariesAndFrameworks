import express from 'express';
import userRoutes from './src/routes/userRoutes';
import { config } from 'dotenv'; config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});
