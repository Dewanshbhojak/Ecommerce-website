import api from "../api/axiosConfig"

export const logout = ()=>{
    return api.post("/users/logout")
}
export const getProfile =()=> {
    return api.get("/users/myprofile")
}