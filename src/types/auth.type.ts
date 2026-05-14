import { BaseEntityType } from "./shared/base-entity.type";

// Base Types
export type AuthMessageResponseType = {
    message: string;
    data?: unknown;
};

// User Types
export type AuthUserResponseType = BaseEntityType & {
    email: string;
    name: string;
    provider?: string;
    role?: string;
    avatar?: {
        fileKey?: string;
    };
    coverImage?: {
        fileKey?: string;
    };
    isBlocked?: boolean;
};

// Login Types
export type AuthLoginRequestType = {
    email: string;
    password: string;
};

export type AuthLoginResponseType = {
    accessToken: string;
    user: AuthUserResponseType;
};

// Register Types
export type AuthRegisterRequestType = {
    name: string;
    email: string;
    password: string;
};

export type AuthRegisterResponseType = AuthMessageResponseType & {
    emailToVerify: string;
};

export type AuthVerifyEmailResponseType = AuthMessageResponseType;

// Forget Password Types
export type AuthForgetPasswordRequestType = {
    email: string;
};

export type AuthForgetPasswordResponseType = AuthMessageResponseType;
