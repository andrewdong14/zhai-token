# Zhai Token

The mission of Zhai(宅) Token project is to build a decentrlised, autonomous and transparent real estate marketplace.

## Running project

To run the project please use the following:
```shell script
npm install       # to install dependencies
truffle compile   # to compile smart contracts
truffle test      # to run smart contract unit tests
```
Contract ABI located in build/contracts after you compile the smart contracts

## Deploying project to Rinkeby network

```shell script
truffle migrate --skipDryRun       # deploy to local dev
truffle migrate --network rinkeby --skipDryRun   # deploy to rinkeby testnet
```
rinkeby deployment result and contract addresses: [result](./deployment/contract-address-at-rinkeby-testnet.txt)

## Mint 10 Zhai Tokens
Use [MyEtherWallet](https://vintage.myetherwallet.com/#contracts) to interact with the contract
This is a tutorial in [YouTube](https://youtu.be/8MChn-NJJB0)

## Link Zhai Token to OpenSea marketplace
[ZhaiToken@OpenSea](https://rinkeby.opensea.io/assets/zhai-token). Each token represents a property.
Purchase 5 Zhai Tokens using a different [address](https://rinkeby.etherscan.io/address/0x35efA7af9432E8A878e1742c08ac50A2eC4E75ED)


# References
## How to run ZoKrates

go to your project folder:
```shell script
docker run -v {absolute path of your project folder}/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash #run docker and mount zokrates folder
# now we are inside of docker instance
cd code/square
~/zokrates compile -i square.code #compile the program
~/zokrates setup #setup phase
~/zokrates compute-witness -a 3 9 #create a witness file
~/zokrates generate-proof #construct the proof
~/zokrates export-verifier #creates a verifier.sol contract that contains a verification key and a function verifyTx
```

## Project Resources

* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
