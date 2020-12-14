// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../lib/AddressStorage.sol";

/**
 * @title AddressRepository
 * @notice Stores addresses of deployed contracts
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */
contract AddressRepository is Ownable, AddressStorage {
  bytes32 private constant GAME_SERVICE = "GAME_SERVICE";
  bytes32 private constant PLANET_REPOSITORY = "PLANET_REPOSITORY";
  bytes32 private constant GOLD_TOKEN = "GOLD_TOKEN";
  bytes32 private constant IRON_TOKEN = "IRON_TOKEN";
  bytes32 private constant OIL_TOKEN = "OIL_TOKEN";
  /**
   * @dev returns the address of the LendingPool proxy
   * @return the lending pool proxy address
   **/
  function getPoolService() public view returns (address) {
    return getAddress(POOL_SERVICE);
  }

  function setPoolService(address _address) public onlyOwner {
    _setAddress(POOL_SERVICE, _address);
  }

  function getPlanetRepository() public view returns (address) {
    return getAddress(PLANET_REPOSITORY);
  }

  function setPlanetRepository(address _address) public onlyOwner {
    _setAddress(PLANET_REPOSITORY, _address);
  }

  function getOilToken() public view returns (address) {
    return getAddress(OIL_TOKEN);
  }

  function setOilToken(address _address) public onlyOwner {
    _setAddress(OIL_TOKEN, _address);
  }


}
