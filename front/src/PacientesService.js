class ProfessorService {

    getPacientes() {
        
        return resposta;
    };

    getProfessor(id) {
        var resposta = FurnasRequest.get('professor/ObterProfessor/' + id)
        return resposta;
    };

    postProfessor(professor) {
        var resposta  = FurnasRequest.post('professor/Incluir', professor);
        return resposta;
    };

    deleteProfessor(id) {
        var resposta = FurnasRequest.delete('professor/Excluir', id);
        return resposta;
    };

    putPaciente(estado) {
        var resposta = FurnasRequest.put('professor/Editar', professor);
        return resposta;
    };
};

export default new PacientesService();