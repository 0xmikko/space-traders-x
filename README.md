Screens:
    Starmap
    Trade Terminal
    News Dialog

 AppBar:
    Gold
    Iron
    Oil

    // Connect Wallet

Resources [ERC20-Tokens] {
    Gold
    Iron
    Oil
}


Starship struct {
     Speed
    Armor
    Hidden
}

Starship [NFT-Token] {
    Build
    Upgrade(_tokenId)
    Transfer()
}

// Liqudity Pool
// Pairs: Gold-Iron | [ k ]
// Pairs: Gold-Oil  | [ k ]
// Pairs: Iron-Oil  | [ k ]

// Перелеты потребляют газ
// Атака монстров железо
// 

// Функции игрока

Swap()
FlyTo()
Exchange() -> Uniswap


PlanetSwap() {
    getPrice => 
}

Core {
    AddPlanet()
}

Planet [Contracts]{
    GoldMining // => Token
    IronMining // => Token
    OilMining // => Token

    GoldTotal
    IronTotal
    OilTotal

    Swap() {
        check is on planet
    }

    GetPrice(resource) int

}

Router {
    coordinates [planet] = {x, y}
    AddPlanet()
    GetDistance(p1, p2) int
    GetPosition(player) int // planet code

    FlyTo(planet) {
        get distance
        reduce Oil
        check fuck by military
        if so - get chance
    }
}