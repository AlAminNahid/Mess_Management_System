import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUtilityCostsService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
  ) {}

  async updateUtilityCosts(
    utilityCostID: number,
    messID: number,
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

    const managerMember = await this.memberRepository.findOne({
      relations: { mess: true },
      where: { user: { id: userID }, is_active: true },
    });
    if (!managerMember) {
      throw new NotFoundException('Manager is not an active member of any mess');
    }

    const existingUtilityCosts = await this.utilityCostsRepository.findOne({
      relations: { mess: true },
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
    if (
      mess.id !== managerMember.mess.id ||
      existingUtilityCosts.mess.id !== managerMember.mess.id
    ) {
      throw new ForbiddenException('This utility cost does not belong to your mess');
    }

    existingUtilityCosts.electricity = electricity;
    existingUtilityCosts.internet = internet;
    existingUtilityCosts.gas = gas;
    existingUtilityCosts.maid = maid;

    await this.utilityCostsRepository.save(existingUtilityCosts);

    return {
      message: 'Utility cost is updated successfully',
      mess_name: mess.name,
      mess_address: mess.address,
      internet: existingUtilityCosts.internet,
      electricity: existingUtilityCosts.electricity,
      gas: existingUtilityCosts.gas,
      maid: existingUtilityCosts.maid,
      manager_name: user.name,
    };
  }
}
