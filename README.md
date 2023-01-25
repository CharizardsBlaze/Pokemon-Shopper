# Pokemon-Shopper

What the project is (details) / tech used / how it was built

how to make changes (database url, etc)

Pokemon Shopper is a e-commerce website that allows Pokemon enthusiasts to to buy Pokemon cards.

It was created with PostgreSQL to store card information, user information, and orders. Express.JS handles the server calls and React.JS handles the rendering on the front end.

Deployed site: <URL>

![Screen Shot 2023-01-24 at 6 12 29 PM](https://user-images.githubusercontent.com/109768964/214458281-0566e529-753b-4628-9d17-0d263a960dd6.png)

JsonWebTokens are used for user verification in combination with the JWT_SECRET in a .ENV file. 
(You will have to create this file if you are forking / cloning the project. JWT_SECRET="{{secret string}}" ).

Bcrypt is used to hash user passwords before they get stored in the database.

Stripe was implimented for user purchases and credit card verification. 



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
This project was created by Jaron Chretien, Pierce Babineaux, Justin Syrett, and Marcus Moritz in January 2023 for Fullstack Academy's capstone project. 

