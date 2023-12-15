import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericResponse } from 'src/global/global.interface';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignInDto, SignupDto } from './auth.dto';
import { AuthServiceInterface, IResponseSignIn } from './auth.interface';
import { EUserStatus } from 'src/user/user.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
  ) {}

  async _getUserById({ id, username }: { id?: number; username?: string }) {
    if (id) {
      const foundUser = await this.authRepository.findOne({
        where: { id },
        select: [
          'id',
          'name',
          'email',
          'username',
          'age',
          'status',
          'createdAt',
        ],
      });
      return foundUser;
    }
    if (username) {
      const foundUser = await this.authRepository.findOne({
        where: { username },
        select: [
          'id',
          'name',
          'email',
          'username',
          'age',
          'status',
          'createdAt',
        ],
      });
      return foundUser;
    }
    return null;
  }

  async signIn(query: SignInDto): Promise<IGenericResponse<IResponseSignIn>> {
    const user = await this.authRepository.findOne({
      where: {
        username: query.username,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user && !(await bcrypt.compare(query.password, user.password))) {
      throw new BadRequestException('Password is incorrect');
    }
    return {
      data: {
        accessToken: 'asdsad',
        refreshToken: '<PASSWORD>',
      },
      message: 'sign in success',
    };
  }

  async signUp(query: SignupDto): Promise<IGenericResponse<UserEntity | null>> {
    console.log(
      '🚀 ~ file: auth.service.ts:33 ~ AuthService ~ signUp ~ query:',
      query,
    );
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(query.password, salt);

      const payload = {
        email: query.email,
        password: hashedPassword,
        username: query.username,
        name: query.name,
        age: query.age,
        status: EUserStatus.ACTIVE,
      };
      const user = await this.authRepository.create(payload);
      await this.authRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists.');
      }
    }
    const user = await this._getUserById({ username: query.username });
    return {
      data: user,
      message: 'Signup success',
    };
  }
}

//                   _ooOoo_
//                  o8888888o
//                  88" . "88
//                  (| -_- |)
//                  O\  =  /O
//               ____/`---'\____
//             .'  \\|     |//  `.
//            /  \\|||  :  |||//  \
//           /  _||||| -:- |||||-  \
//           |   | \\\  -  /// |   |
//           | \_|  ''\---/''  |   |
//           \  .-\__  `-`  ___/-. /
//         ___`. .'  /--.--\  `. . __
//      ."" '<  `.___\_<|>_/___.'  >'"".
//     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//     \  \ `-.   \_ __\ /__ _/   .-` /  /
//======`-.____`-.___\_____/___.-`____.-'======
//                   `=---='
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Buddha bless, never bug
// This module has been enlightened and there is no possibility of bugs
//=============================================
