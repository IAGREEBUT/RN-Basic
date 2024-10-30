import { atom } from 'jotai';

export const USER_LOGIN_STATUS = atom<boolean>(false)
export const USER_ID = atom<string>('')
export const USER_NICKNAME = atom<string>('')

// const USER_ATOM = atom((get) => ({
//     userId : get(USER_ID),
//     nickname : get(USER_NICKNAME)
// }))