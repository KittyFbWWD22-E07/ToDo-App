# Todo app : Error Handling / Routing

In this exercise, you will create some routes for users and todos in an Express app. Each todo will be defined by an id, title, description, date, and authorid. Each user will be defined by id,fullname, username, password, email.

## Part 1: Setting up the App

1. Create a new Express app using `npm install`.
2. Create required files for `Controllers, Routers, Middlewares`
3. Set up a `lowdb` database. with initial value {users:[], todos:[]}

## Part 2: Creating Routes for Users

1. Create a `GET` route that retrieves all users.
2. Create a `POST` route that creates a new user.
3. Create a `GET` route that retrieves a single user by ID.
4. Create a `PUT` route that updates a user's information by ID.
5. Create a `DELETE` route that deletes a user by ID.

## Part 3: Creating Routes for Todos

1. Create a `GET` route that retrieves all todos.
2. Create a `POST` route that creates a new todo.
3. Create a `GET` route that retrieves a single todo by ID.
4. Create a `PUT` route that updates a todo's information by ID.
5. Create a `DELETE` route that deletes a todo by ID.

## Part 4: Error Handling

1. Add error handling middleware to handle invalid requests and errors in the app.
2. Test your routes using ThunderClient and make sure error handling is working as expected.
3. Add validation for input fields such as title and description, fullname, username and password. make sure to handle the error response for them.
4. To catch errors and send them to a generic error handler, you can use try...catch blocks and createErrors within controllers.
