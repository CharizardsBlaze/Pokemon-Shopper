# Pokemon Shopper

Pokemon Shopper is a single-page e-commerce web application.



Deployed site: <URL>

![Screen Shot 2023-01-24 at 6 12 29 PM](https://user-images.githubusercontent.com/109768964/214458281-0566e529-753b-4628-9d17-0d263a960dd6.png)

***

## Installation

Before you get started, you will have to have [Postico](https://eggerapps.at/postico2/), [Postgres](https://postgresapp.com/), and [Node](https://nodejs.org/en/) installed. 

[Postman](https://www.postman.com/) is not required, but it is helpful for testing API calls.

After you fork / clone this repo, you will have to install all required packages in the package.json file and make a few file changes.

```
npm install
```

***

### `.env`

After you have done that, you must go into the top level of the application and create an `.env` file. Inside that file, create a JWT secret: 

```
JWT_SECRET="{{secret string}}"
```

You cannot register a new user without the JWT secret. 

***

### Database
After you have created an .env file, you will have to initialize the database and fill it with seed data. Make sure you are connected to the database in Postico through the url in the `db/index.js` file. 

Then the following script will fill the database with some dummy users and about 50 seed Pokemon cards.

```
npm run db:build
```

***

### Server

After you have the database built, you must connect the server. The following command will initialize `nodemon` on the Express.JS server based on the url in the top level `index.js` file: 

```
npm run server:dev
```

After you do that, your terminal window should display

```
Server listenining on {port}
```

Now that your server is connected and talking to the database, let's get the front end rendered.

### Interface

The following script will begin the React rending process on the HTML and CSS for the website:

```
npm run start
```

After that you should have a fully functioning e-commerce website!

The server file is located in the top level, inside `index.js`. `api/index` is the top-level api file. 

The Postgres url for connecting to the database is located in `db/index.js`. 

Bcrypt is used to hash user passwords before they are stored in the database.

Stripe is implimented for user purchases and credit card verification. 

***

## Functions

A brief rundown on things various users are able to do.

Any user can browse the products that are for sale and see more details (rarity, price, quantity available, etc.) about any of the cards. 

Users can also search for their favorite Pokemon and filter the results by condition.

Registered users can add items to their cart, where they can also update the quantity they wish to buy, or remove an item from their cart entirely. Registered users can then proceed to "check out" through our Stripe interface.

Admin users can see and edit user information (for password resets, or to make another user an admin) and are capable of adding new products to the site. 

## About

This project was created by [Jaron Chretien](https://www.linkedin.com/in/jaron-chretien/), [Pierce Babineaux](https://www.linkedin.com/in/pierce-babineaux/), [Justin Syrett](https://www.linkedin.com/in/justin-syrett/), and [Marcus Moritz](https://www.linkedin.com/in/marcusmoritz/) in January 2023 for Fullstack Academy's capstone project. 

## Tech used

The server and API is written in Express.JS, which handles user login with JSON web tokens, hashing of the users password with Bcrypt during registration, POS calls using Stripe, and various database calls for each product.

The front-end is written in React.JS and handles one-page loading and refreshing of various components.

The database is written in Postgres / SQL.

Database schema:

Our database is built around the `products` table and the `users` table. Specifically the Id's for each.

Each product has a unique Id that attaches it to a rarity (1 through 4) table, a condition table (good, mint, etc), and to the users cart if they want to purchase it. 

The users table stores all the user data (username, email, address, etc) upon registering. Each user also has a unique Id that is used throughout the functionality of the website. The Id is used to connect and create a user's cart, and when they go to checkout, takes the cart information and creates an order_cart row in the `order_cart` table and an `order_item` for each product they have purchased. 






change summary, describe "why" the website focus is ... what was important to us when we were building it


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

