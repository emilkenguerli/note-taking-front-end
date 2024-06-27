# Note-Taking Application Frontend

This is the frontend part of a note-taking application. It allows users to create, view, edit, and delete notes. Users can also manage categories and register/login to the application.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm (Node Package Manager).
- You have a running instance of the backend API for the application.

## Getting Started

### Clone the Repository

`git clone https://github.com/emilkenguerli/note-taking-front-end.git`

### Create an .env file

Use the `.env.example` file as reference.

### Ensure the backend server is running on the correct port

Follow the README on `https://github.com/emilkenguerli/note-taking-api`

## Available Scripts

In the project directory, you can run:


### `npm install`

To install and get necessary packages.

### `npm start`

Starts the development server.

## Features

- User Registration and Login using Username or Email
- Create, View, Edit, and Delete Notes on a list
- Manage Categories List and Edit, Update, or Delete (cannot delete category if a note is assigned to it)
- Search Notes using a combination of regex and fuzzy search
- Filter Notes by Creation Date, Update Date, Category, User (defaults to the current user)
- Sort Notes by Creation Date, Update Date, Category, Title
- Filter out all users that didn't have notes if Select All users is selected
- Responsive Design

## Technologies Used

- React
- Redux
- React Router
- Axios
- React Toastify
