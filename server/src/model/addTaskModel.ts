// import "./connection.js"
// import taskData from "../schema/addTaskSchema.js"
// import RegisterSchemaModel from "../schema/registerSchema.js"
import { Profile } from "../entity/profile"
import { User } from "../entity/user"
import AppDataSource from "../data-source/dataDourse";
import { validate } from "class-validator"
import { Addtask } from "../entity/addtask";

// import AppDataSource from "./data-source/dataDourse"

//server created
AppDataSource.initialize()
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => console.log(error));

const userRepository = AppDataSource.getRepository(User);
const addtaskRepository = AppDataSource.getRepository(Addtask)

class addTaskModel {
  async registerModel(candition) {
    try {
      const profile = new Profile()
      profile.gender = candition.gender
      profile.firstName = candition.firstName
      profile.lastName = candition.lastName
      profile.role = candition.role
      profile.status = candition.status

      //const profileData =  await profileRepository.save(profile)

      const user = new User()
      user.uname = candition.uname
      user.email = candition.email
      user.password = candition.password
      user.provider = candition.provider
      user.providerId = candition.providerId
      user.profile = profile

      const errors = await validate(user)
      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        const result = await userRepository.save(user)
        return ({ "result": result })
      }
    } catch (err: any) {
      return ({ "error": err })
    }
  }


  async loginModelForGoogle(candition) {
    try {
      const user = await userRepository.findOne({
        where:
          { email: candition.email, provider: candition.provided, providerId: candition.providerId }, relations: ['profile'],
      });
      // console.log(user,"user");
      return ({ "response": user })
    } catch (err) {
      // console.log(err,"err");
      return ({ "error": err })
    }
  }


  async loginModel(candition) {
    try {
      const user = await userRepository.findOne({
        where:
          { email: candition.email }, relations: ['profile'],
      });
      return ({ "response": user })
    } catch (err) {
      return ({ "error": err })
    }
  }

  async featchTaskModel(condition) {
    try {

      const task = await addtaskRepository.find({
        relations: {
          user: true,
        },
        where: {
          user:{
            id: condition.userId,
          },
          state: condition.state,
        },
      })
      return ({ "response": task })
    } catch (err) {
      return ({ "error": err })
    }
  }

  // addTaskDb(userTask)
  // {
  //     return new Promise((resolve,reject)=>{
  //         const obj = taskData(userTask)
  //         obj.save((err,result)=>{
  //          err ? reject(err):resolve(result)
  //         })
  //     })
  // }

  async addTaskDb(condition) {
    // console.log(condition);

    try {
      const addtask = new Addtask()
      addtask.task = condition.task
      addtask.date = condition.date
      addtask.end_date = condition.end_date
      addtask.state = condition.state
      addtask.info = condition.info
      addtask.user = condition.userid

      const errors = await validate(addtask)
      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        const result = await addtaskRepository.save(addtask)
        return ({ "response": result })
      }
    } catch (err) {
      return ({ "error": err })
    }
  }

  async updateTaskModel(id, taskDetails) {
    console.log(taskDetails);
    try {
      const result = await addtaskRepository.update(id, { "state": taskDetails.state })
      return ({ response: result })
    } catch (err) {
      return ({ "error": err })

    }



    // taskData.findOneAndUpdate({"_id":id},{$set:{"state":taskDetails.state,"category":taskDetails.category
    //         }},(err,result)=>{
    //             err?reject(err):resolve(result)
    //         })
    //     })
  }

  // deleteTaskModel(condition)
  // {
  //     return new Promise((resolve,reject)=>{
  //         taskData.findByIdAndRemove({"_id":condition},(err,result)=>{
  //             err?reject(err):resolve(result)
  //         })
  //     })
  // }

  // registerModel(userDetails)
  // {
  //     return new Promise((resolve,reject)=>{
  //         const obj = RegisterSchemaModel(userDetails)
  //         obj.save((err,result)=>{
  //             err?reject(err):resolve(result)
  //         })
  //     })
  // }

  // loginModel(candition)
  // {   
  //     return new Promise((resolve,reject)=>{
  //         RegisterSchemaModel.find(candition,(err,result)=>{
  //             err ? reject(err) :resolve(result)
  //         })         
  //     })
  // }

  // featchUSerModel(candition)
  // {
  //     return new Promise((req,res)=>{
  //         RegisterSchemaModel.finD
  //     })
  // }
}
export default new addTaskModel();