// Importando o Express e o módulo fs
const express = require('express');
const fs = require('fs');

// Inicializando o app
const app = express();
const port = 3001;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Caminho do arquivo JSON
const usuariosPath = './usuarios.json';

// Função para ler os usuários do arquivo JSON
function lerUsuarios() {
  try {
    const data = fs.readFileSync(usuariosPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log('Erro ao ler o arquivo:', err);
    return [];
  }
}

// Função para salvar os usuários no arquivo JSON
function salvarUsuarios(usuarios) {
  try {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2), 'utf8');
  } catch (err) {
    console.log('Erro ao salvar os usuários:', err);
  }
}

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Gerenciador de Usuários!');
});

// Listar todos os usuários
app.get('/usuarios', (req, res) => {
  const usuarios = lerUsuarios();
  res.json(usuarios);
});

// Adicionar um novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, idade } = req.body;
  const usuarios = lerUsuarios();
  const novoUsuario = { id: usuarios.length + 1, nome, idade };
  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);
  res.status(201).json(novoUsuario);
});

// Atualizar um usuário existente
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;
  const usuarios = lerUsuarios();
  const usuario = usuarios.find(u => u.id === parseInt(id));

  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  usuario.nome = nome || usuario.nome;
  usuario.idade = idade || usuario.idade;
  salvarUsuarios(usuarios);
  res.json(usuario);
});

// Deletar um usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  let usuarios = lerUsuarios();
  const index = usuarios.findIndex(u => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  usuarios.splice(index, 1);
  salvarUsuarios(usuarios);
  res.status(204).send();
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
