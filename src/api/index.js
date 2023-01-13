const BASE_URL = 'http://localhost:3001/api'

export async function registerUser(username, firstName, lastName, password, emailAddress, phoneNumber) {
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

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/cards`);
        const allProducts = await response.json();
        console.log('products in front end api', allProducts)
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