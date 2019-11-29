var express = require('express');
var bodyParser = require('body-parser');
const yaml = require('js-yaml');
const fs = require('fs');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

// Setting for Hyperledger Fabric
const { FileSystemWallet, Gateway } = require('fabric-network');
const ccpPath = yaml.safeLoad(fs.readFileSync('/home/lucas/rede_primeup/gateway/networkConnection.yaml', 'utf8'));

app.get('/api/buscapacientes', async function (req, res) {
    try {

        const userName = 'Admin@banco.com';
        const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/admin/wallet');
        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userName, discovery: { enabled: true, asLocalhost: false } });

        const network = await gateway.getNetwork('meucanal');
        const contract = network.getContract('prontuario');

        const result = await contract.evaluateTransaction('queryTodosPacientes');
        res.status(200).json(JSON.parse(result.toString()));

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});


app.get('/api/buscapaciente/:paciente_index', async function (req, res) {
    try {

        const userName = 'Admin@banco.com';
        const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/admin/wallet');
        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userName, discovery: { enabled: true, asLocalhost: false } });

        const network = await gateway.getNetwork('meucanal');
        const contract = network.getContract('prontuario');

        const result = await contract.evaluateTransaction('queryPaciente', req.params.paciente_index);
        let paciente = JSON.parse(result.toString());
        res.status(200).json({paciente: paciente});
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.post('/api/adicionapaciente/:paciente_index', async function (req, res) {
    try {

        const userName = 'Admin@banco.com';
        const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/admin/wallet');
        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userName, discovery: { enabled: false, asLocalhost: true } });

        const network = await gateway.getNetwork('meucanal');
        const contract = network.getContract('prontuario');
        
        req.body.doctype = 'paciente';
        await contract.submitTransaction('criarPaciente', req.params.paciente_index, JSON.stringify(req.body));
        res.send('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.put('/api/mudarestadopaciente/:paciente_index', async function (req, res) {
    try {

        const userName = 'Admin@banco.com';
        const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/admin/wallet');
        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userName, discovery: { enabled: false, asLocalhost: true } });

        const network = await gateway.getNetwork('meucanal');
        const contract = network.getContract('prontuario');

        await contract.submitTransaction('mudarEstadoPaciente', req.params.paciente_index, req.body.estado);
        res.send('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }	
})

app.use(cors({origin: "*"}));
app.listen(8080);