"use strict";
/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
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
const DislikeModel_1 = __importDefault(require("../mongoose/DislikeModel"));
/**
  * @class DislikeDao Implements Data Access Object managing data storage
  * of Dislikes
  * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
  */
class DislikeDao {
    constructor() {
        /**
         * Retrieves all users that disliked a tuit from the database
         * @param tid Represents id of the tuit
         */
        this.findAllUsersThatDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default
                .find({ tuit: tid })
                .populate("dislikedBy")
                .exec();
        });
        /**
          * Retrieves all tuits disliked by a user from the database
          * @param uid Represents id of the user
          */
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default
                .find({ dislikedBy: uid })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
          * Create a dislike instance
          * @param uid Represents id of the user
          * @param tid Represents id of the tuit
          */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.create({ tuit: tid, dislikedBy: uid }); });
        /**
          * Removes a dislike instance
          * @param uid Represents id of the user
          * @param tid Represents id of the tuit
          */
        this.userRemoveDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.deleteOne({ tuit: tid, dislikedBy: uid }); });
        /**
          * If a user has disliked a particular tuit
          * @param uid Represents id of the user
          * @param tid Represents id of the tuit
          */
        this.findUserDislikedTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.findOne({ tuit: tid, dislikedBy: uid }); });
        /**
          * Counts how many users disliked a particular tuit.
          * @param tid Represents id of the tuit
          */
        this.countHowManyDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.count({ tuit: tid }); });
    }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao === null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
