import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';
import { currentMonthInBangladesh } from 'src/utility/bangladesh-date.util';

@Injectable()
export class CurrentMonthUtilityBillsService {
  constructor(
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
  ) {}

  async getCurrentMonthUtilityBills(messID: number, userID: number) {
    const managerMember = await this.memberRepository.findOne({
      where: { user: { id: userID }, is_active: true },
      relations: ['mess'],
    });
    if (!managerMember) {
      throw new NotFoundException(
        'Manager is not an active member of any mess',
      );
    }

    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });

    if (!mess) {
      throw new NotFoundException('Mess not found');
    }
    if (mess.id !== managerMember.mess.id) {
      throw new ForbiddenException(
        'This utility bill does not belong to your mess',
      );
    }

    const result = await this.utilityCostsRepository
      .createQueryBuilder('utilityCost')
      .select('COALESCE(SUM(utilityCost.electricity), 0)', 'electricity')
      .addSelect('COALESCE(SUM(utilityCost.internet), 0)', 'internet')
      .addSelect('COALESCE(SUM(utilityCost.gas), 0)', 'gas')
      .addSelect('COALESCE(SUM(utilityCost.maid), 0)', 'maid')
      .where('utilityCost.mess_id = :messID', { messID })
      .andWhere(
        "((utilityCost.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .andWhere(
        "((utilityCost.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
      )
      .getRawOne();

    const electricity = Number(result.electricity) || 0;
    const internet = Number(result.internet) || 0;
    const gas = Number(result.gas) || 0;
    const maid = Number(result.maid) || 0;

    return {
      mess_id: mess.id,
      mess_name: mess.name,
      month: currentMonthInBangladesh(),
      electricity,
      internet,
      gas,
      maid,
      totalUtilityBill: electricity + internet + gas + maid,
    };
  }
}
