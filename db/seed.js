const client = require('./index')

// should use classes for the seed data? probably not
// class pokemonCard = {
//     constructor(id, pokemonId, name, type, type1, type2, quality, rarity, img_url){
//         this.id = id;
//         this.pokemonId = pokemonId;
//         this.name = name;
//         this.type.type1 = type1;
//         this.type.type2 = type2;
//         this.quality = quality;
//         this.rarity = rarity;
//         this.img_url = img_url;
//     }
// }

// see  product data
// price is writted as 100.00 (with cents value)
const seedProduct = [
    {
        id: 1,
        pokemonId: 1,
        name: "Bulbasaur",
        cost: 100.00,
        type: {
            type1: "plant",
            type2: null
        },
        quality: "used",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/410qBt1e7LL._AC_.jpg",
    },
    {
        id: 2,
        pokemonId: 7,
        name: "Squirtle",
        cost: 1.50,
        type: {
            type1: "water",
            type2: null
        },
        quality: "fair to good",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51TxlvrsoBL._AC_.jpg",
    },
    {
        id: 3,
        pokemonId: 94,
        name: "Ghastly",
        cost: 25.99,
        type: {
            type1: "psychic",
            type2: null
        },
        quality: "reverse holo, good",
        rarity: "semi rare",
        img_url: "https://m.media-amazon.com/images/I/51TIWx7DDIL._AC_.jpg"
    },
    {
        id: 4,
        pokemonId: 150,
        name: "Mewto",
        cost: 150.25,
        type: {
            type1: "psychic",
            type2: null
        },
        quality: "near mint",
        rarity: "rare",
        img_url: "https://m.media-amazon.com/images/I/51QO4llkk7L._AC_.jpg"
    },
    {
        id: 5,
        pokemonId: 144,
        name: "Articuno",
        cost: 5.76,
        type: {
            type1: "water",
            type2: "flying"
        },
        quality: "fair",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51PtkDlud4L._AC_.jpg"
    },
    {
        id: 6,
        pokemonId: 143,
        name: "Zapados",
        cost: 40.00,
        type: {
            type1: "electric",
            type2: "flying"
        },
        quality: "extra fine, first edition",
        rarity: "rare",
        img_url: "https://m.media-amazon.com/images/I/51l4OIDKQSL._AC_.jpg"
    },
    {
        id: 7,
        pokemonId: 653,
        name: "Fennekin",
        cost: 1.69,
        type: {
            type1: "fire",
            type2: null
        },
        quality: "reverse holo",
        rarity: "rare",
        img_url: "https://m.media-amazon.com/images/I/51Jr8J1R2-L._AC_.jpg"
    },
    {
        id: 8,
        pokemonId: 74,
        name: "Geodude",
        cost: 3.98,
        type: {
            type1: "fighting",
            type2: null
        },
        quality: "mint",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/41DaseWiS4L._AC_.jpg"
    },
    {
        id: 9,
        pokemonId: 799,
        name: "Guzzlord",
        cost: 5.44,
        type: {
            type1: "dark",
            type2: "psychic"
        },
        quality: "very good",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51fJUJhWNBL._AC_.jpg"
    },
    {
        id: 10,
        pokemonId: 782,
        name: "Jangmo-o",
        cost: 10.11,
        type: {
            type1: "dragon",
            type2: "electric"
        },
        quality: "extra fine",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51Xd8iVTl7L._AC_.jpg"
    },
]