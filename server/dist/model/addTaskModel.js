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
// import "./connection.js"
// import taskData from "../schema/addTaskSchema.js"
// import RegisterSchemaModel from "../schema/registerSchema.js"
const profile_1 = require("../entity/profile");
const user_1 = require("../entity/user");
const dataDourse_1 = __importDefault(require("../data-source/dataDourse"));
// import AppDataSource from "./data-source/dataDourse"
//server created
dataDourse_1.default.initialize()
    .then(() => {
    console.log("DB is connected");
})
    .catch((error) => console.log(error));
const userRepository = dataDourse_1.default.getRepository(user_1.User);
class addTaskModel {
    registerModel(candition) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const profile = new profile_1.Profile();
            profile.gender = candition.gender;
            profile.firstName = candition.firstName;
            profile.lastName = candition.lastName;
            //    const profileData =  await profileRepository.save(profile)
            const user = new user_1.User();
            user.uname = candition.uname;
            user.email = candition.email;
            user.password = candition.password;
            user.profile = profile;
            const data = yield userRepository.save(user);
            resolve(data);
        }));
    }
}
exports.default = new addTaskModel();
