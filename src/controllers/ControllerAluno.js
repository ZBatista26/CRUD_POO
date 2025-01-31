// Importações
const { pool } = require("../config/database");
const { Aluno } = require("../models/Aluno");
const { Curso } = require("../models/Curso"); // <== Adicione esta linha

class AlunoController {
    async adicionarAluno(nome, email, telefone, matricula, curso) {
        try {
            const consulta = `insert into aluno (nome, email, telefone, matricula, curso ) 
                              values ($1, $2, $3, $4, $5) RETURNING *`
            const valores = [nome, email, telefone, matricula, curso]
            const res = await pool.query(consulta, valores);
            console.table(res.rows[0])
        } catch (error) {
            console.error("Erro ao criar aluno:", error.message);
        }
    }

    async editarAluno(matricula, novoNome, novoEmail, novoTelefone, novoCurso) {
        try {
            const consulta = `select * from aluno where matricula = $1`
            const valores = [matricula];
            const resposta= await pool.query(consulta, valores)
            if (resposta.rows.length === 0) {
                return console.error("Aluno não encontrado!")
            }
            const consultaEditar = `update aluno set
                                    nome = coalesce ($2, nome),
                                    email = coalesce ($3, email),
                                    telefone = coalesce ($4, telefone),
                                    curso = coalesce ($5, curso)
                                    where matricula = $1 returning *`;
            const dadosEditados = [matricula, novoNome, novoEmail, novoTelefone, novoCurso]
            const res = await pool.query(consultaEditar, dadosEditados)
            console.log('Dados editados com sucesso');
            console.table(res.rows[0])
        } catch (error) {
            console.error("Erro ao editar aluno:", error.message);
        }
    }

    excluirAluno(matricula) {
        try {
            const index = alunos.findIndex(aluno => aluno.getMatricula === matricula);
            if (index !== -1) {
                const alunoRemovido = alunos.splice(index, 1);
                return alunoRemovido;
            } else {
                console.log("Aluno não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao excluir aluno:", error.message);
        }
    }

    async listarAluno() {
        try {
            const consulta = `select aluno.nome, aluno.email, aluno.telefone, aluno.matricula, aluno.curso from aluno`
            const dados = await pool.query(consulta);
            console.table(dados.rows);
        } catch (error) {

        }
    }
}

module.exports = { AlunoController };
