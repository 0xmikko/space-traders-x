// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../tokens/Resource.sol";

contract Game is Ownable {

    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;
    ResourceToken private _oilToken;

    constructor(address addressRepository, string memory name, string memory symbol) public {
        _addressRepository = AddressRepository(addressRepository);
        _planetRepository = PlanetRepository(_addressRepository.getPlanetRepository());
        _oilToken = ResourceToken(_addressRepository.getOilToken());
    }

    modifier registerUserOnly() {

    }

    function startGame() external {
        require(!isRegistered(), "You have alredy resiges");
        _planetRepository.moveUserToPlanet()
    }

    function isRegistered() external view returns (bool) {
        return _planetRepository.getUserPlanet(msg.sender) == address(0);
    }

    function Move(address newPlanet) {

    }
}
