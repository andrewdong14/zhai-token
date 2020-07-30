const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

const { rinkeby } = JSON.parse(fs.readFileSync("./secrets.json").toString());

module.exports = {
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777"
        },
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: () => new HDWalletProvider(rinkeby.mnemonic, rinkeby.provider),
            network_id: 4,       // Rinkeby's id
            networkCheckTimeout: 1000000000,
            timeoutBlocks: 200
        },
    },
    plugins: [ "solidity-coverage" ]
};
