// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./AddressRepository.sol";
import "./PlanetRepository.sol";

contract StarshipRepository is Ownable {
    using SafeMath for uint256;

    struct StarShip {
        uint8 level;
        uint256 velocity; // 500 ... 2000
        uint256 fuelPerParsec;
        uint256 arrival; // Block of arrival
        address destination;
    }

    struct StarShipLevel {
        uint256 velocity; // 500 ... 2000
        uint256 fuelPerParsec;
        uint256 gold;
        uint256 iron;
        uint256 oil;
    }

    StarShipLevel[] private _starshipLevels;

    mapping(address => StarShip) private _accountsShip;

    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;

    // EVENTS

    event NewStarShip(address account);
    event Move(address account, address from, address to);
    event Upgrade(address account, uint8 newLevel);

    // CONTRUCTOR

    constructor(address addressRepository) public {
        _addressRepository = AddressRepository(addressRepository);
        _planetRepository = PlanetRepository(
            _addressRepository.getPlanetRepository()
        );
    }

    // PUBLIC METHODS

    function addStarshipLevel(
        uint256 velocity,
        uint256 fuelPerParsec,
        uint256 gold,
        uint256 iron,
        uint256 oil
    ) external onlyOwner {
        _starshipLevels.push(
            StarShipLevel({
                velocity: velocity,
                fuelPerParsec: fuelPerParsec,
                gold: gold,
                iron: iron,
                oil: oil
            })
        );
    }

    function getLevelsLength() public view returns (uint8) {
        return uint8(_starshipLevels.length);
    }

    // Register new account
    function registerAccount(address account) external onlyOwner {
        require(!isAccountExists(account), "Account is already exists");
        require(getLevelsLength() > 0, "No startship levels set up");

        address startPlanet = _planetRepository.getPlanetByIndex(0);
        _accountsShip[account] = StarShip({
            level: 0,
            velocity: _starshipLevels[0].velocity,
            fuelPerParsec: _starshipLevels[0].fuelPerParsec,
            arrival: block.number,
            destination: startPlanet
        });
        emit NewStarShip(account);
    }

    function isAccountExists(address account) public view returns (bool) {
        return _accountsShip[account].destination != address(0);
    }

    // Returns address of planet where account is or going
    function getAccountPlanet(address account) public view returns (address) {
        return _accountsShip[account].destination;
    }

    function getAccountStartshipProperties(address account)
        public
        view
        returns (
            uint8 level,
            uint256 velocity,
            uint256 fuelPerParsec
        )
    {
        level = _accountsShip[account].level;
        velocity = _accountsShip[account].velocity;
        fuelPerParsec = _accountsShip[account].fuelPerParsec;
    }

    // Returns zero if account on the planet and blocks qty to arrive if not
    function timeToArrive(address account) public view returns (uint256) {
        if (block.number >= _accountsShip[account].arrival) return 0;
        return _accountsShip[account].arrival.sub(block.number);
    }

    // Calculates fuel needed for distance
    function calculateFuelConsumption(address account, uint256 distance)
        public
        view
        returns (uint256)
    {
        uint256 fuelPerParsec = _accountsShip[account].fuelPerParsec;
        return distance.div(fuelPerParsec);
    }

    // Calculates Time needed for distance
    function calculateTimeToArrive(address account, uint256 distance)
        public
        view
        returns (uint256)
    {
        uint256 velocity = _accountsShip[account].velocity;
        return 1 + distance.div(velocity);
    }

    // Move account to destination planet
    // Returns fuel consumption
    function moveToPlanet(address account, address dstPlanet)
        external
        onlyOwner
        returns (uint256 fuelConsumption)
    {
        require(timeToArrive(account) == 0, "Starship is on the way");

        address currentPlanet = _accountsShip[account].destination;
        uint256 distance = _planetRepository.calculateDistance(
            currentPlanet,
            dstPlanet
        );

        _accountsShip[account].destination = dstPlanet;
        _accountsShip[account].arrival =
            block.number +
            calculateTimeToArrive(account, distance);

        emit Move(account, currentPlanet, dstPlanet);

        return calculateFuelConsumption(account, distance);
    }

    function upgradeStarShip(address account)
        external
        onlyOwner
        returns (
            uint256 gold,
            uint256 iron,
            uint256 oil
        )
    {
        uint8 currentLevel = _accountsShip[account].level;
        require(currentLevel < getLevelsLength() - 1, "You have maximum level");

        gold = _starshipLevels[currentLevel].gold;
        iron = _starshipLevels[currentLevel].iron;
        oil = _starshipLevels[currentLevel].oil;

        _accountsShip[account].level++;
    }
}
