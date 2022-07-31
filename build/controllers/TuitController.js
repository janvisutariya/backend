"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const TuitDao_1 = __importDefault(require("../daos/TuitDao"));

class TuitController {
    constructor() {
      
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits()
            .then((tuits) => res.json(tuits));
      
        this.findTuitsByUser = (req, res) => {
            // @ts-ignore
            let userId = req.params.uid === 'my' && req.session['profile'] ?
                // @ts-ignore
                req.session['profile']._id : req.params.uid;
            TuitController.tuitDao.findTuitsByUser(userId)
                .then((tuits) => res.json(tuits));
        };
        /**
         * Retrieves all tuits from the database for a particular id and returns
         * an array of tuits.
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the user ID
         */
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit) => res.json(tuit));
        /**
         * Creates a new tuit instance
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        this.createTuit = (req, res) => {
            // @ts-ignore
            let userId = req.params.uid === 'my' && req.session['profile'] ?
                // @ts-ignore
                req.session['profile']._id : req.params.uid;
            console.log(userId);
            TuitController.tuitDao.createTuit(userId, req.body)
                .then((tuit) => res.json(tuit));
        };
        /**
         * Modifies an existing tuit instance
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
        /**
         * Removes a tuit instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));
        /**
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the dummy user's tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a tuit was successful or not
         */
        this.deleteTuitByUserId = (req, res) => TuitController.tuitDao.deleteTuitByUserId(req.params.uid)
            .then((status) => res.send(status));
    }
}
exports.default = TuitController;
TuitController.tuitDao = TuitDao_1.default.getInstance();
TuitController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get("/api/tuits", TuitController.tuitController.findAllTuits);
        app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
        app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
        app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
        app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
        app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
        app.get("/api/tuits/:uid/delete", TuitController.tuitController.deleteTuitByUserId);
    }
    return TuitController.tuitController;
};
;
