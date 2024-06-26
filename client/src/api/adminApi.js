import { configurateAsync } from "./common/apiUtils";
import profileParser from "./common/profileParser";

export async function postLoginAdmin(email,password){
    let baseUrlAdmin = profileParser() + "api/admin"
    let apiEndPoint = baseUrlAdmin + "/login"
    let configData = await configurateAsync(false) //isBearerAuth=false
    configData.body = {email,password}
    // configData.params = {email,password}
    return {apiEndPoint, configData}
}

export async function getUserList(){
    let baseUrlAdmin = profileParser() + "api/admin"
    let apiEndPoint = baseUrlAdmin + "/fetchAllUser"
    let configData = await configurateAsync(false) //isBearerAuth=false
    // configData.params = {email,password}
    return {apiEndPoint, configData}
}