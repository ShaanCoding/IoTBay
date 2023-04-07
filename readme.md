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