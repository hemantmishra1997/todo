import addTaskModel from "../model/addTaskModel.js";



class addTaskController {
    addTaskUser(userTask) {
        return new Promise((resolve, reject) => {
            addTaskModel.featchTaskModel().then((result) => {
                let l = result.length
                var id = parseInt((l == 0) ? 1 : result[l - 1]._id + 1)
                userTask = { ...userTask, "_id": id, "state":"Initial","info":Date()}
                addTaskModel.addTaskDb(userTask).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                console.log(err, "_id manage");
            })
        })
    }
    featchTask(userId) {
        return new Promise((resolve, reject) => {
            addTaskModel.featchTaskModel(userId).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    updateTask(id, taskDetails) {
        return new Promise((resolve, reject) => {
            addTaskModel.updateTaskModel(id, taskDetails).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    deleteTask(id) {
        return new Promise((resolve, reject) => {
            addTaskModel.deleteTaskModel(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
    registerUser(userDetails) {
        return new Promise((resolve, reject) => {
            addTaskModel.loginModel().then((result) => {
                var l = result.length;
                var id = parseInt((l == 0) ? 1 : result[l - 1]._id + 1)
                
                userDetails = { ...userDetails, "_id": id, "role": "user", "status": 1, "info": Date() }
                addTaskModel.registerModel(userDetails).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                console.log(err);
            })
        })
    }

    loginUser(userDetails) {
        return new Promise((resolve, reject) => {
            userDetails = { ...userDetails, "status": 1 }
            addTaskModel.loginModel(userDetails).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
export default new addTaskController();