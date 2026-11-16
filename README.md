# Library Management System

A full-stack Library Management System built with **NestJS, React, Prisma ORM, and PostgreSQL**. The application provides a REST API for managing books and genres, user authentication and role-based authorization, and a React interface for browsing, searching, and viewing book details.

## Features

### Backend
- RESTful API built with NestJS.
- PostgreSQL database managed through Prisma ORM.
- User registration and login.
- Password hashing with bcrypt.
- JWT-based authentication.
- Role-based authorization for patrons and librarians.
- Book and genre management.
- Book search by title and author.
- Filtering books by genre.
- Pagination for book listings.
- Input validation and API request throttling.

### Frontend
- React application built with Vite.
- Responsive library catalog.
- Search books by title or author.
- Filter books by genre.
- Debounced search input.
- Individual book detail pages.
- Loading, error, and empty-result states.
- Client-side routing with React Router.

## Technology Stack

| Technology | Purpose |
|---|---|
| NestJS | Backend application framework |
| TypeScript | Backend programming language |
| React | Frontend user interface |
| Vite | Frontend development and build tooling |
| Prisma ORM | Database modeling and queries |
| PostgreSQL | Relational database |
| JWT | Authentication |
| bcrypt | Password hashing |
| React Router | Frontend navigation |

## Project Structure

The repository is organized into two main applications: `api` and `client`.

```text
library-management-system/
|-- README.md
|-- docs/
|   `-- postman_collection.json
|-- api/
|   |-- prisma/
|   |   |-- migrations/
|   |   |-- schema.prisma
|   |   `-- seed.ts
|   |-- src/
|   |   |-- auth/
|   |   |   |-- dto/
|   |   |   |-- auth.controller.ts
|   |   |   |-- auth.service.ts
|   |   |   |-- jwt-auth.guard.ts
|   |   |   |-- jwt.strategy.ts
|   |   |   |-- roles.decorator.ts
|   |   |   `-- roles.guard.ts
|   |   |-- books/
|   |   |   |-- dto/
|   |   |   |-- books.controller.ts
|   |   |   `-- books.service.ts
|   |   |-- genres/
|   |   |   |-- dto/
|   |   |   |-- genres.controller.ts
|   |   |   `-- genres.service.ts
|   |   |-- prisma/
|   |   |   |-- prisma.module.ts
|   |   |   `-- prisma.service.ts
|   |   |-- app.module.ts
|   |   `-- main.ts
|   |-- .env.example
|   |-- package.json
|   `-- prisma.config.ts
`-- client/
    |-- public/
    `-- src/
        |-- assets/
        |-- components/
        |   |-- BookCard.jsx
        |   |-- BookGrid.jsx
        |   `-- SearchBar.jsx
        |-- pages/
        |   |-- HomePage.jsx
        |   `-- BookDetail.jsx
        |-- App.jsx
        |-- App.css
        |-- index.css
        `-- main.jsx
```

## Database Design

The database uses a relational model with PostgreSQL and Prisma.

The main models are:

- **User:** Stores user information, including email, password hash, and role.
- **Genre:** Stores book genre information.
- **Book:** Stores book information and references its associated genre.

The `Role` enum defines two roles:

- `PATRON`
- `LIBRARIAN`

### Schema Decisions

The `Book` model references the `Genre` model through a `genreId` foreign key rather than embedding genre information directly inside each book record.

This design provides several benefits:

1. **Avoiding duplication:** Genre names are stored once rather than repeated across multiple book records.
2. **Data consistency:** Updating a genre name does not require updating every associated book.
3. **Referential integrity:** The foreign key ensures that a book references an existing genre.
4. **Efficient querying:** Prisma relations allow books and their associated genres to be retrieved together.

This establishes a one-to-many relationship: one genre can have multiple books, while each book references one genre.

### Seed Data

The database seed script is located at:

`api/prisma/seed.ts`

It inserts:
- 4 genres.
- 16 books distributed across the four genres.

The seed script uses upserts to avoid unnecessarily creating duplicate genre records.

## Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- PostgreSQL database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Markle-art/library-management-system.git
cd library-management-system
```

## Backend Setup

### 2. Install backend dependencies

```bash
cd api
npm install
```

### 3. Configure environment variables

Create an `.env` file inside `api` using `.env.example` as a template.

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key"
```

Use your own PostgreSQL connection string and a secure JWT secret. Do not commit the actual `.env` file.

### 4. Apply database migrations

```bash
npx prisma migrate dev
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Seed the database

```bash
npx prisma db seed
```

The seed configuration is defined in `prisma.config.ts` at the root of the `api` directory.

### 7. Start the backend

```bash
npm run start:dev
```

The NestJS server listens on:

`http://localhost:3000`

## Frontend Setup

Open a separate terminal from the repository root.

### 8. Install frontend dependencies

```bash
cd client
npm install
```

### 9. Configure the frontend environment

Create a `.env` file inside `client` using `.env.example`.

```env
VITE_API_URL=http://localhost:3000
```

The frontend uses this variable to communicate with the NestJS API.

Do not commit the actual `.env` file.

### 10. Start the React application

```bash
npm run dev
```

Vite displays the local development URL in the terminal.

### 11. Build for production

```bash
npm run build
```

## API Overview

The backend exposes REST endpoints for authentication, books, and genres.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Authenticate a user |

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve books |
| GET | `/books/:id` | Retrieve a specific book |
| POST | `/books` | Create a book |
| PATCH | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

Book listings support search, genre filtering, and pagination.

Example:

```http
GET /books?search=python&genreId=1&page=1&limit=10
```

The listing endpoint returns book data together with pagination metadata.

### Genres

| Method | Endpoint | Description |
|---|---|---|
| GET | `/genres` | Retrieve genres |
| GET | `/genres/:id` | Retrieve a specific genre |
| POST | `/genres` | Create a genre |
| PATCH | `/genres/:id` | Update a genre |
| DELETE | `/genres/:id` | Delete a genre |

Book creation, updates, and deletion are restricted to librarian accounts. The GenresController does not apply a role guard directly to genre write endpoints. Login requests are rate-limited to 5 attempts per minute.

### API Testing

A Postman collection is available at:

`docs/postman_collection.json`

Import the collection into Postman to test the API endpoints.

## Frontend Routes

The React application uses React Router.

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage.jsx` | Displays the library catalog |
| `/books/:id` | `BookDetail.jsx` | Displays individual book details |

The catalog retrieves books and genres from the NestJS API. Search requests are debounced to reduce unnecessary API calls, and genre selection filters the displayed books.

## Testing and Validation

The project includes backend validation and testing workflows.

Backend:

```bash
cd api
npm test
npm run build
```

Frontend:

```bash
cd client
npm run build
```

The frontend production build has been verified successfully with Vite.

## Prisma and Relational Database Modeling

Prisma with PostgreSQL uses a relational data model. Related information is stored in separate tables and connected through primary keys and foreign keys.

For example, books reference genres through `genreId`. This supports referential integrity and reduces duplicated data.

A document database such as MongoDB can instead embed related information inside documents. This can be useful when related data is usually retrieved together, but it may introduce duplication when the same information is shared across many documents.

For this library system, PostgreSQL is suitable because users, books, and genres have clear relationships.

## Future Improvements

Potential extensions include:

- Book borrowing and return tracking.
- Reservation management.
- Book reviews and ratings.
- Advanced catalog filtering.
- Librarian dashboard.
- Improved frontend authentication and account management.

## License

This project is intended for educational purposes.
