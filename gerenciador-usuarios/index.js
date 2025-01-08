// Importando o Express
const express = require('express');

// Inicializando o app
const app = express();

// Definindo a porta
const port = 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Gerenciador de Usuários!');
});


// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


let usuarios = [
    {id:1, nome:'Thalyson', idade:25},
    {id:2, nome:'Catarina', idade:40},
    {id:3, nome:'Andrei', idade:36},
]


// Listar todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
  });
  
  // Adicionar um novo usuário
  app.post('/usuarios', (req, res) => {
    const { nome, idade } = req.body;
    const novoUsuario = { id: usuarios.length + 1, nome, idade };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
  });
  
  // Atualizar um usuário existente
  app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const usuario = usuarios.find(u => u.id === parseInt(id));
  
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  
    usuario.nome = nome || usuario.nome;
    usuario.idade = idade || usuario.idade;
    res.json(usuario);
  });
  
  // Deletar um usuário
  app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === parseInt(id));
  
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  
    usuarios.splice(index, 1);
    res.status(204).send();
  });
  