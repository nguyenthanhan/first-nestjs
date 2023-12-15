import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignupDto } from './auth.dto';
import { IGenericResponse } from 'src/global/global.interface';
import { IResponseSignIn } from './auth.interface';
import { UserEntity } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() body: SignInDto): Promise<IGenericResponse<IResponseSignIn>> {
    return this.authService.signIn(body);
  }

  @Post('/sign-up')
  signUp(
    @Body() body: SignupDto,
  ): Promise<IGenericResponse<UserEntity | null>> {
    return this.authService.signUp(body);
  }
}
