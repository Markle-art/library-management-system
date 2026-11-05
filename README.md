# Library Management System

A backend library management system built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.

## Technologies

- **NestJS** – Backend application framework.
- **Prisma ORM** – Database modeling, migrations, and queries.
- **PostgreSQL** – Relational database.
- **TypeScript** – Application programming language.

## Project Structure

```text
library-management-system/
├── README.md
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── prisma/
    │   │   ├── prisma.module.ts
    │   │   └── prisma.service.ts
    │   ├── app.module.ts
    │   ├── app.controller.ts
    │   └── app.service.ts
    ├── .env.example
    └── package.json
```

## Database Schema

The database currently contains three main models:

- **User:** Stores user information, including email and role.
- **Genre:** Stores book genres.
- **Book:** Stores book details and references its genre.

The `Role` enum defines two user roles:

- `PATRON`
- `LIBRARIAN`

## Schema Decisions

The `Book` model references the `Genre` model through a `genreId` foreign key rather than embedding genre information directly inside each book record.

This relational design was chosen for several reasons:

1. **Avoiding duplication:** Genre names are stored once instead of being repeated across multiple books.
2. **Data consistency:** Updating a genre name does not require updating every associated book.
3. **Referential integrity:** The foreign key ensures that each book references an existing genre.
4. **Efficient querying:** Prisma relations allow books and their associated genres to be retrieved together.

This approach makes the database easier to maintain and supports a one-to-many relationship: one genre can have multiple books.

## Database Setup

### 1. Install dependencies

```bash
cd api
npm install
```

### 2. Configure environment variables

Create a `.env` file inside the `api` directory using `.env.example` as a template.

Add your PostgreSQL connection string:

```env
DATABASE_URL="your-postgresql-connection-string"
```

Do not commit your actual `.env` file or database credentials.

### 3. Apply database migrations

```bash
npx prisma migrate dev
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Seed the database

```bash
npx prisma db seed
```

The seed script inserts four genres and sixteen books distributed across those genres.

## Running the Application

Start the NestJS development server:

```bash
npm run start:dev
```

Build the application:

```bash
npm run build
```

## Prisma vs. Document Database Modeling

Prisma with PostgreSQL uses a relational data model. Related information is stored in separate tables and connected through primary keys and foreign keys.

For example, books reference genres through `genreId`. This supports referential integrity and reduces duplicated data.

A document database such as MongoDB can instead embed related information inside documents. This can be useful when related data is usually retrieved together, but it may introduce duplication when the same information is shared across many documents.

For this library system, PostgreSQL is suitable because users, books, genres, and potential reviews have clear relationships.

## Future Improvements

Possible extensions include:

- Book reviews and ratings.
- Book borrowing and return tracking.
- Search and filtering.
- Librarian management features.
- Authentication and role-based access control.

## License

This project is intended for educational purposes.