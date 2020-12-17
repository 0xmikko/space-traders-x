// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "../tokens/Resource.sol";

contract ResourcePair is Ownable {
    using SafeMath for uint256;

    uint256 private _k; // x * y = k
    ResourceToken private _resource1;
    ResourceToken private _resource2;

    address private _planet;

    constructor(
        address planet,
        address resource1,
        address resource2
    ) public {
        _planet = planet;
        _resource1 = ResourceToken(resource1);
        _resource2 = ResourceToken(resource2);
    }

    function swap(
        address account,
        uint256 amount1out,
        uint256 amount2out
    ) external onlyOwner returns (uint256 amount1in, uint256 amount2in) {
        
        require(amount1out > 0 || amount2out > 0, "Nothing to swap");
        amount1in = amount2out.mul(getResourcePrice1()).div(1e18);
        amount2in = amount1out.mul(getResourcePrice2()).div(1e18);
       
        _resource1.transferFrom(_planet, account, amount1out);
        _resource2.transferFrom(_planet, account, amount2out);

    }

    function getResourcePrice1() public view returns (uint256) {
        (uint256 r1Liq, uint256 r2Liq) = getLiquidity();
        return r1Liq.mul(1e18).div(r2Liq);
    }

    function getResourcePrice2() public view returns (uint256) {
        (uint256 r1Liq, uint256 r2Liq) = getLiquidity();
        return r2Liq.mul(1e18).div(r1Liq);
    }

    function getLiquidity()
        public
        view
        returns (uint256 r1Liquidity, uint256 r2Liquidity)
    {
        r1Liquidity = _resource1.balanceOf(_planet);
        r2Liquidity = _resource2.balanceOf(_planet);
    }
}
