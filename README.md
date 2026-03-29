# Library System API

A simple school library management API built with Node.js, Express, and MongoDB.

## Features

- Manage authors, books, students, and attendants
- CRUD operations for authors and books
- Borrow and return books
- MongoDB data persistence via Mongoose

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add your MongoDB URI:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

4. The API runs on `http://localhost:5000` by default.

## API Endpoints

### Authors

- `POST /api/authors`
  - Create a new author
  - Body example:
    ```json
    {
      "name": "Jane Doe",
      "bio": "Author biography"
    }
    ```

- `GET /api/authors`
  - Get all authors

- `GET /api/authors/:id`
  - Get a single author by ID

- `PUT /api/authors/:id`
  - Update an author

- `DELETE /api/authors/:id`
  - Delete an author

### Books

- `POST /api/books`
  - Create a new book
  - Body example:
    ```json
    {
      "title": "Learning Node",
      "isbn": "123-4567890123",
      "authors": ["<authorId>"]
    }
    ```

- `GET /api/books`
  - Get all books

- `GET /api/books/:id`
  - Get book details by ID

- `PUT /api/books/:id`
  - Update a book

- `DELETE /api/books/:id`
  - Delete a book

- `POST /api/books/:id/borrow`
  - Borrow a book
  - Body example:
    ```json
    {
      "studentId": "<studentId>",
      "attendantId": "<attendantId>",
      "returnDate": "2026-04-15"
    }
    ```

- `POST /api/books/:id/return`
  - Return a borrowed book

### Students

- `POST /api/students`
  - Create a student
  - Body example:
    ```json
    {
      "name": "John Smith",
      "email": "john@example.com",
      "studentId": "S12345"
    }
    ```

- `GET /api/students`
  - Get all students

- `GET /api/students/:id`
  - Get a single student by ID

### Attendants

- `POST /api/attendants`
  - Create an attendant
  - Body example:
    ```json
    {
      "name": "Mary Admin",
      "staffId": "A1001"
    }
    ```

- `GET /api/attendants`
  - Get all attendants

## Models Overview

- `Author`: `name`, `bio`
- `Book`: `title`, `isbn`, `authors`, `status`, `borrowedBy`, `issuedBy`, `returnDate`
- `Student`: `name`, `email`, `studentId`
- `Attendant`: `name`, `staffId`

## Notes

- The app uses `process.env.MONGO_URI` to connect to MongoDB.
- Books default to status `IN` and switch to `OUT` when borrowed.

## Run

```bash
npm start
```

or for development with live reload:

```bash
npm run dev
```
