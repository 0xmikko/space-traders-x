// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

contract Planet {

    modifier onPlanetOnly() {
        _;
    }

    AddressRepository private _addressRepository;
    PlanetRepository private _planetRepository;


    constructor(address addressRepository) public {
        _addressRepository = AddressRepository(addressRepository);
        _planetRepository = PlanetRepository(_addressRepository.getPlanetRepository());
    }

    function getResourceLiquidity(address resource) external view returns (uint256) {

}


    function Swap( uint256 resource1, uint256 resource2, uint256 amount ) {

}

}
