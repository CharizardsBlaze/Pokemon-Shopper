

const sever = require('../../index')
describe('api/users', () => {
    it('Should create and return message, token, and user data', async() => {
        let fakeData = {}
        fakeData.username = Math.random()
        fakeData.firstName = Math.random()
        fakeData.lastName = Math.random()
        fakeData.password = Math.random()
        fakeData.emailAddress = Math.random()
        fakeData.phoneNumber = Math.random()
        
        const response = await request(sever)
        .post('/api/users/register')
        .send(fakeData)
        expect(response.body).toMatchObject({
           message: expect.any(String),
           token: epect.any(String),
           user: {
            id: fakeData.id,
            username: fakeData.username,
            firstName: fakeData.firstName ,
            lastName: fakeData.lastName ,
            emailAddress: fakeData.emailAddress,
            phoneNumber: fakeData.phoneNumber 
           }
        })
    })
})
