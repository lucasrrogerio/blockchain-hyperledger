cryptogen generate --config=./crypto-config.yaml

configtxgen -profile TwoOrgsOrdererGenesis -channelID sysmeucanal -outputBlock ./channel-artifacts/genesis.block
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID meucanal

docker-compose -f docker-compose-node1.yaml up -d

#no primeiro nó
docker exec -it cli bash

peer channel create -o ordenador.primeup.com:7050 -c meucanal -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem

peer channel join -b meucanal.block

#EXEMPLO2
peer chaincode install -n mycc -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/chaincode_example02/node/
peer chaincode instantiate -o ordenador.primeup.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem -C meucanal -n mycc -l node -v 1.0 -c '{"Args":["init","a", "100", "b","200"]}' -P "OR ('Org1MSP.member','Org2MSP.member')"

peer chaincode query -C meucanal -n mycc -c '{"Args":["query","a"]}'
peer chaincode invoke -C meucanal -n mycc -c '{"Args":["invoke","b","a","20"]}' -o ordenador.primeup.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem --certfile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/banco.com/peers/peer0.banco.com/tls/ca.crt

#PRONTUARIO
peer chaincode install -n prontuario -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/prontuario/javascript/
peer chaincode instantiate -o ordenador.primeup.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem -C meucanal -n prontuario -l node -v 1.0 -c '{"Args":[]}' -P "OR ('Org1MSP.member','Org2MSP.member')"

peer chaincode invoke -C meucanal -n prontuario -c '{"Args":["initLedger"]}' -o ordenador.primeup.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem --certfile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/banco.com/peers/peer0.banco.com/tls/ca.crt
peer chaincode invoke -C meucanal -n prontuario -c '{"Args":["mudarEstadoPaciente", "PACIENTE0", "AGUARDANDO"]}' -o ordenador.primeup.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem --certfile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/banco.com/peers/peer0.banco.com/tls/ca.crt

peer chaincode query -C meucanal -n prontuario -c '{"Args":["queryTodosPacientes"]}'
peer chaincode query -C meucanal -n prontuario -c '{"Args":["queryPaciente", "PACIENTE0"]}'

#no segundo nó
docker-compose -f docker-compose-node2.yaml up -d

#definir os ancoras em cada organização
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID meucanal -asOrg Org1MSP
configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID meucanal -asOrg Org2MSP
peer channel update -o ordenador.primeup.com:7050 -c meucanal -f ./channel-artifacts/Org2MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/primeup.com/orderers/ordenador.primeup.com/msp/tlscacerts/tlsca.primeup.com-cert.pem