const bcrypt = require("bcrypt");
const client = require(".");

const createUser = async ({
  username,
  firstName,
  lastName,
  password,
  emailAddress,
  phoneNumber,
}) => {
  const cryptedPassword = await bcrypt.hash(password, 10);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, "firstName", "lastName", password, "emailAddress", "phoneNumber")
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT ("emailAddress") DO NOTHING
        RETURNING id, username, "firstName", "lastName", "emailAddress", "phoneNumber", "isAdmin"
        ;
        `,
      [
        username,
        firstName,
        lastName,
        cryptedPassword,
        emailAddress,
        phoneNumber,
      ]
    );
    console.log("USERS", user);
    return user;
  } catch (error) {
    console.error("There was an error creating the user in the db:", error);
    throw error;
  }
};
const getUserById = async ({ id }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username, "firstName", "lastName", "emailAddress", "phoneNumber", "isAdmin"
            FROM users
            WHERE id = $1
            ;
        `,
      [id]
    );
    return user;
  } catch (error) {
    throw new Error("Error getting user by Id");
  }
};
const getUserByEmail = async ({ emailAddress }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE "emailAddress" = $1
            ;
        `,
      [emailAddress]
    );
    return user;
  } catch (error) {
    throw new Error("Error getting use by Email");
  }
};
const getUserByUsername = async ({ username }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username = $1
            ;
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw new Error("Error getting use by Email");
  }
};
const verifyUser = async ({ emailAddress, password }) => {
  try {
    const {
      rows: [userPassword],
    } = await client.query(
      `
            SELECT password
            FROM users
            WHERE "emailAddress" = $1
            ;
        `,
      [emailAddress]
    );
    return await bcrypt.compare(password, userPassword.password);
  } catch (error) {
    throw new Error(
      "Login was not successful, please check your username or password"
    );
  }
};

const updateUser = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING id, username, "firstName", "lastName", "emailAddress", "phoneNumber", "isAdmin";
        `,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    console.error("Error updating user user.js DB: ", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  verifyUser,
  getUserByUsername,
  updateUser,
};
