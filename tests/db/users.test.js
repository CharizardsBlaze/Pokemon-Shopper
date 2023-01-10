const {createFakeUser, getFakeUserByEmail, getFakeUserById} = require('../dbHelpers')

const bcyrpt = require('bcrypt')
const client = require('../../db/index')
const {dropTables, createTables} = require('../../db/initdb')
const {createUser} = require('../../db/users')

describe('./db/Users', () => {
    beforeAll(() => client.connect())
    beforeEach(async() => {await dropTables(), await createTables()})
    afterAll(async() => client.end())
        describe("createUser", () => {
            it("It should create and return the user without the password", async() => {
                let fakeData = {}
                fakeData.username = Math.random()
                fakeData.firstName = Math.random()
                fakeData.lastName = Math.random()
                fakeData.password = Math.random()
                fakeData.emailAddress = Math.random()
                fakeData.phoneNumber = Math.random()
                const user = await createUser(fakeData);
                const fakeUser = await client.query(`
                SELECT * FROM users
                WHERE id=$1;
                `, [user.id])
                delete fakeUser.password
                expect(user).toEqual(fakeUser)
            })
            it('Should hash the users password using bcyrpt', async() => {
                let fakeData = {}
                fakeData.username = Math.random()
                fakeData.firstName = Math.random()
                fakeData.lastName = Math.random()
                fakeData.password = Math.random()
                fakeData.emailAddress = Math.random()
                fakeData.phoneNumber = Math.random()
                const user = await createUser(fakeData)
                const fakeUser = await client.query(`
                SELECT * FROM users
                WHERE id=$1
                `, [user.id])
                let checkPassword =  bcyrpt.compare(fakeData.password, fakeUser.password)
                expect(checkPassword).toEqual(true)
                
            })
        })
        describe('getUserByEmail', () => {
            it('Selects and returns the user by their email without their password', async() => {
                const fakeUser = await createFakeUser()
                const fakeUserByEmail = await getUserByemailAddress({emailAddress: fakeUser.emailAddress})
                expect(fakeUserByEmail).toEqual(fakeUser)
        })
    })
         describe("getUserById", () => {
            it('Selects and returns the user by their Id without their password' , async() => {
                const fakeUser = await createFakeUser()
                const fakeUserById = await getUserById({id: fakeUser.id})
                expect(fakeUser).toEqual(fakeUserById)
        })
    })
})
