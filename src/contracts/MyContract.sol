// contracts/ImageHashStorage.sol
pragma solidity ^0.8.0;

contract ImageHashStorage {
    mapping(string => bool) private hashes;

    function storeHash(string memory imageHash) public {
        require(!hashes[imageHash], "Hash already exists!");
        hashes[imageHash] = true;
    }

    function verifyHash(string memory imageHash) public view returns (bool) {
        return hashes[imageHash];
    }
}
