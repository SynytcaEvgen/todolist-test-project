Test poject To-do list 

Stack: REST API, NestJS, mysql, typeORM, jwt, typescript


Documentation start: 

"HOSTING" - some hostion ( for example: localhost:3000 )
"IDTODO" - id to-do (for example: 1)

Swagger http://HOSTING/api/docs

1. User Registarition:

POST http://HOSTING/auth/registaration

Example request (JSON)
{
  "name": "Name user", // optional parameter
  "email": "examplemail@mail.com",
  "password": "1234567890",
}

Example response (JSON)

{
    "token": "XXXXXXXXXXXXXXXXXXX" // jwt token
}

2. User authorization:

POST http://HOSTING/auth/login

Example request (JSON)
{
  "email": "examplemail@mail.com",
  "password": "1234567890",
}

Example response (JSON)

{
    "token": "XXXXXXXXXXXXXXXXXXX" // jwt token
}

3. Add item to to-do list:

POST http://HOSTING/rest/todo
Headers 
Authorization: token

Example request (JSON)
{
  "title": "to-do",
}

Example response (JSON)
{
    "title": "to-do",
    "user": 13,
    "created_at": "2021-12-10T10:09:58.792Z",
    "updated_at": "2021-12-10T10:09:58.792Z",
    "id": 21,
    "isComplited": false
}

4. Edit item/mark as done in todolist:

PUT http://HOSTING/rest/todo/IDTODO
Headers 
Authorization: token

Example request (JSON)
{
  "title": "to-do", //(only string) optional parameter if need change title
  "isComplited": true //(only boolen) optional parameter if need mark as done
}

Example response (JSON)
{
    "id": IDTODO,
    "isComplited": true,
    "title": "to-do",
    "created_at": "2021-12-10T09:20:19.315Z",
    "updated_at": "2021-12-10T09:22:22.000Z"
}

5. Remove item from todolist:

DELETE http://HOSTING/rest/todo/IDTODO
Headers 
Authorization: token


Example response (JSON)
{
    "action": "Delete",
    "status": "success",
    "delete_obj_id": "18"
}

5. Remove item from todolist:

GET http://localhost:3000/rest/todo
Headers 
Authorization: 

Example response (JSON)
[
    {
        "id": 19,
        "title": "To-do list test - 3",
        "isComplited": false,
        "created_at": "2021-12-10T09:24:01.949Z",
        "updated_at": "2021-12-10T09:24:01.949Z"
    },
    {
        "id": 17,
        "title": "To-do  list test - 1",
        "isComplited": false,
        "created_at": "2021-12-10T09:23:53.431Z",
        "updated_at": "2021-12-10T09:23:53.431Z"
    },
    {
        "id": 16,
        "title": "To-do  change",
        "isComplited": true,
        "created_at": "2021-12-10T09:20:19.315Z",
        "updated_at": "2021-12-10T09:22:22.000Z"
    }
]