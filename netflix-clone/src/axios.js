import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: 'd4d92f337fd0f887a4632d5bb8e705d7',
        
      },
});


export default instance;