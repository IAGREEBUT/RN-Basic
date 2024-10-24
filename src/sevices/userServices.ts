import userType from '../types/users';
import axios from '../utils/axios';

class UserService {
  //SignUp.tsx
  signUp(phoneNumber: string | null, password: string | null, nickname: string|null) {
    return axios.post<userType>(
      `/users`,
      { phoneNumber: phoneNumber, password: password, nickname: nickname },
    );
  }

  getUsers(){
    return axios.get<userType>(
        '/users'
    )
  }
}

export default new UserService();