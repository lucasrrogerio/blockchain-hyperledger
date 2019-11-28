/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

const wallet = new FileSystemWallet('/home/lucas/rede_primeup/identity/user/user1/wallet');

async function main() {

    const gateway = new Gateway();

    try {
        const userName = 'User1@banco.com';

        let connectionProfile = yaml.safeLoad(fs.readFileSync('/home/lucas/rede_primeup/gateway/networkConnection.yaml', 'utf8'));

        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        await gateway.connect(connectionProfile, connectionOptions);

        const network = await gateway.getNetwork('meucanal');

        const contract = await network.getContract('fabcar');

        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});