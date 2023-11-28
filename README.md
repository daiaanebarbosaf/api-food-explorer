<h1 align="center" style="text-align: center;">
  <img alt="Logo do Food Explorer" src="./src/assets/icon.svg" style="vertical-align: text-top; margin-right: 10px; width:2.5rem;">
  Food Explorer
</h1>

É uma API para o desafio final do programa Explorer da Rocketseat. 
Trata-se de uma aplicação de cardápio digital para um restaurante fictício.

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<p align="center">
  <a href="#project">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#structure">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#features">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tools">Ferramentas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#consideration">Considerações Finais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">Licença</a>
</p>

<h2 id="project">📁 Projeto</h2>

Este é o back-end do projeto, que lida com a lógica e o armazenamento dos dados, está disponível neste repositório. Já o front-end, responsável pela interface do usuário, está disponível [aqui](https://foodexplorerdai.netlify.app).

<h2 id="structure">📌 Estrutura</h2>

O projeto conta com as seguintes tabelas:

Usuários;<br>
Pratos;<br>
Ingredientes dos pratos.<br>

<h2 id="features">🛠️ Funcionalidades</h2>

A aplicação apresenta as seguintes funcionalidades:

- Login
- Cadastro
- Cadastrar pratos
- Mostrar pratos cadastrados
- Filtrar pratos
- Mostrar detalhes do prato
- Remover prato dos favoritos
- Editar prato
- Excluir prato
- Logout

<h2 id="technologies">💻 Tecnologias</h2>

- CORS
- Dotenv
- Express.js
- express-async-errors
- JSON Web Token
- Knex.js
- Node.js
- Multer
- PM2
- SQLite
- SQLite3

<h2 id="usage">💡 Utilização</h2>
Você consegue acessar a hospedagem do back-end acessando: https://api-food-explorer-esuv.onrender.com.

Vale lembrar que o site em que ele está hospedado é gratuíto então pode haver lentidão ao tentar acessar o serviço.

Você também pode executá-la em sua máquina localmente. Certifique-se de ter o ``Node.js`` e o ``npm`` instalados antes de prosseguir com as etapas abaixo:

1. Clone o projeto:

```
$ git clone https://github.com/daiaanebarbosaf/api-food-explorer
```

2. Acesse a pasta do projeto:

```
$ cd api-food-explorer
```
3. Instale as dependências:
```
$ npm install
```
4. Execute as migrações:
```
$ npm run migrate
```
5. Inicie o servidor:
```
$ npm start
```

Crie um arquivo .env de acordo com o arquivo .env.example e preencha os campos AUTH_SECRET e PORT com suas respectivas informações.

- Para criar o campo AUTH_SECRET, você pode utilizar o MD5 Hash Generator.

- Preencha o campo PORT com o número da porta desejada para executar o servidor da aplicação.

<h2 id="tools">🛠️ Ferramentas</h2>

No inicio do projeto utilizei o ```Insomnia``` para simular o front-end.
O ```Beekeeper``` foi utilizado para ver o banco de dados e fazer ajustes nas tabelas enquanto a parte visual não estava pronta.

- Insomnia;
- Beekeeper.

<h2 id="#consideration">🥰 Considerações Finais</h2>

Com imensa satisfação, compartilho com você o meu primeiro projeto Full Stack em JavaScript, utilizando as tecnologias React e Node!<br>
Esta jornada foi extremamente desafiadora, proporcionando um aprendizado que vai além do que qualquer linguagem pode traduzir.<br> 
Espero que aprecie o que foi desenvolvido aqui.<br>
Estou aberta a sugestões e feedbacks, pois a verdadeira beleza está na constante evolução!

<h2 id="license">📝 Licença</h2>

Este projeto está sob a licença MIT.

---


<div style="display: flex;">
  <a href="https://www.linkedin.com/in/daiaanebarbosaf/" target="_blank">
  <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" style="margin-right: 2vw" target="_blank"></a>
  <a href="mailto:daiaanebarbosaf@gmail.com">
  <img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" style="margin-right: 2vw" target="_blank">
  </a>
  <a href="https://discord.com/users/daiaanebarbosaf#9926" target="_blank">
  <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" style="margin-right: 2vw" target="_blank"></a>
</div>
