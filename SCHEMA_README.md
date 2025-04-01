# Anatomy Explorer Database Schema Documentation

This document outlines the database schema for the Anatomy Explorer application, managed using Prisma.

**Author:** Gilles Momeni
**Contact:** gillemomeni@gmail.com

**Schema File:** `prisma/schema.prisma`
**Database Type:** PostgreSQL (as configured in `schema.prisma`)

## Overview
The database stores information related to users, comments, and potentially other application data like muscle details, videos, and subscriptions (although these models are not currently defined in `schema.prisma`).

## Models

---

### `Comment`
Stores user-submitted comments, likely associated with videos or muscle pages.

| Field       | Type     | Attributes        | Description                                     |
| :---------- | :------- | :---------------- | :---------------------------------------------- |
| `id`        | `Int`    | `@id @default(autoincrement())` | Unique identifier for the comment.              |
| `createdAt` | `DateTime` | `@default(now())` | Timestamp when the comment was created.         |
| `updatedAt` | `DateTime` | `@updatedAt`      | Timestamp when the comment was last updated.    |
| `content`   | `String` |                   | The text content of the comment.                |
| `authorId`  | `Int`    |                   | ID of the user who wrote the comment (relation missing). |
| `postId`    | `Int?`   |                   | ID of the associated post/video/muscle (relation missing). |
| `approved`  | `Boolean`| `@default(false)` | Moderation status (whether the comment is visible). |

**Relations:**
- **Missing:** Relation to a `User` model via `authorId`.
- **Missing:** Relation to a `Post`/`Video`/`Muscle` model via `postId`.

---

### **Placeholder Models (Not Defined in `schema.prisma`)**

The following models are expected based on application features but are **not currently defined** in `prisma/schema.prisma`. Their structure needs to be added to the schema file.

#### `User` (Expected)
Stores user account information.

| Field (Expected) | Type (Expected) | Attributes (Expected) | Description (Expected)                     |
| :--------------- | :-------------- | :-------------------- | :----------------------------------------- |
| `id`             | `Int` / `String`| `@id ...`             | Unique user identifier.                    |
| `name`           | `String?`       |                       | User's full name.                          |
| `email`          | `String`        | `@unique`             | User's unique email address.               |
| `password`       | `String`        |                       | Hashed password.                           |
| `role`           | `String` / `Enum`| `@default('user')`  | User role (e.g., 'user', 'admin').         |
| `status`         | `String` / `Enum`| `@default('active')`| User account status (e.g., 'active', 'inactive'). |
| `subscriptionId` | `Int?`          |                       | Foreign key for the user's subscription.   |
| `createdAt`      | `DateTime`      | `@default(now())`     | Timestamp of account creation.             |
| `updatedAt`      | `DateTime`      | `@updatedAt`          | Timestamp of last account update.          |
| `lastLogin`      | `DateTime?`     |                       | Timestamp of the user's last login.        |
| `comments`       | `Comment[]`     |                       | Relation to comments made by the user.     |
| `subscription`   | `Subscription?` | `@relation(...)`      | Relation to the user's subscription plan.  |
| *(Other fields like emailVerified, image, etc. might be needed)* |

#### `Subscription` (Expected)
Stores details about subscription plans and user subscriptions.

| Field (Expected) | Type (Expected) | Attributes (Expected) | Description (Expected)                     |
| :--------------- | :-------------- | :-------------------- | :----------------------------------------- |
| `id`             | `Int`           | `@id ...`             | Unique subscription identifier.            |
| `userId`         | `Int` / `String`| `@unique`             | ID of the user this subscription belongs to. |
| `plan`           | `String` / `Enum`|                       | Subscription plan type (e.g., 'basic', 'premium'). |
| `status`         | `String` / `Enum`|                       | Subscription status (e.g., 'active', 'canceled'). |
| `startDate`      | `DateTime`      |                       | Date the subscription started.             |
| `endDate`        | `DateTime?`     |                       | Date the subscription ends/renews.         |
| `trialEndsAt`    | `DateTime?`     |                       | Date the trial period ends (if applicable).|
| `user`           | `User`          | `@relation(...)`      | Relation back to the User model.           |
| *(Other fields like payment details ID, etc.)* |

#### `Muscle` (Expected)
Stores detailed information about muscles. *(Currently seems hardcoded in `lib/muscle-data.ts`)*

| Field (Expected) | Type (Expected) | Attributes (Expected) | Description (Expected)                     |
| :--------------- | :-------------- | :-------------------- | :----------------------------------------- |
| `id`             | `String` / `Int`| `@id ...`             | Unique muscle identifier.                  |
| `name`           | `String`        |                       | Name of the muscle.                        |
| `shortDescription`| `String?`       |                       | A brief description.                       |
| `description`    | `String?`       |                       | Detailed description.                      |
| `origin`         | `String?`       |                       | Muscle origin point(s).                    |
| `insertion`      | `String?`       |                       | Muscle insertion point(s).                 |
| `functions`      | `String[]`      |                       | List of primary functions.                 |
| `conditions`     | `Json?` / `String[]` |                  | Common related conditions (structured or text). |
| `image`          | `String?`       |                       | URL or path to a representative image.     |
| `videos`         | `Video[]`       |                       | Relation to associated videos.             |
| *(Other fields like innervation, blood supply, etc.)* |

#### `Video` (Expected)
Stores information about videos related to muscles.

| Field (Expected) | Type (Expected) | Attributes (Expected) | Description (Expected)                     |
| :--------------- | :-------------- | :-------------------- | :----------------------------------------- |
| `id`             | `Int`           | `@id ...`             | Unique video identifier.                   |
| `title`          | `String`        |                       | Title of the video.                        |
| `url`            | `String`        |                       | URL of the video (e.g., YouTube link).     |
| `description`    | `String?`       |                       | Optional description.                      |
| `muscleId`       | `String?` / `Int?`|                     | ID of the muscle this video relates to.    |
| `muscle`         | `Muscle?`       | `@relation(...)`      | Relation to the Muscle model.              |
| `createdAt`      | `DateTime`      | `@default(now())`     | Timestamp when the video was added.        |

---

## Notes
- The current schema in `prisma/schema.prisma` is minimal and only includes the `Comment` model.
- Relations between `Comment` and other models (like `User`, `Post`/`Video`/`Muscle`) are missing and need to be defined.
- Models for `User`, `Subscription`, `Muscle`, and `Video` need to be added to the schema to fully represent the application's data requirements based on its features.
- Consider using Enums for fields like `role`, `status`, and `plan` for better type safety and consistency.
