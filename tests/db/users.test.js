const {createFakeUser, getFakeUserByEmail, getFakeUserById} = require('../dbHelpers')

const bcyrpt = require('bcrypt')
const client = require('../../db/index')
const {dropTables, createTables} = require('../../db/initdb')
const {createUser, getUserById, getUserByEmail} = require('../../db/users')

describe('./db/Users', () => {
    beforeAll(() => client.connect())
    beforeEach(async() => {await dropTables(), await createTables()})
    afterAll(async() => client.end())
        describe("createUser", () => {
            it("It should create and return the user without the password", async() => {
                let fakeData = {}
                fakeData.username = String(Math.random())
                fakeData.firstName = String(Math.random())
                fakeData.lastName = String(Math.random())
                fakeData.password = String(Math.random())
                fakeData.emailAddress = String(Math.random())
                fakeData.phoneNumber = String(Math.random())
                const user = await createUser(fakeData);
                const {rows: [fakeUser]} = await client.query(`
                SELECT * FROM users
                WHERE id=$1;
                `, [user.id])
                delete fakeUser.password
                expect(user).toEqual(fakeUser)
            })
            it('Should hash the users password using bcyrpt', async() => {
                let fakeData = {}
                fakeData.username = String(Math.random())
                fakeData.firstName = String(Math.random())
                fakeData.lastName = String(Math.random())
                fakeData.password = String(Math.random())
                fakeData.emailAddress = String(Math.random())
                fakeData.phoneNumber = String(Math.random())
                const user = await createUser(fakeData)
                const {rows: [fakeUser]} = await client.query(`
                SELECT * FROM users
                WHERE id=$1
                `, [user.id])
                let checkPassword =  await bcyrpt.compare(fakeData.password, fakeUser.password)
                expect(checkPassword).toEqual(true)
                
            })
        })
        describe('getUserByEmail', () => {
            it('Selects and returns the user by their email without their password', async() => {
                const fakeUser = await createFakeUser()
                const fakeUserByEmail = await getUserByEmail({emailAddress: fakeUser.emailAddress})
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
