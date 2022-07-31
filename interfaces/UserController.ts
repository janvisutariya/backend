import {Request, Response} from "express";

/**
 * @file Declares interface for User Controller.
 */

export default interface UserController {
   findAllUsers(req: Request, res: Response): void;
   findUserById(req: Request, res: Response): void;
   createUser(req: Request, res: Response): void;
   deleteUser(req: Request, res: Response): void;
   updateUser(req: Request, res: Response): void;
   deleteAllUsers (req: Request, res: Response): void;
   deleteUsersByUsername(req: Request, res: Response): void;
   login(req: Request, res: Response): void;
}

