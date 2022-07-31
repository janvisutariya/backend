"use strict";
/**
 * @file Implements DAO managing data storage of users. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
class UserDao {
    constructor() {
        /**
          * Retrieves all users from the database.
          */
        this.findAllUsers = () => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.find().exec(); });
        /**
          * Retrieves the user by their primary key.
          * @param uid Represents user's ID.
          */
        this.findUserById = (uid) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.findById(uid); });
        /**
          * Creates a new user instance.
          * @param user Represents the user to be created.
          */
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.create(user); });
        /**
          * Modifies an existing user instance.
          * @param uid Represents user's ID.
          * @param user Represents the user to be updated.
          */
        this.updateUser = (uid, user) => __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
        /**
          * Modifies an existing user's salary instance by username.
          * @param username Represents the username of the user.
          * @param salary Represents the salary of the user.
          */
        this.updateUserSalaryByUsername = (username, salary) => __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.default.updateOne({ username }, { $set: { salary: salary } });
        });
        /**
          * Removes one user instances from the database.
          * @param uid Represents user's ID.
          */
        this.deleteUser = (uid) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteOne({ _id: uid }); });
        /**
          * Removes all user instances from the database.
          */
        this.deleteAllUsers = () => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteMany({}); });
        /**
          * Removes one user instances with specific username from the database.
          * @param username Represents user's username.
          */
        this.deleteUsersByUsername = (username) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.deleteOne({ username }); });
        /**
          * Retrieves the user by their credentials.
          * @param username Represents the username of the user.
          * @param password Represents the password of the user.
          */
        this.findUserByCredentials = (username, password) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.findOne({ username: username, password: password }); });
        /**
          * Retrieves the user by their username.
          * @param username Represents the username of the user.
          */
        this.findUserByUsername = (username) => __awaiter(this, void 0, void 0, function* () { return UserModel_1.default.findOne({ username }); });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
;
