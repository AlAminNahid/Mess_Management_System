import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealExpenseIterationsEntity } from 'src/entities/meal_expense_iterations.entity';
import { MealsEntity } from 'src/entities/meals.entity';
import { MembersEntity } from 'src/entities/members.entity';
import { MessesEntity } from 'src/entities/messes.entity';
import { NoticesEntity } from 'src/entities/notices.enitity';
import { UsersEntity } from 'src/entities/users.entity';
import { UtilityCostsEntity } from 'src/entities/utility_costs.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(MembersEntity)
    private memberRepository: Repository<MembersEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(MealsEntity)
    private mealRepository: Repository<MealsEntity>,
    @InjectRepository(MealExpenseIterationsEntity)
    private mealExpenseRepositor: Repository<MealExpenseIterationsEntity>,
    @InjectRepository(UtilityCostsEntity)
    private utilityCostsRepository: Repository<UtilityCostsEntity>,
    @InjectRepository(MessesEntity)
    private messRepository: Repository<MessesEntity>,
    @InjectRepository(NoticesEntity)
    private noticeRepository: Repository<NoticesEntity>,
  ) {}

  getManagerDashboard(): string {
    return 'Welcome to the dashboard Manager';
  }

  async insertMeals(mealCount: number, memberID: number, userID: number) {
    const user = await this.userRepository.findOne({ where: { id: userID } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    const meal = await this.mealRepository.create({
      meal_count: mealCount,
      manager_id: userID,
      member: memberInfo,
    });

    await this.mealRepository.save(meal);

    return {
      message: 'Meal inserted successfully',
      member_id: memberInfo.id,
      date: meal.date,
      meal_count: meal.meal_count,
      manager_name: user.name,
    };
  }

  async updateMeals(
    mealID: number,
    mealCount: number,
    memberID: number,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingMeal = await this.mealRepository.findOne({
      where: { id: mealID },
    });
    if (!existingMeal) {
      throw new NotFoundException('Meal not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    existingMeal.meal_count = mealCount;
    existingMeal.member = memberInfo;
    existingMeal.manager_id = userID;

    await this.mealRepository.save(existingMeal);

    return {
      message: 'Meal updated successfully',
      member_id: memberInfo.id,
      date: existingMeal.date,
      meal_count: existingMeal.meal_count,
      manager_name: user.name,
    };
  }

  async insertMealExpenses(
    amount: number,
    description: string,
    memberID: number,
    userID: number,
  ) {
    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const mealExpense = await this.mealExpenseRepositor.create({
      member: memberInfo,
      manager_id: userID,
      amount: amount,
      description: description,
    });

    await this.mealExpenseRepositor.save(mealExpense);

    return {
      message: 'Meal Expense Iteration is successfully inserted',
      member_id: memberInfo.id,
      amount: mealExpense.amount,
      date: mealExpense.date,
      description: mealExpense.description,
      manager_name: user.name,
    };
  }

  async updateMealExpenses(
    mealExpensID: number,
    amount: number,
    description: string,
    memberID: number,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingMealExpens = await this.mealExpenseRepositor.findOne({
      where: { id: mealExpensID },
    });
    if (!existingMealExpens) {
      throw new NotFoundException('Meal Expense Iteration is not found');
    }

    const memberInfo = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!memberInfo) {
      throw new NotFoundException('Member not found');
    }

    existingMealExpens.amount = amount;
    existingMealExpens.description = description;
    existingMealExpens.member = memberInfo;
    existingMealExpens.manager_id = userID;

    await this.mealExpenseRepositor.save(existingMealExpens);

    return {
      message: 'Meal Expense Iteration is successfully updated',
      member_id: memberInfo.id,
      amount: existingMealExpens.amount,
      date: existingMealExpens.date,
      description: existingMealExpens.description,
      manager_name: user.name,
    };
  }

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

  async sendNotice(
    title: string,
    description: string,
    notice_type: string,
    userID: number,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const member = await this.memberRepository.findOne({
      where: { user: { id: userID } },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const notice = await this.noticeRepository.create({
      title: title,
      description: description,
      notice_type: notice_type,
      member: member,
    });

    await this.noticeRepository.save(notice);

    return {
      message: 'Notice is sended successfully',
      title: notice.title,
      description: notice.description,
      date: notice.posted_date,
      notice_type: notice.notice_type,
      sended_by: user.name,
    };
  }

  async getNotices(messID: number, userID: number) {
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

    const notices = await this.noticeRepository.find({
      select: {
        title: true,
        description: true,
        notice_type: true,
        posted_date: true,
        member: { id: true, mess: { name: true, address: true } },
      },
      relations: {
        member: {
          mess: true,
        },
      },
      where: {
        member: {
          mess: { id: messID },
        },
      },
    });

    return {
      message: 'All the notices',
      notices,
    };
  }

  async deactivateMember(memberID: number, userID: number) {
    const user = await this.userRepository.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const member = await this.memberRepository.findOne({
      where: { id: memberID },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    member.is_active = false;
    await this.memberRepository.save(member);

    return {
      message: 'Member deactivated successfully',
      member_id: member.id,
      is_active_status: member.is_active,
      manager_name: user.name,
    };
  }

  async deactivateMess(messID: number, userID: number) {
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

    mess.is_active = false;
    await this.messRepository.save(mess);

    await this.memberRepository
      .createQueryBuilder()
      .update()
      .set({ is_active: false })
      .where('messId = :messID', { messID })
      .execute();

    return {
      message: 'Mess and all members deactivated successfully',
      mess_id: mess.id,
      mess_name: mess.name,
      manager: user.name,
    };
  }
}
