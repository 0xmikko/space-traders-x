// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../repository/AddressRepository.sol";
import "../repository/PlanetRepository.sol";
import "../repository/StarshipRepository.sol";
import "../tokens/Resource.sol";
import "./ResourcePair.sol";

contract Planet is Ownable {
    string private _name;
    uint16 private _x;
    uint16 private _y;

    AddressRepository private _addressRepository;
    StarshipRepository private _starshipRepository;

    mapping(address => mapping(address => address)) private _router;

    event NewResourcePair(address resource1, address resource2);

    modifier onPlanetOnly {
        require(
            address(this) == _starshipRepository.getAccountPlanet(msg.sender) &&
                _starshipRepository.timeToArrive(msg.sender) == 0,
            "Allowed only for users on planet"
        );
        _;
    }

    constructor(
        address addressRepository,
        string memory name,
        uint16 x,
        uint16 y
    ) public {
        _addressRepository = AddressRepository(addressRepository);
        _starshipRepository = StarshipRepository(
            _addressRepository.getStarshipRepository()
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

    function addResourcePair(address resource1, address resource2)
        external
        onlyOwner
    {
        (resource1, resource2) = orderAddresses(resource1, resource2);

        ResourcePair pair = new ResourcePair(
            address(this),
            resource1,
            resource2
        );
        _router[resource1][resource2] = address(pair);
        emit NewResourcePair(resource1, resource2);
    }

    function getResourcePair(address resource1, address resource2)
        public
        view
        returns (address)
    {
        (resource1, resource2) = orderAddresses(resource1, resource2);
        return _router[resource1][resource2];
    }

    function swap(
        address resource1,
        address resource2,
        uint256 amount1out,
        uint256 amount2out
    ) external onPlanetOnly {
        ResourcePair pair = ResourcePair(getResourcePair(resource1, resource2));

        if (resource1 < resource2) {
            pair.swap(msg.sender, amount1out, amount2out);
        } else {
            pair.swap(msg.sender, amount2out, amount1out);
        }
    }

    function orderAddresses(address a1, address a2)
        internal
        pure
        returns (address, address)
    {
        if (a1 < a2) {
            return (a1, a2);
        }
        return (a2, a1);
    }
}
