
export interface IRegisterUser{
    "name":string;
    "email":string;
    "password":string;
}

export interface ILoginUser{
    "_id":string
    "name":string
    "email":string
    "password":string
}

export interface IPayloadJWT{
    "_id":string
    "name":string
}