// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../repository/AddressRepository.sol";
import "../repository/PlanetRepository.sol";
import "../repository/StarshipRepository.sol";
import "../tokens/Resource.sol";
import "./Planet.sol";

contract SpaceTradersGame is Ownable {
    // Initial player values
    uint256 private INITIAL_GOLD;
    uint256 private INITIAL_IRON;
    uint256 private INITIAL_OIL;

    // Resource tokens
    ResourceToken private _goldToken;
    ResourceToken private _ironToken;
    ResourceToken private _oilToken;

    // Repositories
    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;
    StarshipRepository private _starshipRepository;

    modifier registeredAccountsOnly {
        require(
            _starshipRepository.isAccountExists(msg.sender),
            "Game: Account is not registered"
        );
        _;
    }

    constructor(
        address addressRepository,
        uint256 initGold,
        uint256 initIron,
        uint256 initOil
    ) public {
        _addressRepository = AddressRepository(addressRepository);
        _planetRepository = PlanetRepository(
            _addressRepository.getPlanetRepository()
        );
        _starshipRepository = StarshipRepository(
            _addressRepository.getStarshipRepository()
        );

        INITIAL_GOLD = initGold;
        INITIAL_IRON = initIron;
        INITIAL_OIL = initOil;
    }

    function connectTokens() onlyOwner external {
        _goldToken = ResourceToken(_addressRepository.getGoldToken());
        _ironToken = ResourceToken(_addressRepository.getIronToken());
        _oilToken = ResourceToken(_addressRepository.getOilToken());
    }

    function startGame() external {
        _starshipRepository.registerAccount(msg.sender);

        _goldToken.mintTo(msg.sender, INITIAL_GOLD);
        _ironToken.mintTo(msg.sender, INITIAL_IRON);
        _oilToken.mintTo(msg.sender, INITIAL_OIL);
    }

    // Move user to new planet and chagre oil for that
    function move(address dstPlanet) external registeredAccountsOnly {
        uint256 oilNeeded = _starshipRepository.moveToPlanet(
            msg.sender,
            dstPlanet
        );
        _oilToken.burn(msg.sender, oilNeeded);
    }

    function upgradeShip() external registeredAccountsOnly {
        (
            uint256 goldCost,
            uint256 ironCost,
            uint256 oilCost
        ) = _starshipRepository.upgradeStarShip(msg.sender);

        _goldToken.burn(msg.sender, goldCost);
        _ironToken.burn(msg.sender, ironCost);
        _oilToken.burn(msg.sender, oilCost);
    }

    // Setup game functions for owner only access
    function addPlanet(
        string memory name,
        uint16 x,
        uint16 y,
        uint256 initGold,
        uint256 generatesGold,
        uint256 initIron,
        uint256 generatesIron,
        uint256 initOil,
        uint256 generatesOil
    ) external onlyOwner {
        Planet planet = new Planet(address(_addressRepository), name, x, y);

        _planetRepository.addPlanet(address(planet));

        _goldToken.addPlanet(address(planet), initGold, generatesGold);
        _ironToken.addPlanet(address(planet), initIron, generatesIron);
        _oilToken.addPlanet(address(planet), initOil, generatesOil);
    }

    function addStarshipLevel(
        uint256 velocity,
        uint256 fuelPerParsec,
        uint256 gold,
        uint256 iron,
        uint256 oil
    ) external onlyOwner {
        _starshipRepository.addStarshipLevel(
            velocity,
            fuelPerParsec,
            gold,
            iron,
            oil
        );
    }
}
