// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "../core/Planet.sol";

contract PlanetRepository is Ownable {
    using SafeMath for uint256;

    address[] private _planetsList;
    mapping(address => Planet) _planets;

    // Events
    event NewPlanetAdded(address planet);

    modifier planetExists(address planet) {
        require(
            address(_planets[planet]) != address(0),
            "Planet doesn't exists"
        );
        _;
    }

    // Adds planet to Repository
    function addPlanet(address planet) external onlyOwner {

        _planets[planet] = Planet(planet);
        _planetsList.push(planet);
        emit NewPlanetAdded(planet);
    }

    function getPlanetsLength() public view returns (uint256) {
        return _planetsList.length;
    }

    function getPlanetByIndex(uint8 index) public view returns (address) {
        return _planetsList[index];
    }

    function getPlanetName(uint8 index) external view returns (string memory) {
        return _planets[getPlanetByIndex(index)].getName();
    }

    function getPlanetCoord(uint8 index)
        external
        view
        returns (uint16 x, uint16 y)
    {
        return _planets[getPlanetByIndex(index)].getCoordinates();
    }

    // Calculates destination between 2 planets
    function calculateDistance(address planet1, address planet2)
        public
        view
        planetExists(planet1)
        planetExists(planet2)
        returns (uint256 distance)
    {
        (uint16 p1x, uint16 p1y) = _planets[planet1].getCoordinates();
        (uint16 p2x, uint16 p2y) = _planets[planet2].getCoordinates();

        if (p1x > p2x) {
            distance = distance.add(p1x).sub(p2x);
        } else {
            distance = distance.add(p2x).sub(p1x);
        }
        if (p1y > p2y) {
            distance = distance.add(p1y).sub(p2y);
        } else {
            distance = distance.add(p2y).sub(p1y);
        }
    }
}
