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

app.get('/api/querypacientes', async function (req, res) {
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


app.get('/api/querypaciente/:paciente_index', async function (req, res) {
    try {

        const userName = 'Admin@banco.com';
        const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/admin/wallet');
        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userName, discovery: { enabled: true, asLocalhost: false } });

        const network = await gateway.getNetwork('meucanal');
        const contract = network.getContract('prontuario');

        const result = await contract.evaluateTransaction('queryPaciente', req.params.paciente_index);
        res.status(200).json({paciente: JSON.parse(result.toString())});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.post('/api/addpaciente/', async function (req, res) {
    try {

        const userName = 'Admin@banco.com';
        const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/admin/wallet');
        
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userName, discovery: { enabled: false, asLocalhost: true } });

        const network = await gateway.getNetwork('meucanal');
        const contract = network.getContract('prontuario');

        await contract.submitTransaction('criarPaciente', req.body.paciente);
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
        console.log('Transaction has been submitted');
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