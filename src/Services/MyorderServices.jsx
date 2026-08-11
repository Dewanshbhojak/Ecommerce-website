import api from "../api/axiosConfig"
export const fetch =()=>{
    return api.get("order/my-order", {
        withCredentials: true
    });

}