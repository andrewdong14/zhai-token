//load smart contract
var SquareVerifier = artifacts.require('SquareVerifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

//load proof data
var proof = require('./example-proof');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    beforeEach(async function () {
        const squareVerifier = await SquareVerifier.new({ from: account_one });
        this.contract = await SolnSquareVerifier.new(squareVerifier.address, { from: account_one });
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () {
        let result = await this.contract.IsMintable(account_two, 2,
            proof.proof.A, proof.proof.A_p,
            proof.proof.B, proof.proof.B_p,
            proof.proof.C, proof.proof.C_p,
            proof.proof.H, proof.proof.K, proof.input,
            { from: account_one });

        assert.equal(result.logs[0].event, "SolutionAdded", 'Error: no event emitted.');
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () {
        let canMint = true;
        try {
            await this.contract.mintToken(account_two, 2,
                proof.proof.A, proof.proof.A_p,
                proof.proof.B, proof.proof.B_p,
                proof.proof.C, proof.proof.C_p,
                proof.proof.H, proof.proof.K,
                proof.input,
                { from: account_one });
        } catch (e) {
            canMint = false;
        }
        assert.equal(canMint, true, "Error: an ERC721 token cannot be minted for contract.s");
    });

});