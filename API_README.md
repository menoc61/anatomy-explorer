# Anatomy Explorer API Documentation

This document details the API endpoints available in the Anatomy Explorer application.

**Author:** Gilles Momeni
**Contact:** gillemomeni@gmail.com

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Authentication API](#authentication-api)
  - [Muscles API](#muscles-api)
  - [Users API](#users-api)
  - [Videos API](#videos-api)
  - [Comments API](#comments-api)
  - [Predictions API](#predictions-api)
  - [Contact API](#contact-api)
  - [Backup API](#backup-api)
- [Error Handling](#error-handling)

## Base URL
The base URL for all API endpoints depends on the deployment environment:
- **Development:** `http://localhost:3000/api`
- **Production:** `[Your Production URL]/api`

## Authentication
Most endpoints likely require authentication. Authentication is handled via [Specify Method - e.g., NextAuth.js session tokens/JWT in Authorization header].

- Unauthenticated requests to protected routes will typically receive a `401 Unauthorized` or `403 Forbidden` response.
- Refer to `lib/auth.ts` and `app/api/auth/` for specific implementation details.

*(Note: Specific authentication requirements for each endpoint should be verified by checking the route implementation.)*

## Endpoints

---

### Authentication API
Base Path: `/api/auth`

*(Endpoints managed by NextAuth.js or custom implementation)*

- **POST /api/auth/signin**: Handles user sign-in.
- **POST /api/auth/signout**: Handles user sign-out.
- **POST /api/auth/callback/[provider]**: OAuth callback endpoints.
- **GET /api/auth/session**: Retrieves the current user session.
- **POST /api/auth/register**: (If custom) Handles user registration.
- **POST /api/auth/forgot-password**: (If custom) Initiates password reset.
- **POST /api/auth/reset-password**: (If custom) Completes password reset.

*(Refer to NextAuth.js documentation or `app/api/auth/` for exact details)*

---

### Muscles API
Base Path: `/api/muscles`

- **GET /api/muscles**
  - **Description:** Retrieves a list of all muscles or muscle groups.
  - **Parameters:** (Optional query params for filtering, pagination, sorting)
  - **Response:** `200 OK` - Array of muscle objects.
    ```json
    [
      { "id": "...", "name": "...", "shortDescription": "..." },
      // ...
    ]
    ```

- **GET /api/muscles/[id]**
  - **Description:** Retrieves detailed information for a specific muscle.
  - **Parameters:** `id` (URL path parameter) - The ID of the muscle.
  - **Response:** `200 OK` - Muscle object.
    ```json
    {
      "id": "...",
      "name": "...",
      "description": "...",
      "origin": "...",
      "insertion": "...",
      "functions": ["...", "..."],
      "conditions": [{ "name": "...", "description": "..." }],
      "videos": ["...", "..."],
      "image": "..." 
      // ... other fields
    }
    ```
  - **Errors:** `404 Not Found` - If muscle with the given ID doesn't exist.

- **POST /api/muscles** (Admin)
  - **Description:** Creates a new muscle entry.
  - **Authentication:** Required (Admin role).
  - **Request Body:** Muscle data object.
  - **Response:** `201 Created` - The newly created muscle object.
  - **Errors:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`.

- **PUT /api/muscles/[id]** (Admin)
  - **Description:** Updates an existing muscle entry.
  - **Authentication:** Required (Admin role).
  - **Parameters:** `id` (URL path parameter).
  - **Request Body:** Updated muscle data fields.
  - **Response:** `200 OK` - The updated muscle object.
  - **Errors:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.

- **DELETE /api/muscles/[id]** (Admin)
  - **Description:** Deletes a muscle entry.
  - **Authentication:** Required (Admin role).
  - **Parameters:** `id` (URL path parameter).
  - **Response:** `204 No Content`.
  - **Errors:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.

---

### Users API
Base Path: `/api/users`

- **GET /api/users** (Admin)
  - **Description:** Retrieves a list of users.
  - **Authentication:** Required (Admin role).
  - **Parameters:** (Optional query params for filtering, pagination, sorting by role, status, etc.)
  - **Response:** `200 OK` - Array of user objects (sensitive data like passwords should be omitted).
    ```json
    [
      { "id": "...", "name": "...", "email": "...", "role": "...", "status": "...", "subscription": "...", "lastLogin": "...", "createdAt": "..." },
      // ...
    ]
    ```
  - **Errors:** `401 Unauthorized`, `403 Forbidden`.

- **GET /api/users/[id]** (Admin)
  - **Description:** Retrieves details for a specific user.
  - **Authentication:** Required (Admin role).
  - **Parameters:** `id` (URL path parameter).
  - **Response:** `200 OK` - User object.
  - **Errors:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.

- **POST /api/users** (Admin)
  - **Description:** Creates a new user.
  - **Authentication:** Required (Admin role).
  - **Request Body:** User data (name, email, password/invite flag, role, status).
  - **Response:** `201 Created` - The newly created user object.
  - **Errors:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`.

- **PUT /api/users/[id]** (Admin)
  - **Description:** Updates an existing user's details (e.g., role, status).
  - **Authentication:** Required (Admin role).
  - **Parameters:** `id` (URL path parameter).
  - **Request Body:** Fields to update.
  - **Response:** `200 OK` - The updated user object.
  - **Errors:** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.

- **DELETE /api/users/[id]** (Admin)
  - **Description:** Deletes a user.
  - **Authentication:** Required (Admin role).
  - **Parameters:** `id` (URL path parameter).
  - **Response:** `204 No Content`.
  - **Errors:** `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.

---

### Videos API
Base Path: `/api/videos`

*(Similar CRUD structure as Muscles/Users, likely admin-only)*

- **GET /api/videos**: List videos (potentially filter by muscle).
- **GET /api/videos/[id]**: Get specific video details.
- **POST /api/videos**: Add a new video (link, title, associated muscle).
- **PUT /api/videos/[id]**: Update video details.
- **DELETE /api/videos/[id]**: Delete a video.

---

### Comments API
Base Path: `/api/comments`

*(Likely requires user authentication)*

- **GET /api/comments**: List comments (filter by video ID or muscle ID).
- **POST /api/comments**: Add a new comment.
- **PUT /api/comments/[id]**: Edit own comment (or admin edit).
- **DELETE /api/comments/[id]**: Delete own comment (or admin delete).

---

### Predictions API
Base Path: `/api/predictions`

*(Functionality unclear from name - needs investigation)*

- **GET /api/predictions**: List predictions.
- **POST /api/predictions**: Create a prediction.
- *(Other potential endpoints based on functionality)*

---

### Contact API
Base Path: `/api/contact`

- **POST /api/contact**
  - **Description:** Handles submission of the contact form.
  - **Authentication:** May not require authentication.
  - **Request Body:** Contact form data (name, email, message).
  - **Response:** `200 OK` or `202 Accepted`.
  - **Errors:** `400 Bad Request`.

---

### Backup API
Base Path: `/api/backup`

*(Likely admin-only)*

- **POST /api/backup/create**: Initiates a database backup process.
- **GET /api/backup/status**: Checks the status of a backup.
- **GET /api/backup/download/[backupId]**: Downloads a specific backup file.

---

## Error Handling
Standard HTTP status codes are used:
- `200 OK`: Request successful.
- `201 Created`: Resource created successfully.
- `204 No Content`: Request successful, no content to return (e.g., after DELETE).
- `400 Bad Request`: Invalid request syntax or parameters.
- `401 Unauthorized`: Authentication required or failed.
- `403 Forbidden`: Authenticated user lacks permission.
- `404 Not Found`: Requested resource does not exist.
- `500 Internal Server Error`: Server-side error occurred.

Error responses typically include a JSON body:
```json
{
  "error": "Descriptive error message" 
}
