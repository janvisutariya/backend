/**
 * @file Declares USer data type representing the user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

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

export default interface User {
   _id?: mongoose.Schema.Types.ObjectId,
   username: string,
   password: string,
   firstName?: string,
   lastName?: string,
   email: string,
   profilePhoto?: string,
   headerImage?: string,
   biography?: string,
   dateOfBirth?: Date,
   accountType?: AccountType,
   maritalStatus?: MaritalStatus,
   location?: Location,
   salary?: number
};

