import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterService } from '../service/register.service';
import { registrationDTO } from 'src/dtos/auth/registration.dto';
import { UsersEntity } from 'src/entities/users.entity';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe())
  registration(@Body() info: registrationDTO): Promise<UsersEntity> {
    return this.registerService.registration(
      info.name,
      info.email,
      info.password,
      info.nid,
      info.phone,
    );
  }
}
