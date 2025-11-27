import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entitie/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository : Repository<UsersEntity>
    ){}

    async registration(name : string, email : string, password : string, nid : string, phone : string) : Promise<UsersEntity> {
        const existing = await this.usersRepository.findOne({where : {email}})
        if(existing){
            throw new BadRequestException('Email already registered');
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await this.usersRepository.create({name, email, password : hashPassword, nid, phone});
        await this.usersRepository.save(user);

        console.log('Users registration successful');

        const {password: _, ...result} = user as any;
        return result;
    }

    async login(email : string, password : string) : Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({where : {email}});
        if(!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            throw new BadRequestException('Invalid password')
        }

        console.log('Users login successful');

        const {password: _, ...result} = user as any;
        return result;
    }

    async changePassword(email : string, oldPassword : string, newPassword : string) : Promise<UsersEntity>{
        const existing = await this.usersRepository.findOne({where : {email}});
        if(!existing) {
            throw new BadRequestException('User not found');
        }

        const valid = await bcrypt.compare(oldPassword, existing.password);
        if(!valid) {
            throw new BadRequestException('Old password is not matched');
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const user = await this.usersRepository.update({email}, {password : hashPassword});

        console.log('User password updated successfuly');

        const {password: _, ...result} = user as any;

        return result;
    }

    async forgetPassword(email : string, newPassword : string, confirmPassword : string) : Promise<UsersEntity> {
        const existing = await this.usersRepository.findOne({where : {email}});
        if(!existing) {
            throw new BadRequestException('User not found');
        }

        if (newPassword !== confirmPassword) {
            throw new BadRequestException(`New password and Confirm password didn't match`);
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const user = await this.usersRepository.update({email}, {password : hashPassword});

        console.log('Forget password is done');

        const {password: _, ...result} = user as any;

        return result;
    }
}
