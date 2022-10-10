"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addTaskModel_1 = __importDefault(require("../model/addTaskModel"));
class addTaskController {
    // addTaskUser(userTask) {
    //     return new Promise((resolve, reject) => {
    //         addTaskModel.featchTaskModel().then((result) => {
    //             let l = result.length
    //             var id = parseInt((l == 0) ? 1 : result[l - 1]._id + 1)
    //             userTask = { ...userTask, "_id": id, "state":"Initial","info":Date()}
    //             addTaskModel.addTaskDb(userTask).then((result) => {
    //                 resolve(result)
    //             }).catch((err) => {
    //                 reject(err)
    //             })
    //         }).catch((err) => {
    //             console.log(err, "_id manage");
    //         })
    //     })
    // }
    // featchTask(userId) {
    //     return new Promise((resolve, reject) => {
    //         addTaskModel.featchTaskModel(userId).then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
    // updateTask(id, taskDetails) {
    //     return new Promise((resolve, reject) => {
    //         addTaskModel.updateTaskModel(id, taskDetails).then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
    // deleteTask(id) {
    //     return new Promise((resolve, reject) => {
    //         addTaskModel.deleteTaskModel(id).then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
    registerUser(userDetails) {
        console.log(userDetails);
        return new Promise((resolve, reject) => {
            var candition = "";
            // userDetails = { ...userDetails, "role": "user", "status": 1, }
            addTaskModel_1.default.registerModel(userDetails).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}
exports.default = new addTaskController();
