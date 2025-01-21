// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataHashing {
    struct UserData {
        string dataHash;
        bool exists;
    }

    mapping(address => UserData) private userHashes;

    // Store the hashed user data for each user
    function storeUserDataHash(string memory userData) public {
        bytes32 dataHash = keccak256(abi.encodePacked(userData));
        userHashes[msg.sender] = UserData(string(abi.encodePacked(dataHash)), true);
    }

    // Retrieve the stored hash for a user
    function getUserDataHash(address user) public view returns (string memory) {
        require(userHashes[user].exists, "No data found for this user");
        return userHashes[user].dataHash;
    }
}
