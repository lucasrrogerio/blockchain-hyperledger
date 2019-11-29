import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

export default class InserirPaciente extends Component {

    constructor(props) {
        super();
        this.state = {
            lista: []
        }
    }

    componentDidMount() {
        $.ajax({
            url: "/api/querypaciente/",
            dataType: 'json',
            success: resposta => this.setState({ lista: resposta })
        });
        PubSub.subscribe('atualiza-lista', (topico, novaLista) => this.setState({ lista: novaLista }))
    }

    render() {
        return <>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome Completo</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.lista.map(paciente => {
                                return (
                                    <tr scope="row" key={paciente.Key}>
                                        <td>{paciente.Record.nome}</td>
                                        <td>{paciente.Record.dataNascimento}</td>
                                        <td>{paciente.Record.estado}</td>
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