# User API Spec

## SignUp User

Endpoint: POST / signup

Request Body:

```json
{
    "name": "Farhan Tirta Kesumah",
    "email": "test@gmail.com",
    "password": "qwertyui"
}
```

Response Body:

```json
{
    "data": {
        "id": 18,
        "email": "test@gmail.com",
        "password": "$2b$10$L3gYldlD4LqwGWSyBLlp6e/AocGq8ycK3PXQ1WIiH3Iup/GCCeHCW",
        "name": "Farhan Tirta Kesumah",
        "updatedAt": "2024-11-18T14:33:57.185Z",
        "createdAt": "2024-11-18T14:33:57.185Z"
    }
}
```


## SingIn User

Endpoint: POST / signin

Request Body:

```json
{
    "email": "test@gmail.com",
    "password": "qwertyui"
}
```

Response Body:

```json
{
    "data": {
        "accessTokens": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN1YiI6MSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MzE5NDA0OTIsImV4cCI6MTczMTk0NDA5Mn0.k81io34egDs-P2OYHgZYyv5BIdo92n7onoGb2B2YF3M"
    }
}
```

