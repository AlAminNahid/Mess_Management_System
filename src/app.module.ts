import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './db.connection';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MemberModule } from './member/member.module';
import { ManagerModule } from './manager/manager.module';

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
  }), AuthModule, AdminModule, MemberModule, ManagerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
