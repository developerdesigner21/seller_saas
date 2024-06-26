import { configurateAsync } from "./common/apiUtils";
import profileParser from "./common/profileParser";

export async function postLoginUser(email,password){
    let baseUrlAdmin = profileParser() + "api/user"
    let apiEndPoint = baseUrlAdmin + "/login"
    let configData = await configurateAsync(false) //isBearerAuth=false
    configData.body = {email,password}
    // configData.params = {email,password}
    return {apiEndPoint, configData}
}

export async function postSignupUser(name,email,password,country_code,mobile_number,acceptPolicy){
    let baseUrlAdmin = profileParser() + "api/user"
    let apiEndPoint = baseUrlAdmin + "/signup"
    let configData = await configurateAsync(false) //isBearerAuth=false
    configData.body = {name,email,password,country_code,mobile_number,acceptPolicy}
    // configData.params = {email,password}
    return {apiEndPoint, configData}
}