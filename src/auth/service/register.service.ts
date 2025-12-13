import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async registration(
    name: string,
    email: string,
    password: string,
    nid: string,
    phone: string,
  ): Promise<UsersEntity> {
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      nid,
      phone,
    });
    await this.usersRepository.save(user);

    console.log('Users registration successful');

    const { password: _, ...result } = user as any;
    return result;
  }
}
