"use strict";
/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>dislikes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const DislikeController_1 = __importDefault(require("./controllers/DislikeController"));
//import BookmarkController from "./controllers/BookmarkController";
//import FollowController from './controllers/FollowController';
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
//import SessionController from './controllers/SessionController';
const mongoose_1 = __importDefault(require("mongoose"));
var cors = require('cors');
const session = require("express-session");
// build the connection string
//const connectionString = `mongodb+srv://Foram44:Kavathiya4444@cluster0.5hopv.mongodb.net/A1?retryWrites=true&w=majority`;
const connectionString = `mongodb+srv://Janvi:123janvi@mycluster.unrtvqj.mongodb.net/TuiterDatabase?retryWrites=true&w=majority`;
// connect to the database
mongoose_1.default.connect(connectionString);
const app = (0, express_1.default)();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
const SECRET = 'process.env.SECRET';
let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    }
};
if (process.env.ENVIRONMENT === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));
app.use(express_1.default.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
// create RESTful Web service API
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const likesController = LikeController_1.default.getInstance(app);
const dislikesController = DislikeController_1.default.getInstance(app);
//const bookmarksController = BookmarkController.getInstance(app);
//const followController = FollowController.getInstance(app);
//SessionController(app);
(0, AuthenticationController_1.default)(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
