pragma solidity >=0.4.21 <0.6.0;
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./ERC721Mintable.sol";
import "./Verifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ZhaiToken {
    SquareVerifier public squareContract;

    constructor(address verifierAddress) ZhaiToken() public{
        squareContract = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        uint tokenId;
        address to;
    }

    // TODO define an array of the above struct
    Solutions[] solutionsArray;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solutions) private solutions;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 tokenId, address to, bytes32 key);

    // TODO Create a function to add the solutions to the array and emit the event
    function AddSolution(address _to, uint _tokenId, bytes32 key) public {
        Solutions memory _soln = Solutions({tokenId : _tokenId, to : _to});
        solutionsArray.push(_soln);
        solutions[key] = _soln;
        emit SolutionAdded(_tokenId, _to, key);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintToken(address _to,uint _tokenId,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input)

    public whenNotPaused{
        bytes32 key = keccak256(abi.encodePacked(a,a_p,b,b_p,c,c_p,h,k,input));
        require(solutions[key].to == address(0),"Solution is already used.");
        require(squareContract.verifyTx(a,a_p,b,b_p,c,c_p,h,k,input),"Solution is not correct");

        AddSolution(_to,_tokenId,key);
        super.mint(_to,_tokenId);
    }

    function IsMintable(address _to,uint _tokenId,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input)
    public {
        // check if solution is valid
        require(squareContract.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Solution is not correct");
        bytes32 key = keccak256(abi.encodePacked(a,a_p,b,b_p,c,c_p,h,k,input));
        require(solutions[key].to == address(0),"Solution is already used.");

        AddSolution(_to,_tokenId,key);
    }
}