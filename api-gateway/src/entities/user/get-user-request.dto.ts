/* eslint-disable prettier/prettier */
export class UserAuthDto {
    userId: number;
}
  
export class GetUserRequest {
    userAuth: UserAuthDto;
}

export class UserAskDto {
    email : string;
    password : string;
}
    