import React, { Component } from 'react';
import $ from 'jquery';
import {
  useParams
} from "react-router-dom";

export default class InserirPaciente extends Component {

    constructor(props) {
        super();
        this.state = {
            paciente: {
                nome: '',
                dataNascimento: '',
                cpf: '',
                tipoDeSangue: '',
                sexo: '',
                estado: '',
                amnese: {
                    QP: '',
                    HDA: {
                        // quando a dor começou
                        epocaInicio: '',
                        // características da dor: onde, tipo (queimação/cólica), duração (cícila ou não), intensidade, se ela se espalha
                        // se impede a realização de alguma tarefa, se melhora/piora com algo, se acompanha mais algum sintoma 
                        caracterizacaoDaDor: {
                            onde: '',
                            tipo: '',
                            duracao: '',
                            intensidade: '',
                            melhora: '',
                            piora: '',
                            acompanhamento: ''
                        }
                    },
                    // antecedentes pessoais
                    HMP: {
                        cirurgias: '',
                        alergias: ''
                    },
                    // histórico familiar
                    HF: {
                        mae: '',
                        pai: ''
                    },
                    // hábitos de vida
                    HPS: {
                        // se o trabalho proporciona estresse, se proporciona risco à saude
                        condicoesTrabalho: {
                            estresse: '',
                            localTrabalho: '',
                            risco: ''
                        },
                        condicoesVida: {
                            alimentacao: '',
                            tabaco: '',
                            alcool: '',
                            medicacaoReceitada: '',
                            drogasIlicitas: '',
                            viagem: {
                                local: ''
                            },
                            animaisEstimacao: ''
                        }
                    },

                },
            }
        }
    }

    componentDidMount() {
        var id = this.props.match.params['id'];
        console.log(id)
        $.ajax({
            crossDomain: true,
            url: "/api/buscapaciente/" + id,
            dataType: 'json',
            success: resposta => {
                console.log(resposta)
                this.setState({ paciente: resposta })
            }
        });
    }

    render() {
        return <>
            <div className="container mt-3">
                <form>
                    <h5>Dados do paciente</h5>
                    <div class="row">
                        <div class="col">
                            <label>Nome completo</label>
                            <input type="text" className="form-control"
                                value={this.state.paciente.nome} disabled/>
                        </div>
                        <div class="col">
                            <label>Data de Nascimento</label>
                            <input type="text" className="form-control"
                                value={this.state.paciente.dataNascimento} disabled/>
                        </div>
                        </div>
                    <div class="row">
                        <div class="col">
                        <label>CPF</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.cpf} disabled/>
                    </div>
                        <div class="col">
                        <label>Tipo Sanguíneo</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.tipoDeSangue} disabled/>
                    </div>
                    </div>
                    <div class="row">
                        <div class="col">
                        <label>Sexo</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.sexo} disabled/>
                        </div>
                        <div class="col">
                        <label>Estado</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.estado} disabled/>
                        </div>
                    </div>
                    <div className="mt-3"/>
                    <h5>Atendimento</h5>
                    <div className="form-group">
                        <label>Queixa Principal</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.QP} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Data inicial da queixa</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.epocaInicio} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Onde ocorre a dor</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.onde} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Tipo da dor</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.tipo} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Duração da dor</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.duracao} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Intensidade da dor</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.intensidade} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Melhora</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.melhora} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Piora</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.piora} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Acompanha outra coisa?</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HDA.caracterizacaoDaDor.acompanhamento} disabled/>
                    </div>
                    <h5 >Antecedentes pessoais</h5>
                    <div className="form-group">
                        <label>Passou por cirurgias recentemente</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HMP.cirurgias} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Possui alergias</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HMP.alergias} disabled/>
                    </div>
                    <h5>Histórico Familiar</h5>
                    <div className="form-group">
                        <label>Histórico familiar - mãe</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HF.mae} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Histórico familiar - pai</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HF.pai} disabled/>
                    </div>
                    <h5>Trabalho</h5>
                    <div className="form-group">
                        <label>Local de Trabalho</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesTrabalho.localTrabalho} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Frequência de estresse no trabalho</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesTrabalho.estresse} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Riscos no trabalho</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesTrabalho.risco} disabled/>
                    </div>
                    <h5>Hábitos de Vida</h5>
                    <div className="form-group">
                        <label>Realizou alguma viagem? Para onde? </label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesVida.viagem.local} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Uso de medicamentos receitados</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesVida.medicacaoReceitada} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Frequência do uso de álcool</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesVida.alcool} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Frequência do uso do tabaco</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesVida.tabaco} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Frequência de drogas ilícitas</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesVida.drogasIlicitas} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Possui animais de estimação? Quais?</label>
                        <input type="text" className="form-control" 
                            value={this.state.paciente.amnese.HPS.condicoesVida.animaisEstimacao} disabled/>
                    </div>
                </form>
            </div>
        </>
    }
} 