# PRISMA ORM

## How to use schema.prisma file to edit database schema

1. Edit the schema.prisma file to have your desired schema changes
2. Save the file
3. Run the command `prisma migrate dev --name <name of migration>`

This will create a new migration with the changes you have made, and apply them to the database.
