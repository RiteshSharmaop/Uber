# Backend API Documentation

## Authentication Endpoints

### Register User
Create a new user account in the system.

**Endpoint:** `POST /api/v1/users/register`

#### Request Body
```json
{
  "fullname": {
    "firstname": "string",  // Required, min 3 characters
    "lastname": "string"    // Optional, min 3 characters
  },
  "email": "string",       // Required, valid email format
  "password": "string"     // Required
}
```

#### Success Response
**Status Code:** 201
```json
{
  "statusCode": 200,
  "data": {
    "createdUser": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "token": "JWT_token_string"
  },
  "message": "User Register Successfully",
  "success": true
}
```

#### Error Responses

1. **Missing Required Fields**
   - Status: `400 Bad Request`
   ```json
   {
     "message": "All fields are Required"
   }
   ```

2. **Invalid Email Format**
   - Status: `400 Bad Request`
   ```json
   {
     "message": "type Correct email"
   }
   ```

3. **Email Already Exists**
   - Status: `409 Conflict`
   ```json
   {
     "message": "User with email and Already Exist"
   }
   ```

4. **Server Error**
   - Status: `500 Internal Server Error`
   ```json
   {
     "message": "Something went wrong while registering the user in db"
   }
   ```

5. **Authentication Failed**
   - Status: `401 Unauthorized`
   ```json
   {
     "message": "Failed to Login User"
   }
   ```

### Implementation Details

- Password is automatically hashed using bcrypt with 10 rounds of salting
- JWT token is generated upon successful registration
- Email addresses are stored in lowercase and trimmed
- Firstname and lastname are trimmed of whitespace
- Email uniqueness is enforced at the database level
- Timestamps are automatically added for user creation and updates

### Data Validation
- Firstname: Minimum 3 characters required
- Lastname: Minimum 3 characters if provided
- Email: Must be valid format and unique in the system
- Password: Required field (stored securely with bcrypt)

### Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Email validation
- Input sanitization
- Unique email enforcement