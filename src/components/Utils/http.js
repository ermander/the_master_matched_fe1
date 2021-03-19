import axios from "axios"

const authAxios = axios.create({
    baseURL: "https://the-master-matched-be-new.herokuapp.com",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
})

// refresh token flow

authAxios.interceptors.response.use((response) => response, 
    function(error){
        // Saving the original request
        const originalRequest = error.config

        if(error.response.status === 401 && originalRequest.url === "users/refresh-token"){
            // refresh token wasn't walid
            console.log("Redirect to the login page")
            return Promise.reject(error)
        }else{
            if(error.response.status === 401){
                const refreshToken = localStorage.getItem("refreshToken")
                return authAxios
                .post("users/refresh-token",{
                    refreshToken
                })
                .then(response => {
                    if(response.status === 200){
                        // Setting my new tokens inside the local storage
                        localStorage.setItem("accessToken", response.data.accessToken)
                        localStorage.setItem("refreshToken", response.data.refreshToken)
    
                        // Retry again the original request with the new brand access token in authorization header

                        return axios(originalRequest, {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        })
                    }
                })
            }            
        }
        return Promise.reject(error)
    }
)


export default authAxios