/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Prontuario extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const pacientes = [
            {
                nome: 'Matheus Oliveira de Souza',
                dataNascimento: '12/02/1999',
                cpf: 10098723409,
                tipoDeSangue: 'B+',
                sexo: 'masculino',
                estado: '',
                amnese: {
                    DataConsulta: '28/11/2019',
                    QP: 'Dores no fígado',
                    HDA: {
                        epocaInicio: 'Segunda-feira à tarde',
                        caracterizacaoDaDor: {
                            onde: 'corpo no fígado',
                            tipo: 'cólica',
                            duracao: 'intensidade',
                            intensidade: '8',
                            melhora: 'não',
                            piora: 'deitar de barriga para baixo',
                            acompanhamento: 'febre e fraqueza no corpo'
                        }
                    },
                    HMP: {
                        cirurgias: 'não',
                        alergias: 'não'
                    },
                    HF: {
                        mae: 'nada',
                        pai: 'nada'
                    },
                    HPS: {
                        condicoesTrabalho: {
                            estresse: 'eventualmente quando há uma pressão de entrega de tarefas',
                            localTrabalho: 'Rio de Janeiro',
                            risco: 'não'
                        },
                        condicoesVida: {
                            alimentacao: 'gordura e glicose em excesso',
                            tabaco: false,
                            alcool: false,
                            medicacaoReceitada: 'nada',
                            drogasIlicitas: 'nada',
                            viagem: '',
                            animaisEstimacao: false 
                        }
                    },
                    ISDA: {
                        geral: {
                            emagrecimento: true,
                            febre: true
                        },
                        circulatório: {
                            varizes: false,
                            hipertensao: false,
                            hipotensao: true
                        },
                        respiratorio: {
                            tosse: false,
                            asma: false
                        },
                        gastroIntestinal: {
                            dorLingua: true,
                            diarreia: true,
                            nauseas: true
                        },
                        nervoso: {
                            tontura: true,
                            vertigem: false,
                            convulcoes: false,
                            insonia: true,
                        },
                        locomotor: {
                            caimbra: false,
                            dorArticular: false
                        },
                        reprodutor: {
                            impotenciaSexual: false,
                            corrimento: false,
                            HPV: false
                        },
                        psiquismo: {
                            alucinacao: false,
                            ideiasDelirantesCompulsivas: false
                        }
                    },
                    diagnostico: 'virose',
                    tratamento: {
                        medicacao: 'omeprazol 40mg, paracetamol 750mg, bromoprida'
                    }
                },
            },
            {
                nome: 'Luisa dos Santos Silva',
                dataNascimento: '11/05/1995',
                cpf: 10098729423,
                tipoDeSangue: 'O-',
                sexo: 'feminino',
                estado: '',
                amnese: {
                    DataConsulta: '28/11/2019',
                    QP: 'Forte dor de cabeça',
                    HDA: {
                        epocaInicio: 'Após acordar nessa manhã',
                        caracterizacaoDaDor: {
                            onde: 'dor de cabeça',
                            tipo: 'enxaqueca',
                            duracao: 'sem parar',
                            intensidade: '9',
                            melhora: 'não',
                            piora: 'fortes movimentações',
                            acompanhamento: 'fraqueza no corpo'
                        }
                    },
                    HMP: {
                        cirurgias: 'não',
                        alergias: 'gato'
                    },
                    HF: {
                        mae: 'mãe diabética',
                        pai: ''
                    },
                    HPS: {
                        condicoesTrabalho: {
                            estresse: 'corrente',
                            localTrabalho: 'Niterói',
                            risco: 'não'
                        },
                        condicoesVida: {
                            alimentacao: 'balanceada',
                            tabaco: true,
                            alcool: true,
                            medicacaoReceitada: 'rivotril',
                            drogasIlicitas: 'nada',
                            viagem: '',
                            animaisEstimacao: true 
                        }
                    },
                    ISDA: {
                        geral: {
                            emagrecimento: true,
                            febre: false
                        },
                        circulatório: {
                            varizes: false,
                            hipertensao: false,
                            hipotensao: true
                        },
                        respiratorio: {
                            tosse: false,
                            asma: false
                        },
                        gastroIntestinal: {
                            dorLingua: false,
                            diarreia: false,
                            nauseas: true
                        },
                        nervoso: {
                            tontura: true,
                            vertigem: false,
                            convulcoes: false,
                            insonia: true,
                        },
                        locomotor: {
                            caimbra: false,
                            dorArticular: false
                        },
                        reprodutor: {
                            impotenciaSexual: true,
                            corrimento: false,
                            HPV: false
                        },
                        psiquismo: {
                            alucinacao: true,
                            ideiasDelirantesCompulsivas: false
                        }
                    },
                    diagnostico: 'alto nível de estresse',
                    tratamento: {
                        medicacao: 'maracugina',
                        especializado: 'psicologo'
                    }
                },
            },
            {
                nome: 'Lucas Lopes de Morais',
                dataNascimento: '17/02/1998',
                cpf: 10098700523,
                tipoDeSangue: 'A-',
                sexo: 'masculino',
                estado: 'em atendimento',
                amnese: {
                    DataConsulta: '28/11/2019',
                    QP: 'Tremedeira e formigamento nas mãos além de calor súbito',
                    HDA: {
                        epocaInicio: 'Metade do mês anterior',
                        caracterizacaoDaDor: {
                            onde: 'mãos',
                            tipo: 'tremedeira',
                            duracao: 'por volta de 50 minutos, não é regular',
                            intensidade: '6',
                            melhora: 'não',
                            piora: 'eventualmente após refeições',
                            acompanhamento: 'calor súbito'
                        }
                    },
                    HMP: {
                        cirurgias: 'não',
                        alergias: 'sulfa'
                    },
                    HF: {
                        mae: 'avô diabético',
                        pai: 'avó com hipertensão'
                    },
                    HPS: {
                        condicoesTrabalho: {
                            estresse: 'não',
                            localTrabalho: 'Rio de Janeiro',
                            risco: 'não'
                        },
                        condicoesVida: {
                            alimentacao: 'vegetariano porém se alimenta de doces com regularidade',
                            tabaco: false,
                            alcool: true,
                            medicacaoReceitada: 'prozac',
                            drogasIlicitas: 'maconha',
                            viagem: '',
                            animaisEstimacao: true 
                        }
                    },
                    ISDA: {
                        geral: {
                            emagrecimento: false,
                            febre: false
                        },
                        circulatório: {
                            varizes: false,
                            hipertensao: false,
                            hipotensao: false
                        },
                        respiratorio: {
                            tosse: false,
                            asma: false
                        },
                        gastroIntestinal: {
                            dorLingua: false,
                            diarreia: false,
                            nauseas: false
                        },
                        nervoso: {
                            tontura: false,
                            vertigem: false,
                            convulcoes: false,
                            insonia: false,
                        },
                        locomotor: {
                            caimbra: false,
                            dorArticular: false
                        },
                        reprodutor: {
                            impotenciaSexual: false,
                            corrimento: false,
                            HPV: false
                        },
                        psiquismo: {
                            alucinacao: false,
                            ideiasDelirantesCompulsivas: false
                        }
                    },
                    diagnostico: 'ansiedade',
                    tratamento: {
                        medicacao: 'maracugina',
                        especializado: 'psicólogo'
                    }
                },
            }
        ];

        for (let i = 0; i < pacientes.length; i++) {
            pacientes[i].docType = 'paciente';
            await ctx.stub.putState('PACIENTE' + i, Buffer.from(JSON.stringify(pacientes[i])));
            console.info('Added <--> ', pacientes[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryPaciente(ctx, pacienteNumero) {
        const paciente = await ctx.stub.getState(pacienteNumero); // get the car from chaincode state
        if (!paciente || paciente.length === 0) {
            throw new Error(`${pacienteNumero} não existe`);
        }
        console.log(paciente.toString());
        return paciente.toString();
    }

    async criarPaciente(ctx, pacienteNumero, paciente) {
        console.info('============= START : Criar Paciente ===========');
        const p = JSON.parse(paciente)
        await ctx.stub.putState(pacienteNumero, Buffer.from(JSON.stringify(p)));
        console.info('============= END : Criar Paciente ===========');
    }

    async queryTodosPacientes(ctx) {
        const startKey = 'PACIENTE0';
        const endKey = 'PACIENTE999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async mudarEstadoPaciente(ctx, pacienteNumero, novoEstado) {
        console.info('============= START : Mudar o estado do paciente ===========');

        const pacienteAsBytes = await ctx.stub.getState(pacienteNumero); // get the car from chaincode state
        if (!pacienteAsBytes || pacienteAsBytes.length === 0) {
            throw new Error(`${pacienteNumero} não existe`);
        }
        const paciente = JSON.parse(pacienteAsBytes.toString());
        paciente.estado = novoEstado;

        await ctx.stub.putState(pacienteNumero, Buffer.from(JSON.stringify(paciente)));
        console.info('============= END : Mudar o estado do paciente ===========');
    }

}

module.exports = Prontuario;
