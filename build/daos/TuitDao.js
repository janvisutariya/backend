"use strict";
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
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() {
        /**
          * Retrieves all tuits from the database.
          */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find(); });
        /**
          * Retrieves all tuits from the database for a particular user.
          * @param uid Represents id of the user.
          */
        this.findTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find({ postedBy: uid }); });
        /**
          * Retrieves all tuits from the database for a particular id.
          * @param uid Represents id of the user.
          */
        this.findTuitById = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(uid)
                .populate("postedBy")
                .exec();
        });
        /**
          * Creates a new tuit instance
          * @param uid Represents id of the user.
          * @param tuit Represents the tuit.
          */
        this.createTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
          * Modifies an existing tuit instance
          * @param uid Represents id of the user.
          * @param tuit Represents the tuit.
          */
        this.updateTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: uid }, { $set: tuit });
        });
        /**
          * Removes a tuit instance from the database
          * @param uid Represents id of the user.
          */
        this.deleteTuit = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: uid }); });
        /**
         * Removes tuit from the database. Used for testing
         * @param {string} uid Primary key of the dummy user whose tuit to be removed
         * @returns Promise To be notified when tuit is removed from the database
         */
        this.deleteTuitByUserId = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ postedBy: uid }); });
        /**
         * Update likes
         * @param {string} tid Primary key of the tuit
         * @param {stats} newStats Stats of the tuit
         */
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
        this.updateBookmarks = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
