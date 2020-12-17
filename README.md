# Planet description 

## Vicrion

Blue gas giant with a complex planetary system. Galactical manufacturing center with large shipyards. Despite the fact that the planet is not rich in minerals, it has the most modern production facilities for the processing of metals and gold.

## Gocury

A poor desert planet, a den of mercenaries, smugglers and speculators. The locals love gold, but they often try to trick inexperienced traders.

## Uitania

A cosmopolitan urban world made up of one city from the entire planet. A large economic center, so all the richest traders from all over the galaxy come here to become even richer.

## Dion ZJ97

A mining planet that has been fought over by crime lords for its valuable Spice. A fissure vent beneath the spice mines served as a source of astatic element that could be refined into hyperfuel for starships.

## Okao

Tropical planet used to monitor the nearby Dion ZJ97 fuel production. It is famous for its beautiful views, therefore it is a resort for production owners.

## Thubeon

An originally lush and forested planet that becomes volcanic and almost lifeless during an ancient battle. Many centuries later, it has become a center for the production of fuel and everything that burns.

## Zutis

Medium mineral planet located in a remote section of the galaxy, its surface is covered with a layer of gray salt over its red-colored soil. Rich in minerals such as iron ore and aluminum. 


# Trash ? 
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
