import { db } from "../server.js";
import createError from "http-errors";



/* -------------------------------------------------------------------------- */
/*                                Get All Users                               */
/* -------------------------------------------------------------------------- */
export const getAllUsers = (req, res, next) => {
    try {

        if (db.data.users.length === 0) {
            return res.json({ message: "Sorry, there are no registered users at this time! 😞" })
        }
        db.data.users.forEach(user => delete user.password);
        res
            .status(200)
            .json({ message: `You have ${db.data.users.length} registered user(s) 🙌`, users: db.data.users });

    } catch (error) {
        next(error);
    }
}

/* -------------------------------------------------------------------------- */
/*                               Create New User                              */
/* -------------------------------------------------------------------------- */
export const createNewUser = async (req, res, next) => {
    try {
        const newUser = {
            ...req.body,
            id: db.data.users.slice(-1)[0]?.id + 1 || 1,
        };
        //check required fields
        if (!newUser.username || !newUser.password) {
            return next(createError(400, "Required fields are missing! 🚨"));
        }

        //add newUser to array of users in db
        db.data.users.push(newUser);
        await db.write();
        //remove password from newUser for security
        delete newUser.password;
        res.status(200).json({
            message: "Successfully registered! ✅",
            user: newUser,
        });
    } catch (err) {
        next(err);
    }
};


/* -------------------------------------------------------------------------- */
/*                               Retrieve A User by ID                             */
/* -------------------------------------------------------------------------- */
export const getUser = async (req, res, next) => {
    try {
        const userid = parseInt(req.params.uid);

        //check if uid is valid
        if (isNaN(userid)) return next(createError(400, "userid in url is not valid. 🚨"))

        //find user with given uid
        const user = db.data.users.find((u) => u.id === userid);
        if (!user) return next(createError(404, "There is no user with given user id. 🚨"))

        delete user.password;
        res.status(200).json({ message: "User retrieved! ✅", user: user });
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */
/*                        Update User Information by ID                       */
/* -------------------------------------------------------------------------- */
export const updateUser = async (req, res, next) => {
    try {
        const userid = parseInt(req.params.uid);

        //check if uid is valid
        if (isNaN(userid)) return next(createError(400, "userid in url is not valid. 🚨"))

        //find user with given uid
        const userIndex = db.data.users.findIndex((u) => u.id === userid);
        if (userIndex === -1) return next(createError(404, "There is no user with given userid. 🚨"))

        //update user
        db.data.users[userIndex] = { ...db.data.users[userIndex], ...req.body };
        await db.write();
        res.status(200).json({
            message: "Successfully updated! ✅",
            user: db.data.users[userIndex],
        });
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */
/*                              Delete User by ID                             */
/* -------------------------------------------------------------------------- */
export const deleteUser = async (req, res, next) => {
    try {
        const userid = parseInt(req.params.uid);
        //check if uid is valid
        if (isNaN(userid)) return next(createError(400, "userid in url is not valid. 🚨"))

        //find user with given uid
        const userIndex = db.data.users.findIndex((u) => u.id === userid);
        if (userIndex === -1) return next(createError(404, "There is no user with the given user id. 🚨"))

        //delete user from array of users
        const userName = db.data.users[userIndex].username;
        db.data.users.splice(userIndex, 1);
        await db.write();
        res.status(200).json({ message: `User ${userName} has been deleted! ✅` });
    } catch (err) {
        next(err);
    }
};
