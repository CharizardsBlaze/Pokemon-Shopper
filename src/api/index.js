const BASE_URL = 'http://localhost:3001/api'

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
        const response =  await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = response.json()
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
export const getProductsByCondition = async(condition) => {
    try {
        const response = await fetch(`${BASE_URL}/cards/condition/${condition}`)
        const result = response.json()
        console.log("result from filter here", result)
        return result
    }catch(error) {
        console.error("There was an error getting the products by condition", error)
        throw error
    }
}

export const getUserCart = async({token}) => {
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
            token: token,
            product_id: product_id,
            quantity: quantity
        })
    }).then(result => result.json())
    console.log('response in addToCart: ', response)
    
    return response
    }catch(error) {
        console.log("There was an error adding an item to cart in src/api", error)
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
        body: json.stringify({
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
