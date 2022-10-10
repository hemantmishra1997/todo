import addTaskModel from "../model/addTaskModel";



class addTaskController {

    async addTaskUser(userTask) {
        try {
            userTask = { ...userTask, "state": "Initial", "info": Date() }
            console.log(userTask);
            
            var result = await addTaskModel.addTaskDb(userTask)
            return (result)
        } catch (err) {
            console.log(err, "error from controller in addTaskUser");

        }
    }
    async featchTask(userId) {
        
        try {
            var result = await addTaskModel.featchTaskModel(userId)
            return (result)
        } catch (err) {
            console.log(err, "error from controller featchTask");
        }
    }

    async updateTask(id, data) {
        try{
            var result = await addTaskModel.updateTaskModel(id,data)
                return(result)
        }catch(err){
            console.log(err,"error from userTask controller");
        }
          
    //     return new Promise((resolve, reject) => {
    //         addTaskModel.updateTaskModel(id, taskDetails).then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
     }


    // addTaskModel.featchTaskModel(userId)
    //     return new Promise((resolve, reject) => {
    //         addTaskModel.featchTaskModel(userId).then((result) => {
    //             resolve(result)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
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
    async registerUser(userDetails) {        
        try {
            var candition = "";
            userDetails = { ...userDetails, "role": "user", "status": 1, }
            var result = await addTaskModel.registerModel(userDetails)            
            if (result.result) {
                return ({ "response": result.result })
            }
            else {
                return ({ "error": result.error.sqlMessage })
            }
        } catch (err) {
            console.log(err);
        }
    }

    async loginUser(userDetails) {
        try {
            userDetails = { ...userDetails, "status": 1 }
            var result = await addTaskModel.loginModel(userDetails)
            return (result)
        } catch (err) {
            console.log(err, "error");
        }
    }

    async loginUserGoogle(userDetails) {    
        // console.log(userDetails);
            
        try {
            userDetails = { ...userDetails, "status": 1 }
            var result = await addTaskModel.loginModelForGoogle(userDetails)
            return (result)
        } catch (err) {
            console.log(err, "error");
        }
    }
    //     loginUser(userDetails) {
    //         return new Promise((resolve, reject) => {
    //             userDetails = { ...userDetails, "status": 1 }
    //             addTaskModel.loginModel(userDetails).then((result) => {
    //                 resolve(result)
    //             }).catch((err) => {
    //                 reject(err)
    //             })
    //         })
    //     }
}
export default new addTaskController();