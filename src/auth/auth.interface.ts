import { IGenericResponse } from 'src/global/global.interface';
import { SignInDto, SignupDto } from './auth.dto';
import { UserEntity } from 'src/user/user.entity';

export interface AuthServiceInterface {
  signIn(query: SignInDto): Promise<IGenericResponse<IResponseSignIn>>;
  signUp(query: SignupDto): Promise<IGenericResponse<UserEntity | null>>;
}

export interface IResponseSignIn {
  accessToken: string;
  refreshToken: string;
}
