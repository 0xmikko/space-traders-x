// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

contract PlanetRepository {

    struct Planet {
       string name;
       uint16 x;
       uint16 y;
    }

    address[] private _planetsList;
    mapping(address => Planet) _planets;

    mapping(address => address) _usersOnPlanets;

    // Add events

    function addPlanet(
        address planet,
        string memory name,
        uint16 x,
        uint16 y
    ) public {
        _planets[planet].name = name;
        _planets[planet].x = x;
        _planets[planet].y = y;
        _planetsList.push(planet);
    }

    function getPlanet(address planet) external view returns (string memory name, uint16 x, uint16 y) {
        name = _planets[planet].name;
        x = _planets[planet].x;
        y = _planets[planet].y;
    }

    function getPlanetByIndex(uint8 index) external view returns (string memory name, uint16 x, uint16 y) {
        name = _planets[planet].name;
        x = _planets[planet].x;
        y = _planets[planet].y;
    }


    function getPlanetsLength() external view returns (uint256) {
        return _planetsList.length;
    }

    function isPlanetExists(address planet) internal view returns (bool) {
        return _planets[planet].name !="";
    }

    function getUserPlanet(address user) external view returns (address) {
        return _usersOnPlanets[user];
    }

    function addUser(address user) external {
        require(getPlanetsLength() >0, "No planet to start game");
        _usersOnPlanets[user] =
    }

    function moveUserToPlanet(address user, address newPlanet) external {
        require(isPlanetExists(newPlanet), "Destination planet doesn't exists");
        _usersOnPlanets[user] = newPlanet;
    }
}
