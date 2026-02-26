import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SharedService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async getUserById(userID: string) {
    const user = await this.userRepository.findOne({
      where: { id: Number(userID) },
      select: ['name', 'email', 'phone', 'nid'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
