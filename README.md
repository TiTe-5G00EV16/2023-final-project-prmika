[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qBr6G7dS)
# final-project
Web Programming 2023 - Final Project

This is my project for web-development course

create .env file in the backend:

PORT = 5000
MYSQL_HOST='localhost'
MYSQL_USERNAME='root'
MYSQL_PASSWORD='example'
MYSQL_DATABASE='example_db'
JWT_KEY='super-secret-key-for-token'

create .env file in the frontend:

VITE_API_URL=http://localhost:5000

Running localy:

Docker:
  -docker compose up -d
  
Frontend:
  ./frontend/
    -npm install
    -npm run dev

Backend:
  ./backend
    -npm install
    -nodemon serve.js

Running tests:

Frontend:
  ./frontend/
    -npm run test

Backend:
  jest:
    ./backend
      -npm run test





Links:

Frontend:
https://frontend-9s73.onrender.com/

Backend:
https://backend-z8ll.onrender.com

