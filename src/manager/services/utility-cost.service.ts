import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilityCostService {
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
      mess: mess,
      rent: rent,
      electricity: electricity,
      internet: internet,
      gas: gas,
      maid: maid,
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

  async updateUtilityCosts(
    utilityCostID: number,
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

    const existingUtilityCosts = await this.utilityCostsRepository.findOne({
      where: { id: utilityCostID },
    });
    if (!existingUtilityCosts) {
      throw new NotFoundException('Utility Cost not found');
    }

    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });
    if (!mess) {
      throw new NotFoundException('Mess not found');
    }

    existingUtilityCosts.rent = rent;
    existingUtilityCosts.electricity = electricity;
    existingUtilityCosts.internet = internet;
    existingUtilityCosts.gas = gas;
    existingUtilityCosts.maid = maid;

    await this.utilityCostsRepository.save(existingUtilityCosts);

    return {
      message: 'Utility cost is updated successfully',
      mess_name: mess.name,
      mess_address: mess.address,
      rent: existingUtilityCosts.rent,
      internet: existingUtilityCosts.internet,
      electricity: existingUtilityCosts.electricity,
      gas: existingUtilityCosts.gas,
      maid: existingUtilityCosts.maid,
      manager_name: user.name,
    };
  }
}
