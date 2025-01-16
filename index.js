// index.js

//comentarios:
// coalase serve apra preservar o que ja esta, podendo assim editar apenas o desejado



const { AlunoController } = require("./src/controllers/ControllerAluno");
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController()


//alunos.adicionarAluno('maria','maria@email.com','849996060','3','Tec em enfermagem')
alunos.listarAluno();


//alunos.editarAluno("2", null, null, "(84) 99960-1461", null);