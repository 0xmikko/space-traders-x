// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "../repository/AddressRepository.sol";
import "../repository/PlanetRepository.sol";
import "../repository/StarshipRepository.sol";
import "../tokens/Resource.sol";
import "./ResourcePair.sol";

contract Planet is Ownable {
    string private _name;
    uint16 private _x;
    uint16 private _y;

    uint256 constant MAX_UINT256 = uint256(-1);

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

        // ToDo: Check approvals
        ResourceToken(resource1).approve(address(pair), MAX_UINT256);
        ResourceToken(resource2).approve(address(pair), MAX_UINT256);

        emit NewResourcePair(resource1, resource2);
    }

    function getResourcePair(address resource1, address resource2)
        public
        view
        returns (address)
    {
        (resource1, resource2) = orderAddresses(resource1, resource2);
        address pair = _router[resource1][resource2];
        require(pair != address(0), "Token pair wasn't found");
        return pair;
    }

    function swap(
        address resource1,
        address resource2,
        uint256 amount1out,
        uint256 amount2out
    ) external onPlanetOnly {
        uint256 amount1in;
        uint256 amount2in;
        ResourcePair pair = ResourcePair(getResourcePair(resource1, resource2));

        if (resource1 < resource2) {
            (amount1in, amount2in) = pair.swap(
                msg.sender,
                amount1out,
                amount2out
            );
        } else {
            (amount1in, amount2in) = pair.swap(
                msg.sender,
                amount2out,
                amount1out
            );
        }

        ResourceToken(resource1).transferFrom(
            msg.sender,
            address(this),
            amount1in
        );
        ResourceToken(resource2).transferFrom(
            msg.sender,
            address(this),
            amount2in
        );
    }

    // Returns the price of first resource in pair
    function getResourcePrice(address resource1, address resource2)
        public
        view
        returns (uint256)
    {
        ResourcePair pair = ResourcePair(getResourcePair(resource1, resource2));
        if (resource1 < resource2) {
            return pair.getResourcePrice1();
        }
        return pair.getResourcePrice2();
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
