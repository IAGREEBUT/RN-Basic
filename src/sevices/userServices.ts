import userType from '../types/users';
import axios from '../utils/axios';

class UserService {
  //SignUp.tsx
  signUp(phoneNumber: string | null, password: string | null) {
    return axios.post<userType>(
      `/users`,
      { phoneNumber: phoneNumber, password: password },
      {
        headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
          },
      }
    );
  }

  getUsers(){
    return axios.get<userType>(
        '/users'
    )
  }
}

export default new UserService();