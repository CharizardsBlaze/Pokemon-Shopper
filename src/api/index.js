const {REACT_APP_BASE_URL = 'http://localhost:3001/api' } = process.env
const BASE_URL = REACT_APP_BASE_URL
export async function registerUser(username, firstName, lastName, password, emailAddress, phoneNumber = null) {
    try{
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            password,
            emailAddress,
            phoneNumber
        })
    })
    const result = await response.json()
    return result;
    }catch(error){
        console.log('error registering user in src/api')
        throw error
    }
}
export async function loginUser(emailAddress, password) {
    try{
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailAddress,
            password
        })
    })
    const result = await response.json()
    return result;
    }catch(error){
        console.log('error Logging in user in src/api')
        throw error
    }
}
export const getUser = async (token) => {
    try{
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log('There was an error getting user')
        throw error
    }
}
export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/cards`);
        const allProducts = await response.json();
        return allProducts;
    } catch (error) {
        console.log('there was an error getting all prodcuts in src/api/: ', error);
        throw error;
    }
}

export const getOneProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/cards/${productId}`);
        const oneProduct = await response.json();
        return oneProduct;
    } catch (error) {
        console.log('there was an error getting one product in src/api: ', error);
        throw error;
    }
}
export const getProductsByCondition = async({conditionId, rarityId}) => {
    try {
        const response = await fetch(`${BASE_URL}/cards/search?condition=${conditionId}&rarity=${rarityId}`)
        const result = response.json()
        return result
    }catch(error) {
        console.error("There was an error getting the products by condition", error)
        throw error
    }
}

export const getUserCart = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Beaer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error){
        console.log("there was an error getting the user cart in src/api", error) 
        throw error
    }
}

export const addToCart = async ({product_id, quantity, token}) => {
    try {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            product_id: product_id,
            quantity: quantity
        })
    }).then(result => result.json())
    
    return response
    }catch(error) {
        console.log("There was an error adding an item to cart in src/api", error)
        throw error
        }
}

export const editQuantityOnCart = async ({token, quantity, cart_id}) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/${cart_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: quantity
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error editing the quantity in the api call", error)
        throw error
    }
}

export const removeFromCart = async({cart_id, token}) => {
    try {
    const response = await fetch(`${BASE_URL}/cart`,{
        method: 'DELETE',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            cart_id: cart_id, 
        })
    }).then(result => result.json())
    return response
    }catch(error) {
        console.log("There was an error removing from cart in src/api", error)
        throw error
    }
}

export const deleteCart = async({token}) => {
    try {
    const resopnse = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers : {
            'Authorization': `Bearer ${token}`
        }
    }).then(result => result.json()) 
    return resopnse
    }catch(error) {
        console.log("There was an error deleting the user cart", error)
        throw error
    }
}
export const paymentInitialize = async (items) => {
    try{
        const response = await fetch(`${BASE_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({items})
        })
        const result = await response.json();
        return result;
    } catch(error){
        console.log('Error in payment init')
        throw error
    }
}
export const deleteProduct = async (user, productId, token) => {
    try{
        const response = await fetch(`${BASE_URL}/cards/${productId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({user})
        })
        const result = await response.json();
        return result;
    } catch(error){
        throw error
    }
}
export const createNewProduct = async (pokedexId, name, price, type1, type2, condition, rarity, quantity, imageUrl, token) => {
    try{
        const response = await fetch(`${BASE_URL}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                pokedexId,
                name,
                price,
                type1,
                type2,
                condition,
                rarity,
                quantity,
                imageUrl,
            })
        })
        const result = response.json();
        return result;
    } catch(error){
        throw error
    }
}
export const adminEditProduct = async (pokemonId, pokedexId, name, price, type1, type2, condition, quantity, imageUrl, token) => {
    try{
        const response = await fetch(`${BASE_URL}/cards/update/${pokemonId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                pokedexId,
                name,
                price,
                type1,
                type2,
                condition,
                quantity,
                imageUrl,
            })
        })
        const result = response.json();
        return result;
    } catch(error){
        throw error
    }
}

export const getAllConditions = async() => {
    try {
    const response = await fetch(`${BASE_URL}/cards/conditions`)
    const result = await response.json()
    return result
    }catch(error) {
        throw error
    }
}

export const getAllRarities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cards/rarities`).then((result) =>
      result.json()
    );
    return response;
  } catch (error) {
    console.error(
      "There was an error fetching all the rarities in the src/api",
      error
    );
    throw error;
  }
};

export const updateProfile = async (user, token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }).then((result) => result.json());
    return response;
  } catch (error) {
    console.error("There was an error updating the user", error);
    throw error;
  }
};

export const checkout = async ({ cart, address, state, city, zip, token }) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart,
        address,
        state,
        city,
        zip,
      }),
    }).then((result) => result.json());
    return response;
  } catch (error) {
    console.error("There was an error checking out in the src/api", error);
    throw error;
  }
};

export const getOrderHistory = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => result.json());
    return response;
  } catch (error) {
    console.error(
      "There was an error getting the order history in src/api",
      error
    );
    throw error;
  }
};
