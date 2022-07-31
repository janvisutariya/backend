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
const axios_1 = __importDefault(require("axios"));
// axios.defaults.baseURL = 'http://localhost:4000/api';
axios_1.default.defaults.baseURL = 'https://cs5500assignment3.herokuapp.com/api';
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.get('/users'); });
const findUserById = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get(`/users/${uid}`);
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.post('/users', user); });
const updateUser = (uid, user) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.put(`/users/${uid}`, user); });
const deleteUser = (uid) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_1.default.delete(`/users/${uid}`); });