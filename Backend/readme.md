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