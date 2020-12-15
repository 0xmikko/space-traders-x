// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
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

    function Swap(uint256 amount1out, uint256 amount2out) external onlyOwner {

    }

    function getResourcePrice1() external returns (uint256) {
        (uint256 r1Liq, uint256 r2Liq) = getLiquidity();
        return r1Liq.div(r2Liq);
    }

    function getResourcePrice2() external returns (uint256) {
        (uint256 r1Liq, uint256 r2Liq) = getLiquidity();
        return r2Liq.div(r1Liq);
    }

    function getLiquidity()
        internal
        returns (uint256 r1Liquidity, uint256 r2Liquidity)
    {
        r1Liquidity = _resource1.balanceOf(_planet);
        r2Liquidity = _resource2.balanceOf(_planet);
    }
}
