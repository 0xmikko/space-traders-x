// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "../repository/AddressRepository.sol";
import "../repository/PlanetRepository.sol";
import "../repository/StarshipRepository.sol";

contract Planet {

    string private _name;
    uint16 private _x;
    uint16 private _y;

    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;
    StarshipRepository private _starshipRepository;

    modifier onPlanetOnly {
        require(
            address(this) == _starshipRepository.getaccountPlanet,
            "Allowed only for users on planet"
        );
        _;
    }

    constructor(address addressRepository, string memory name, uint16 x, uint16 y) public {
        _addressRepository = AddressRepository(addressRepository);
        _planetRepository = PlanetRepository(
            _addressRepository.getPlanetRepository()
        );
        _name = name;
        _x = x;
        _y = y;
    }

    // GETTERS

    function getName() external view returns (string memory) {
        return _name;
    }

    function getCoordinates() external view returns (uint16 x, uint16 y) {
        return (_x, _y);
    }

    function getResourceLiquidity(address resource)
        external
        view
        returns (uint256)
    {}

    function Swap(
        uint256 resource1,
        uint256 resource2,
        uint256 amount
    ) onPlanetOnly external {}

}
