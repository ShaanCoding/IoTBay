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

The last command above will serve the static files bundled with the project. If you want to change the frontend then you need to run `yarn workspace frontend build` and then `yarn workspace backend dev` again after you've made your changes.

# FAQ

## Auth

### How does authentication work?

Authentication uses stateless sessions. Sessions are stored in the user's browser as an encrypted cookie and are signed with a secret key. 

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