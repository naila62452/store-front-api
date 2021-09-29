# Database creation:

FIRST CREATE USER:
1. We need to install psql database and then go to that directory and create user.
CREATE USER postgres WITH PASSWORD 'password1234';

2. We can create database with sql query.
CREATE DATABASE store_api;
CREATE DATABASE store_api_test;
Test database is used for testing purposes.

3. To go into the database.
\c store_api

4. Grant the permissions.
GRANT ALL PRIVILEGES ON DATABASE store_api TO postgres;
GRANT ALL PRIVILEGES ON DATABASE store_api_test TO postgres;

# store-front-api project set up

Project set up:
1. You need node js installed for this project.
run in the command line to install the required packages.
command: npm install

2. There is a script to run that project you can use that.
npm run start
The will start the project with the help of nodemon and it will run on the port 3000
"http://localhost:3000"

3. Postman is used to test the end points and all end points working.

# Environment variables:

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_api
POSTGRES_TEST_DB=store_api_test
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=password1234
ENV=dev
BCRYPT_PASSWORD=speak-friend
SALT_ROUNDS=10
TOKEN_SECRET = alomorah123