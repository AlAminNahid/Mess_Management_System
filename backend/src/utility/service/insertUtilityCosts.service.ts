import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsertUtilityCostsService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async insertUtiltyCosts(
    messID: number,
    rent: number,
    electricity: number,
    internet: number,
    gas: number,
    maid: number,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!mess) {
      throw new NotFoundException('Mess not found');
    }

    const utilityCosts = await this.utilityCostsRepository.create({
      mess,
      rent,
      electricity,
      internet,
      gas,
      maid,
      manager_id: userID,
    });

    await this.utilityCostsRepository.save(utilityCosts);

    return {
      message: 'Utility cost is inserted successfully',
      mess_name: mess.name,
      mess_address: mess.address,
      rent: utilityCosts.rent,
      internet: utilityCosts.internet,
      electricity: utilityCosts.electricity,
      gas: utilityCosts.gas,
      maid: utilityCosts.maid,
      manager_name: user.name,
    };
  }
}
