/**
 * @file Implements DAO managing data storage of users. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */

export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    
    private constructor() {}

    /**
      * Retrieves all users from the database.
      */

    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();

    /**
      * Retrieves the user by their primary key.
      * @param uid Represents user's ID.
      */

    findUserById = async (uid: string): Promise<any> =>
        UserModel.findById(uid);

    /**
      * Creates a new user instance.
      * @param user Represents the user to be created.
      */

    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);

    /**
      * Modifies an existing user instance.
      * @param uid Represents user's ID.
      * @param user Represents the user to be updated.
      */

    updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: uid},
            {$set: user});

    /**
      * Modifies an existing user's salary instance by username.
      * @param username Represents the username of the user.
      * @param salary Represents the salary of the user.
      */
    
    updateUserSalaryByUsername = async (username: string, salary: number): Promise<any> =>
        UserModel.updateOne(
            {username},
            {$set: {salary: salary}});

    /**
      * Removes one user instances from the database. 
      * @param uid Represents user's ID.
      */

    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});

    /**
      * Removes all user instances from the database.
      */

    deleteAllUsers = async (): Promise<any> =>
        UserModel.deleteMany({});

    /**
      * Removes one user instances with specific username from the database. 
      * @param username Represents user's username.
      */

     deleteUsersByUsername = async (username: string): Promise<any> =>
        UserModel.deleteOne({username});

    /**
      * Retrieves the user by their credentials.
      * @param username Represents the username of the user.
      * @param password Represents the password of the user.
      */
    
    findUserByCredentials = async (username: string, password: string): Promise<any> =>
        UserModel.findOne({username: username, password: password});

    /**
      * Retrieves the user by their username.
      * @param username Represents the username of the user.
      */
    
    findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username});
};

