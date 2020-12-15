// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../repository/AddressRepository.sol";
import "../repository/PlanetRepository.sol";
import "../repository/StarshipRepository.sol";
import "../tokens/Resource.sol";

contract SpaceTradersGame is Ownable {

    // Resource tokens
    ResourceToken private _goldToken;
    ResourceToken private _ironToken;
    ResourceToken private _oilToken;

    // Repositories
    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;
    StarshipRepository private _starshipRepository;

    modifier registeredAccountsOnly {
        require(isRegistered(), "You should register before usign this method");
        _;
    }

    constructor(address addressRepository, string memory name, string memory symbol) public {
        _addressRepository = AddressRepository(addressRepository);
        _planetRepository = PlanetRepository(_addressRepository.getPlanetRepository());
        _starshipRepository = StarshipRepository(_addressRepository.getStarshipRepository());

        _goldToken = ResourceToken(_addressRepository.getGoldToken());
        _ironToken = ResourceToken(_addressRepository.getIronToken());
        _oilToken = ResourceToken(_addressRepository.getOilToken());
    }

    function startGame() external {
        require(!isRegistered(), "Account is already registered");
        _starshipRepository.registeraccount(msg.sender);

        // Mint tokens to new account
    }

    function isRegistered() public view returns (bool) {
        return _planetRepository.getUserPlanet(msg.sender) == address(0);
    }

    // Move user to new planet and chagre oil for that
    function move(address dstPlanet) external registeredAccountsOnly {
        uint256 oilNeeded = _starshipRepository.moveToPlanet(msg.sender, dstPlanet);
        _oilToken.burn(msg.sender, oilNeeded);
    }

    function upgradeShip() external registeredAccountsOnly {
        (uint256 goldCost, uint256 ironCost, uint256 oilCost) = _starshipRepository.upgradeShip(msg.sender);

        _goldToken.burn(msg.sender, goldCost);
        _ironToken.burn(msg.sender, ironCost);
        _oilToken.burn(msg.sender, oilCost);

    }
   
}
