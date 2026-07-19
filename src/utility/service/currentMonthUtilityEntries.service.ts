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

@Injectable()
export class CurrentMonthUtilityEntriesService {
  constructor(
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
  ) {}

  async getCurrentMonthUtilityEntries(messID: number, userID: number) {
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
        'This utility entry does not belong to your mess',
      );
    }

    const entries = await this.utilityCostsRepository
      .createQueryBuilder('utilityCost')
      .select('utilityCost.id', 'id')
      .addSelect('utilityCost.date', 'date')
      .addSelect('utilityCost.electricity', 'electricity')
      .addSelect('utilityCost.internet', 'internet')
      .addSelect('utilityCost.gas', 'gas')
      .addSelect('utilityCost.maid', 'maid')
      .where('utilityCost.mess_id = :messID', { messID })
      .andWhere(
        "((utilityCost.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') >= DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka')",
      )
      .andWhere(
        "((utilityCost.date AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Dhaka') < DATE_TRUNC('month', CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Dhaka') + INTERVAL '1 month'",
      )
      .orderBy('utilityCost.date', 'DESC')
      .getRawMany();

    return {
      mess_id: mess.id,
      mess_name: mess.name,
      entries: entries.map((entry) => {
        const electricity = Number(entry.electricity) || 0;
        const internet = Number(entry.internet) || 0;
        const gas = Number(entry.gas) || 0;
        const maid = Number(entry.maid) || 0;

        return {
          id: Number(entry.id),
          date: this.formatDateInBangladesh(entry.date),
          electricity,
          internet,
          gas,
          maid,
          total: electricity + internet + gas + maid,
        };
      }),
    };
  }

  private formatDateInBangladesh(date: Date) {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date(date));

    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;

    return `${year}-${month}-${day}`;
  }
}
