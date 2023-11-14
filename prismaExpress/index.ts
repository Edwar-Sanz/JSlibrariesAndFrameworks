import express from 'express';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import postRoutes from './src/routes/postRoutes';
import { config } from 'dotenv'; config();


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes, authRoutes, postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});
