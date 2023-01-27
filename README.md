# Pokemon Shopper

Pokemon Shopper is an e-commerce web application where fans of the trading card game can buy Pokemon cards.

Any user can browse the products that are for sale and see more details (rarity, price, quantity available, etc.) about any of the cards. 

Users can also search for their favorite Pokemon and filter the results by condition.

Registered users can add items to their cart, where they can also update the quantity they wish to buy, or remove an item from their cart entirely. Registered users can then proceed to "check out" through our Stripe interface.

Admin users can see and edit user information (for password resets, or to make another user an admin) and are capable of adding new products to the site. 

Deployed site: <URL>

![Screen Shot 2023-01-24 at 6 12 29 PM](https://user-images.githubusercontent.com/109768964/214458281-0566e529-753b-4628-9d17-0d263a960dd6.png)

The database is written in Postgres, which stores user information, card information, shopping cart information, and orders information.

The server and API is written in Express.JS, which handles user login with JSON web tokens, user registration, POS calls using Stripe, and various database calls for the products for sale.

The front-end is written in React.JS and handles one-page loading and refreshing of various components.

## Installation

After you fork / clone this repo, you will have to install the packages required and make a few file changes.

```
npm install
```

Install will install these packages for you:

```
"@stripe/react-stripe-js"
"@stripe/stripe-js"
bcrypt (version 5.X)
cors (version 2.8)
dotenv (version 16.X)
express (verison 4.18)
jsonwebtoken (version 9)
pg (version 8.8)
react (version 18.2)
react-dom (version 18.2)
react-router-dom (version 6.6)
react-scripts (version 5.0)
semantic-ui-css (version 2.5)
stripe (version 11.6)
```
After you have done that, you must go into the top level of the application and create an `.env` file. Inside that file, create a JWT secret: `JWT_SECRET="{{secret string}}`.

You cannot register a new user without the JWT secret. 

```
npm run db:build
```
Db:build will seed the database with boilerplate users and Pokemon cards. 

```
npm run server:dev
```
Server:dev will run `nodemon` on the sever file so you can connect to the database.

```
npm run start
```
Start will begin the React rendering process. And after that you should have a fully functioning e-commerce website!

The server file is located in the top level, inside `index.js`. `api/index` is the top-level api file. 

The Postgres url for connecting to the database is located in `db/index.js`. 

Bcrypt is used to hash user passwords before they are stored in the database.

Stripe is implimented for user purchases and credit card verification. 

## About

This project was created by Jaron Chretien, Pierce Babineaux, Justin Syrett, and Marcus Moritz in January 2023 for Fullstack Academy's capstone project. 
<!-- 
# Pokemon-Shopper

What the project is (details) / tech used / how it was built

how to make changes (database url, etc)

Pokemon Shopper is a e-commerce website that allows Pokemon enthusiasts to to buy Pokemon cards.

A database was created with PostgreSQL to store Pokemon card information, user information, and orders. Express.JS handles the server calls and React.JS handles the rendering on the front end.

Deployed site: <URL>

![Screen Shot 2023-01-24 at 6 12 29 PM](https://user-images.githubusercontent.com/109768964/214458281-0566e529-753b-4628-9d17-0d263a960dd6.png)

JSON web tokens are used for user verification in combination with the JWT_SECRET in a .ENV file. 
(You will have to create this file if you are forking / cloning the project. JWT_SECRET="{{secret string}}" ).

Bcrypt is used to hash user passwords before they get stored in the database.

Stripe was implimented for user purchases and credit card verification. 

To render this project, you will have to run 

This website uses both a database built in PostgreSQL and an Express.JS server on the backend. 

To fork this project, make sure you follow these guidlines:
- npm install
  - It should install the following packages
      - "@stripe/react-stripe-js"
      - "@stripe/stripe-js"
      - bcrypt (version 5.X)
      - cors (version 2.8)
      - dotenv (version 16.X)
      - express (verison 4.18)
      - jsonwebtoken (version 9)
      - pg (version 8.8)
      - react (version 18.2)
      - react-dom (version 18.2)
      - react-router-dom (version 6.6)
      - react-scripts (version 5.0)
      - semantic-ui-css (version 2.5)
      - stripe (version 11.6)
- add a .ENV file at the top level of your app, inside that write a JWT Secret:
ex: JWT_SECRET="{{secret string}}"
- create a .gitignore file on the top level of the app, 
  - inside that, add .env
  
Contributing to Pokemon Shopper:
To contribute, follow these steps:





Fork this repository.
Create a branch: git checkout -b <branch_name>.
Make your changes and commit them: git commit -m '<commit_message>'
Push to the original branch: git push origin Pokemon Shopper/<location>
Create the pull request.

About: 
This project was created by Jaron Chretien, Pierce Babineaux, Justin Syrett, and Marcus Moritz in January 2023 for Fullstack Academy's capstone project.  -->

