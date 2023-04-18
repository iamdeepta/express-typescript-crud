# express-typescript-crud
A simple crud application using express, typescript and firestore


# API endpoints

1. GET - https://express-typescript-firestore-crud-iamdeepta.vercel.app/api/v1/users (Get all users)

2. POST - https://express-typescript-firestore-crud-iamdeepta.vercel.app/api/v1/users (Create a user)

JSON payload for example: 
{
    "name": "Name",
    "email": "email@email.com",
    "phone": "01*********",
    "address": "Address"
}

3. GET - https://express-typescript-firestore-crud-iamdeepta.vercel.app/api/v1/users/:id (Get a user by user id)

4. PUT - https://express-typescript-firestore-crud-iamdeepta.vercel.app/api/v1/users/:id (Update a user by user id)

JSON payload for example: 
{
    "name": "Name Updated",
}

5. DELETE - https://express-typescript-firestore-crud-iamdeepta.vercel.app/api/v1/users/:id (Delete a user by user id)
