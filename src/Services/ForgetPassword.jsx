import api from "../api/axiosConfig";
export const getOtp = (email)=> {
    return api.post(`users/changePassword?email=${email}`,{
       withCredentials: true,
      
    })
}


export const changePassword = (password,otp,token)=> {
    return api.post(`users/newPassword?token=${token}&otp=${otp}&password=${password}`,{
       withCredentials: true,
      
    })
}