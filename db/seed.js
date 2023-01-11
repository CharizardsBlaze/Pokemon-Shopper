const client = require('./index')
const {dropTables, createTables} = require('./initdb');
const {createCartItem, getCartItemsByUserId} = require('./cart')
const { createUser } = require('./users')
const {createProduct} = require('./products')

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
        pokedexId: 1,
        name: "Bulbasaur",
        cost: 100.00,
        type1: "plant",
        type2: null,
        quality: "used",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/410qBt1e7LL._AC_.jpg",
    },
    {
        id: 2,
        pokedexId: 7,
        name: "Squirtle",
        cost: 1.50,
        type1: "water",
        type2: null,
        quality: "fair to good",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51TxlvrsoBL._AC_.jpg",
    },
    {
        id: 3,
        pokedexId: 94,
        name: "Ghastly",
        cost: 25.99,
        type1: "psychic",
        type2: null,
        quality: "reverse holo, good",
        rarity: "semi rare",
        img_url: "https://m.media-amazon.com/images/I/51TIWx7DDIL._AC_.jpg"
    },
    {
        id: 4,
        pokedexId: 150,
        name: "Mewto",
        cost: 150.25,
        type1: "psychic",
        type2: null,
        quality: "near mint",
        rarity: "rare",
        img_url: "https://m.media-amazon.com/images/I/51QO4llkk7L._AC_.jpg"
    },
    {
        id: 5,
        pokedexId: 144,
        name: "Articuno",
        cost: 5.76,
        type1: "water",
        type2: "flying",
        quality: "fair",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51PtkDlud4L._AC_.jpg"
    },
    {
        id: 6,
        pokedexId: 143,
        name: "Zapados",
        cost: 40.00,
        type1: "electric",
        type2: "flying",
        quality: "extra fine, first edition",
        rarity: "rare",
        img_url: "https://m.media-amazon.com/images/I/51l4OIDKQSL._AC_.jpg"
    },
    {
        id: 7,
        pokedexId: 653,
        name: "Fennekin",
        cost: 1.69,
        type1: "fire",
        type2: null,
        quality: "reverse holo",
        rarity: "rare",
        img_url: "https://m.media-amazon.com/images/I/51Jr8J1R2-L._AC_.jpg"
    },
    {
        id: 8,
        pokedexId: 74,
        name: "Geodude",
        cost: 3.98,
        type1: "fighting",
        type2: null,
        quality: "mint",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/41DaseWiS4L._AC_.jpg"
    },
    {
        id: 9,
        pokedexId: 799,
        name: "Guzzlord",
        cost: 5.44,
        type1: "dark",
        type2: "psychic",
        quality: "very good",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51fJUJhWNBL._AC_.jpg"
    },
    {
        id: 10,
        pokedexId: 782,
        name: "Jangmo-o",
        cost: 10.11,
        type1: "dragon",
        type2: "electric",
        quality: "extra fine",
        rarity: "common",
        img_url: "https://m.media-amazon.com/images/I/51Xd8iVTl7L._AC_.jpg"
    },
]

const seedUsers = [
    {
        username: "fastAndy",
        firstName: "Andrew",
        lastName: "Smith",
        emailAddress: "a_wallenberg@yahoo.org",
        password: "iHa8PoekMen",
        address: {
            addressLine1: "150 Wallenberg Way",
            addressLine2: "Apt 2",
            city: "Orlando",
            state: "FL",
            zip: 90956,
        },
        cart: {
            products: [1, 2, 3] // references productNumber
        },
        role: 1, //user role, admin role?
    },
    {
        username: "JAllen",
        firstName: "Jennifer",
        lastName: "Allensborough",
        emailAddress: "jborough@hotmail.gov",
        password: "What1nTheWorld.!",
        address: {
            addressLine1: "1250 Sidways Drive",
            addressLine2: null,
            city: "Allentown",
            state: "WV",
            zip: 40740,
        },
        cart: {
            products: [8] // references productNumber
        },
        role: 1, //user role, admin role?
    },
    {
        username: "JOKER-D",
        firstName: "Devonte",
        lastName: "Jochik",
        emailAddress: "theJoker45@gmail.comp",
        password: "theJokerIsBack123",
        address: {
            addressLine1: "18750 County Line Road 45",
            addressLine2: null,
            city: "Second Junction",
            state: "OH",
            zip: 60556,
        },
        cart: {
            products: [] // references productNumber
        },
        role: 1, //user role, admin role?
    },
    {
        username: "HorsePerson",
        firstName: "Sarah",
        lastName: "Jessica-Parker",
        emailAddress: "horseface2001@hotmail.web",
        password: "oneletters",
        address: {
            addressLine1: "300 West 42nd Street",
            addressLine2: "Unit 203",
            city: "New York",
            state: "NY",
            zip: 12042,
        },
        cart: {
            products: [1, 2, 3, 4, 5, 6, 7, 8, 9] // references productNumber
        },
        role: 1, //user role, admin role?
    },
    {
        username: "The1",
        firstName: "Neo",
        lastName: null,
        emailAddress: "the0ne@matrix.dev",
        password: "passw0rd123!",
        address: {
            addressLine1: "Edge of the Way Lane",
            addressLine2: null,
            city: "Las Vegas",
            state: "NV",
            zip: 70707,
        },
        cart: {
            products: [1] // references productNumber
        },
        role: 2, //user role, admin role?
    },
    {
        username: "MrAnderson",
        firstName: "Mr",
        lastName: "Anderson",
        emailAddress: "thedirector@email.net",
        password: "Thi1sPasswordRocks@",
        address: {
            addressLine1: null,
            addressLine2: null,
            city: null,
            state: null,
            zip: null,
        },
        cart: {
            products: [5] // references productNumber
        },
        role: 1, //user role, admin role?
    },
    {
        username: "NicDaQuick",
        firstName: "Nicholas",
        lastName: "Worffen-Styme",
        emailAddress: "not1that2wharf3@aol.org",
        password: "password1234password",
        address: {
            addressLine1: "1204 Center Circle",
            addressLine2: null,
            city: "White Fish",
            state: "ID",
            zip: 78430,
        },
        cart: {
            products: [1, 9] // references productNumber
        },
        role: 2, //user role, admin role?
    }
]

const insertUsersIntoDB = async () => {
    console.log('putting seed users into database');
    seedUsers.forEach((user) => {
        createUser(user)
    })
    console.log('done inserting seed users');
};

const insertProductsIntoBd = async () => {
    seedProduct.forEach(async(product) => {
        await createProduct({
            pokedexId: product.pokedexId,
            name: product.name,
            price: product.cost,
            type1: product.type1,
            type2: product.type1,
            condition:product.quality,
            rarity:product.rarity,
            imageUrl: product.img_url
        })
    })
}

const rebuildDB = async () => {
    dropTables();
    createTables();
    // put each fake user into the database
    insertUsersIntoDB();
    //insert each product into db
    insertProductsIntoBd ()
}
client.connect();

rebuildDB().catch(console.error).finally(() => client.end)

