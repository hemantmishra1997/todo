import "./connection.js"
import taskData from "../schema/addTaskSchema.js"
import RegisterSchemaModel from "../schema/registerSchema.js"
class addTaskModel
{
    addTaskDb(userTask)
    {
        console.log(userTask);
        return new Promise((resolve,reject)=>{
            
            const obj = taskData(userTask)
            obj.save((err,result)=>{
             err ? reject(err):resolve(result)
            })
        })
    }
    featchTaskModel(condition)
    {
        return new Promise((resolve,reject)=>{
            taskData.find(condition,(err,result)=>{
                err ? reject(err) : resolve(result)
                
            })
        })
    }
    updateTaskModel(id,taskDetails)
    {
        console.log(taskDetails);
        return new Promise((resolve,reject)=>{
            taskData.findOneAndUpdate({"_id":id},{$set:{"state":taskDetails.state,"category":taskDetails.category
            }},(err,result)=>{
                err?reject(err):resolve(result)
                
            })
        })
    }
    deleteTaskModel(condition)
    {
        return new Promise((resolve,reject)=>{
            taskData.findByIdAndRemove({"_id":condition},(err,result)=>{
                err?reject(err):resolve(result)
            })
        })
    }
    registerModel(userDetails)
    {
        return new Promise((resolve,reject)=>{
            const obj = RegisterSchemaModel(userDetails)
            obj.save((err,result)=>{
                err?reject(err):resolve(result)
            })
        })
    }
    loginModel(candition)
    {   

        return new Promise((resolve,reject)=>{
            RegisterSchemaModel.find(candition,(err,result)=>{
                err ? reject(err) :resolve(result)
            })         
        })

    }
    featchUSerModel(candition)
    {
        return new Promise((req,res)=>{
            RegisterSchemaModel.finD
        })
    }
}
export default new addTaskModel();