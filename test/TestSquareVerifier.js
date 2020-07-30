// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
let squareVerifier = artifacts.require('SquareVerifier');

// - use the contents from proof.json generated from zokrates steps
let proof = require('./example-proof');

contract('TestSquareVerifier', accounts => {

    const account_one = accounts[0];

    describe('Test verification with correct proof', function () {
        beforeEach(async function () {
            this.contract = await squareVerifier.new({from: account_one});
        });
        //test verification with correct proof
        it('test verification with correct proof', async function () {
            let verified = await this.contract.verifyTx.call(proof.proof.A,proof.proof.A_p,proof.proof.B,proof.proof.B_p,proof.proof.C,proof.proof.C_p,proof.proof.H,proof.proof.K,proof.input,{from:account_one});
            assert.equal(verified, true, "verification is correct");
        });

        //// Test verification with incorrect proof
        it('Test verification with incorrect proof', async function () {
            proof.input = [10, 1];
            let verified = await this.contract.verifyTx.call(proof.proof.A,proof.proof.A_p,proof.proof.B,proof.proof.B_p,proof.proof.C,proof.proof.C_p,proof.proof.H,proof.proof.K,proof.input,{from:account_one});
            assert.equal(verified, false, "Test verification with incorrect proof");
        })
    })
});