"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @file Implements mongoose schema for users
*/
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef User Represents a user,
 * @property {id} id Id of the user
 * @property {string} username Username of the user
 * @property {string} password of the user
 * @property {string} firstName First name of the user
 * @property {string} lastName Last name of the user
 * @property {string} email Email id of the user
 * @property {string} profilePhoto Profile picture of the user
 * @property {string} headerImage Header image of the user
 * @property {string} biography Biography of the user
 * @property {Date} dateOfBirth Date of birth of the user
 * @property {AccountType} accountType Type of the account
 * @property {MaritalStatus} maritalStatus Marital status of the user
 * @property {Location} location Location of the user
 * @property {number} salary Salary of the user
 */
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, default: `testusername${Date.now()}` },
    password: { type: String, required: true, default: `testpassword${Date.now()}` },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, default: `testemail${Date.now()}` },
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: { type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"] },
    maritalStatus: { type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"] },
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: { type: Number, default: 50000 }
}, { collection: "users" });
exports.default = UserSchema;
