# Getting Started

## Prerequisites
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Installation
- Clone the repository
- Run `yarn install` to install dependencies

## Running the app
- Run `yarn workspace backend prisma migrate deploy` to deploy the database schema
- Run `yarn workspace backend prisma generate` to generate the Prisma client
- Run `yarn workspace backend dev` to start the backend server

You should now be able to access the app at `http://localhost:3000`.

The last command above will serve the static files bundled with the project. If you want to change the frontend then you need to run `yarn workspace frontend build` and then `yarn workspace backend dev` again after you've made your changes.

# FAQ

## Auth

### How are passwords stored?

Passwords are stored in the database as a hash generated using the argon2 algorithm. This means that even if the database is compromised the passwords cannot be recovered.

Using the same algorithm the server can verify that a password is correct without storing the password in plain text.

### How do sessions work?

Because it's difficult to setup and demo a full authentication system with a database, sessions are stored in the browser as an encrypted cookie. This means that even if the server is restarted the user will still be logged in and their session data will stay. The same applies for closing and opening the browser or browser window.

### How does authentication work?

Authentication uses the stateless sessions described above by storing the user's primary key in the session cookie, meaning that the user can be retrieved from the database given the session cookie which is part of every request.

When a user logs in they send a username and password to the server which responds with a encrypted cookie containing the user's primary key. This allows the server to identify the user without storing any session data on the server.

### How does authorization work?

Before each query the server checks to see if the user is logged in and has the correct access level. If the user is not logged in or does not have the correct access level then the server will respond with a 401 error.

## Database

The database is a local SQLite database containing all the tables specified in the `packages/backend/prisma/schema.prisma` file.

## Backend

The backend is built using a framework called Fastify which uses the Request Response pattern.

Fastify has the ability to manipulate sessions, get the currently logged in user, and send queries to the database.

## Frontend

Frontend is built using react and regularly sends data to the server using queries. 

# Glossary

- **Backend**: The server that handles all the requests from the frontend and the database.
- **Frontend**: The client that the user interacts with.
- **Database**: The database that stores all the data.
- **Session**: A session is a way to store data on the client. This is used to store the user's primary key.
- **Query**: A query is a request to the server to get data from the database.
- **Mutation**: A mutation is a request to the server to change data in the database.
- **Stateless Session**: A stateless session is a session that is stored on the client and not on the server.
- **Stateful Session**: A stateful session is a session that is stored on the server and not on the client which is typically how sessions work.
- **Prisma**: Prisma is a database toolkit that allows you to easily connect to a database and send queries to it.
- **Fastify**: Fastify is a web framework that uses the Request Response pattern.
- **React**: React is a frontend framework that allows you to easily create components and send queries to the server.
- **Yarn**: Yarn is a package manager that allows you to easily install dependencies.
- **Node.js**: Node.js is a JavaScript runtime that allows you to run JavaScript outside of the browser.
- **NPM**: NPM is a package manager that allows you to easily install dependencies.
- **Cookie**: A cookie is a small piece of data that is stored on the client. Cookies are used to store session data.

