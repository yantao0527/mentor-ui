import axios from "axios";
//import qs from 'qs'

//const API_URL = "/";

class ChatService {
  improve_resume(resume:string, job: string) {
    console.log("improve_resume");
    return axios.post("/chat/resume", {
      resume,
      job,
    });
  }

}

let instance = new ChatService();

export default instance;
