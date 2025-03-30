import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions));

app.post('/users', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  });
  res.status(201).json(req.body);
});

app.get('/users', async (req, res) => {
  let user = [];
  if (req.query) {
    user = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    });
  } else {
    user = await prisma.user.findMany();
  }
  res.status(200).json(user);
});

app.put('/users/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  });
  res.status(200).json({ message: 'edit feito com sucesso!' });
});

app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({ message: 'Usuário deletado com Sucesso!' });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000!");
});
