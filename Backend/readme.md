# User Registration Endpoint

## Endpoint: 
`/users/register`

### Method: 
`POST`

### Description:
This endpoint is used to register a new user. It validates the input data and creates a new user in the database if the data is valid.

### Request Body:
The request body should be a JSON object with the following fields:
- `firstname` (string, required, minimum length: 3)
- `lastname` (string, optional, minimum length: 3)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

Example:
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response:
Success (200):
If the user is successfully registered, the response will be a JSON object containing the user details.

Example:
```json
{
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4d5a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}
```

Status Codes:
200 OK: User successfully registered.
400 Bad Request: Validation error in the input data.
