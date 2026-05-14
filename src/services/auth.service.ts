import { api } from '@/config/axios-client.config';
import { 
    AuthForgetPasswordResponseType, 
    AuthLoginRequestType, 
    AuthLoginResponseType, 
    AuthRegisterRequestType, 
    AuthRegisterResponseType, 
} from '@/types/auth.type';

export const AuthService = {

    register: async (data: AuthRegisterRequestType) => {
        const res = await api.post<AuthRegisterResponseType>('/auth/register', data);
        return res.data;
    },

    login: async (data: AuthLoginRequestType) => {
        const res = await api.post<AuthLoginResponseType>('/auth/login', data);
        return res.data;
    },

    logout: async () => {
        const res = await api.get<AuthForgetPasswordResponseType>('/auth/logout');
        return res.data;
    },
};
