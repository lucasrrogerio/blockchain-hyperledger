import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class ListagemPacientes extends Component {

    constructor(props) {
        super();
        this.state = {
            lista: [],
            paciente: ''
        }
    }

    componentDidMount() {
    $.ajax({
        crossDomain: true,
        url: "/api/querypacientes",
        dataType: 'json',
        success: resposta => {
            this.setState({ lista: resposta })
        }
    });
    }

editar(paciente) {
    $.ajax({
        url: "/api/mudarestadopaciente/" + paciente.Key,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify({ "estado": paciente.Record.estado }),
        success: novaListagem => window.location.reload(),
        error: resposta => console.log(resposta) 
    })
}

mudarEstado(tipo, paciente, evento) {
    evento.preventDefault();

    switch (tipo) {
        case 'A':
            paciente.Record.estado = 'Aguardando'
            this.editar(paciente);
            break;
        case 'E':
            paciente.Record.estado = 'Em atendimento'
            this.editar(paciente);
            break;
        case 'I':
            paciente.Record.estado = 'Internado'
            this.editar(paciente);
            break;
        case 'L':
            paciente.Record.estado = 'Liberado'
            this.editar(paciente);
            break;
    }
};

render() {
    return <>
        <div className="container mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nome Completo</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.lista.map(paciente => {
                            return (
                                <tr scope="row" key={paciente.Key}>
                                    <td>{paciente.Record.nome}</td>
                                    <td>{paciente.Record.estado}</td>
                                    <td>
                                        <button className='btn btn-warning mr-1' onClick={this.mudarEstado.bind(this, 'A', paciente)}>Aguardando</button>
                                        <button className='btn btn-primary mr-1' onClick={this.mudarEstado.bind(this, 'E', paciente)}>Em Atendimento</button>
                                        <button className='btn btn-danger mr-1' onClick={this.mudarEstado.bind(this, 'I', paciente)}>Internado</button>
                                        <button className='btn btn-success mr-1' onClick={this.mudarEstado.bind(this, 'L', paciente)}>Liberado</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}
} 