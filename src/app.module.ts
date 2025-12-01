import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './db.connection';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { ManagerModule } from './manager/manager.module';
import { MessModule } from './mess/mess.module';

const db = new dbConnection();
@Module({
  imports: [TypeOrmModule.forRoot({
    type : db.type,
    host : db.host,
    port : db.port,
    username : db.username,
    password : db.password,
    database : db.database,
    autoLoadEntities : true,
    synchronize : true
  }), AuthModule, MemberModule, ManagerModule, MessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
