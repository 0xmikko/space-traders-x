// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "../repository/AddressRepository.sol";
import "../repository/PlanetRepository.sol";
import "../repository/StarshipRepository.sol";
import "../tokens/Resource.sol";
import "./ResourcePair.sol";

contract Planet {

    string private _name;
    uint16 private _x;
    uint16 private _y;

    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;
    StarshipRepository private _starshipRepository;

    mapping(address => mapping(address => address)) private _router;

    modifier onPlanetOnly {
        require(
            address(this) == _starshipRepository.getAccountPlanet(msg.sender) &&
            _starshipRepository.timeToArrive(msg.sender) == 0,
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
    {
        return ResourceToken(resource).balanceOf(address(this));
    }

    function swap(
        address resource1,
        address resource2,
        uint256 amount1out,
        uint256 amount2out
    ) onPlanetOnly external {
        ResourcePair pair = ResourcePair(_router[resource1][resource2]);
        pair.swap(msg.sender, amount1out, amount2out);
    }

}
