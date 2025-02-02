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

# User Login Endpoint

## Endpoint: 
`/users/login`

### Method: 
`POST`

### Description:
This endpoint authenticates existing users. It validates the login credentials and returns a JWT token upon successful authentication.

### Request Body:
The request body should be a JSON object with the following fields:
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 6)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
Response:
Success (200):
If login is successful, returns user details and authentication token.

Example:
```json
{
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4d5a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Error Cases (400):
Invalid Email:
```json
{
  "message": "Invalid email"
}
```
Wrong Password:
```json
{
  "message": "Wrong Password"
}
```

# User Profile Endpoint

## Endpoint: 
`/users/profile`

### Method: 
`GET`

### Description:
This endpoint retrieves the profile of the authenticated user.

### Headers:
- `Authorization` (string, required, Bearer token)

### Response:
Success (200):
If the user is authenticated, returns the user profile details.

Example:
```json
{
  "_id": "60c72b2f9b1e8b001c8e4d5a",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

Error Cases (401):
Unauthorized:
```json
{
  "message": "Unauthorized"
}
```

# User Logout Endpoint

## Endpoint: 
`/users/logout`

### Method: 
`GET`

### Description:
This endpoint logs out the authenticated user by clearing the authentication token and blacklisting it.

### Headers:
- `Authorization` (string, required, Bearer token)

### Response:
Success (200):
If the user is successfully logged out, returns a success message.

Example:
```json
{
  "message": "Logged Out Successfully"
}
```

Error Cases (401):
Unauthorized:
```json
{
  "message": "Unauthorized"
}
```
