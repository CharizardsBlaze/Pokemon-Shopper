const BASE_URL = 'http://localhost:3001/api'

export async function registerUser(username, firstName, lastName, password, emailAddress, phoneNumber) {
    try{
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username,
            firstName,
            lastName,
            password,
            emailAddress,
            phoneNumber
        }
    })
    const result = await response.json()
    return result;
    }catch(error){
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
        body: {
            emailAddress,
            password
        }
    })
    const result = await response.json()
    return result;
    }catch(error){
        throw error
    }
}