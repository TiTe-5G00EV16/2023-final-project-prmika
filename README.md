[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qBr6G7dS)

## Final PROJECT:
This is my project for web-development course

The project is an online marketplace using React, MySQL and Node.js.

Data is stored in database. Database has two tables "product" and "users". User specific and all users pages are locked behind authentication.

You can create user and add products to the marketplace. You can also see all your own products and edit/delete products.

Architecture of the project followed guidelines set by the course

Showcase video can be gound on the root of the repository in showcase.zip folder

### CHALLENGES:
I'm have used alot C# and .NET in my work and nodejs is not so familiar to me. Also props took me alot of learning.   


### INSTALLATION:

clone the repository
-----
create .env file in the backend:

PORT = 5000     
MYSQL_HOST='localhost'        
MYSQL_USERNAME='root'       
MYSQL_PASSWORD='example'      
MYSQL_DATABASE='example_db'     
JWT_KEY='super-secret-key-for-token'      

------
create .env file in the frontend:

VITE_API_URL=http://localhost:5000
------
Running localy:

Docker:
  -docker compose up -d
------
Frontend:   
  ./frontend/ 
    -npm install    
    -npm run dev
------
Backend:    
  ./backend   
    -npm install    
    -nodemon server.js    
------
Running tests:

Frontend:   
  ./frontend/   
    -npm run test   
    
    cypress:    
      ./frontend/   
      -npx cypress open   

Backend:    
  jest: 
    ./backend   
      -npm run test   
      
Backend:    
  jest: 
    ./backend   
      -npm run test

The application is deployed to Render

Links:

Frontend:
https://frontend-9s73.onrender.com/

Backend:
https://backend-z8ll.onrender.com

