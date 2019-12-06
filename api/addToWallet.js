/*
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, '..');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('../identity/user/admin/wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, '/crypto-config/peerOrganizations/hospital.com/users/Admin@hospital.com');
        const cert = fs.readFileSync(path.join(credPath, '/msp/signcerts/Admin@hospital.com-cert.pem')).toString();
        const key = fs.readFileSync(path.join(credPath, '/msp/keystore/6be5bafdf5d0122cbf5cb5c64ee7a9c6540b7cc8f5e7ebae4a83f7569446e0b3_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'Admin@hospital.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});