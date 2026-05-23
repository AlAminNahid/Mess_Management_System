import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessesEntity } from 'src/entities/messes.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetUtilityCostsService {
  constructor(
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
  ) {}

  async getUtilityCosts(messID: number) {
    const mess = await this.messRepository.findOne({
      where: { id: messID },
    });

    if (!mess) {
      throw new NotFoundException('Mess not found');
    }

    const result = await this.utilityCostsRepository
      .createQueryBuilder('utilityCost')
      .select('COALESCE(SUM(utilityCost.rent), 0)', 'rent')
      .addSelect('COALESCE(SUM(utilityCost.electricity), 0)', 'electricity')
      .addSelect('COALESCE(SUM(utilityCost.internet), 0)', 'internet')
      .addSelect('COALESCE(SUM(utilityCost.gas), 0)', 'gas')
      .addSelect('COALESCE(SUM(utilityCost.maid), 0)', 'maid')
      .where('utilityCost.mess_id = :messID', { messID })
      .andWhere("utilityCost.created_at >= DATE_TRUNC('month', CURRENT_DATE)")
      .andWhere(
        "utilityCost.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'",
      )
      .getRawOne();

    const rent = Number(result.rent) || 0;
    const electricity = Number(result.electricity) || 0;
    const internet = Number(result.internet) || 0;
    const gas = Number(result.gas) || 0;
    const maid = Number(result.maid) || 0;

    return {
      mess_id: mess.id,
      mess_name: mess.name,
      month: new Date().toISOString().slice(0, 7),
      rent,
      electricity,
      internet,
      gas,
      maid,
      totalUtilityCost: rent + electricity + internet + gas + maid,
    };
  }
}
