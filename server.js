import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { userRouter } from './routers/users.router.js';
import { todoRouter } from './routers/todos.router.js'
import { mainErrorHandler, noRouteHandler } from './middlewares/errorHandler.middleware.js';
import { env } from './config/environment.js';

// create server
let app = express();

// lowdb database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();


// initialize database
db.data = db.data || { users: [], todos: [] };

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

// routers
app.use('/users', userRouter);
app.use('/todos', todoRouter);




// error handler undefined routes
app.use(noRouteHandler);
// main error handler
app.use(mainErrorHandler);



// port
const port = env.port;
app.listen(port, console.log(`server is up on port: ${port}. 👻`))