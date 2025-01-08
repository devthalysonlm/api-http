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
