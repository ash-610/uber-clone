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
# Register Captain Endpoint
Register a new captain in the system.

- **URL:** `/captains/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "firstname": "string",     // Required, min length: 3
    "lastname": "string",      // Optional, min length: 3
    "email": "string",        // Required, valid email format
    "password": "string",     // Required, min length: 6
    "color": "string",        // Required, min length: 3
    "plateNumber": "string",  // Required, min length: 3
    "capacity": "number",     // Required, min: 1
    "vehicleType": "string"   // Required, enum: ["car", "motorcycle", "auto"]
  }
  ```

- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "message": "Captain registered successfully"
    }
    ```

- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** 
      ```json
      {
        "error": "Captain already exists"
      }
      ```
    - OR
      ```json
      {
        "error": "All fields Required"
      }
      ```
    - OR
      ```json
      {
        "errors": [
          {
            "msg": "Atleast 3 characters required",
            "param": "firstname"
          },
          // ... other validation errors
        ]
      }
      ```

- **Sample Call:**
  ```javascript
  fetch('/captains/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      color: "Black",
      plateNumber: "ABC-123",
      capacity: 4,
      vehicleType: "car"
    })
  })
  ```

  # Login Captain Endpoint
  Authenticate and log in an existing captain.

  - **URL:** `/captains/login`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "email": "string",    // Required, valid email format
      "password": "string"  // Required, min length: 6
    }
    ```

  - **Success Response:**
    - **Code:** 200
    - **Content:**
      ```json
      {
        "token": "jwt_token_string",
        "captain": {
          "_id": "captain_id",
          "fullname": {
            "firstname": "string",
            "lastname": "string"
          },
          "email": "string",
          "vehicle": {
            "color": "string",
            "plateNumber": "string",
            "capacity": "number",
            "vehicleType": "string"
          }
        }
      }
      ```

  - **Error Responses:**
    - **Code:** 400 BAD REQUEST
      - **Content:**
        ```json
        {
          "error": "Captain does not exist"
        }
        ```
      - OR
        ```json
        {
          "error": "Invalid password"
        }
        ```

  # Get Captain Profile Endpoint
  Retrieve the authenticated captain's profile information.

  - **URL:** `/captains/profile`
  - **Method:** `GET`
  - **Headers:**
    - `Authorization`: Bearer token

  - **Success Response:**
    - **Code:** 200
    - **Content:** Captain profile object

  - **Error Response:**
    - **Code:** 401 UNAUTHORIZED
      - **Content:**
        ```json
        {
          "message": "Unauthorized"
        }
        ```

  # Logout Captain Endpoint
  Log out the currently authenticated captain.

  - **URL:** `/captains/logout`
  - **Method:** `GET`
  - **Headers:**
    - `Authorization`: Bearer token

  - **Success Response:**
    - **Code:** 200
    - **Content:**
      ```json
      {
        "message": "Logged out successfully"
      }
      ```

  - **Error Response:**
    - **Code:** 401 UNAUTHORIZED
      - **Content:**
        ```json
        {
          "message": "Unauthorized"
        }
        ```