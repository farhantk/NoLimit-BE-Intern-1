# Post API Spec

## Get all post

Endpoint: GET /post

Response Body:

```json
{
    "data": [
        {
            "id": 2,
            "content": "lorem ipsumretgre",
            "authorId": 1,
            "createdAt": "2024-11-17T10:41:27.000Z",
            "updatedAt": "2024-11-17T11:31:41.000Z",
            "author": {
                "id": 1,
                "name": "Farhan Tirta Kesumah",
                "email": "test@gmail.com",
                "password": "$2b$10$ZLG.11RJXglyX7uk1rzlUu4HmjE1hvfXoAa99pobo37mTXfahKO4G",
                "createdAt": "2024-11-17T05:15:22.000Z",
                "updatedAt": "2024-11-17T05:15:22.000Z"
            }
        }
    ]
}
```


## Get post by ID

Endpoint: GET /post/{id}

Response Body:

```json
{
    "data": [
        {
            "id": 2,
            "content": "lorem ipsumretgre",
            "authorId": 1,
            "createdAt": "2024-11-17T10:41:27.000Z",
            "updatedAt": "2024-11-17T11:31:41.000Z",
            "author": {
                "id": 1,
                "name": "Farhan Tirta Kesumah",
                "email": "test@gmail.com",
                "password": "$2b$10$ZLG.11RJXglyX7uk1rzlUu4HmjE1hvfXoAa99pobo37mTXfahKO4G",
                "createdAt": "2024-11-17T05:15:22.000Z",
                "updatedAt": "2024-11-17T05:15:22.000Z"
            }
        }
    ]
}
```

## Create post

Endpoint: POST /post/create

Headers:
-Authorization: {token}

Request Body:

```json
{
    "content": "lorem ipsumretgre"
}
```

Response Body:
```json
{
    "data": {
        "id": 13,
        "content": "lorem ipsumretgre",
        "authorId": 1,
        "updatedAt": "2024-11-18T14:43:00.636Z",
        "createdAt": "2024-11-18T14:43:00.636Z"
    }
}
```
## Update post

Endpoint: PUT /post/{id}

Headers:
-Authorization: {token}

Request Body:

```json
{
    "content": "dah diedit lorem ipsumretgre"
}
```

Response Body:
```json
{
    "id": 13,
    "content": "dah diedit lorem ipsumretgre",
    "authorId": 1,
    "createdAt": "2024-11-18T14:43:00.000Z",
    "updatedAt": "2024-11-18T14:48:10.000Z",
    "author": {
        "id": 1,
        "name": "Farhan Tirta Kesumah",
        "email": "test@gmail.com",
        "password": "$2b$10$ZLG.11RJXglyX7uk1rzlUu4HmjE1hvfXoAa99pobo37mTXfahKO4G",
        "createdAt": "2024-11-17T05:15:22.000Z",
        "updatedAt": "2024-11-17T05:15:22.000Z"
    }
}
```
## Delete post

Endpoint: DELETE /post/{id}

Headers:
-Authorization: {token}


Response Body: Get all post

