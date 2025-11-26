import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnection } from './db.connection';
import { AuthModule } from './auth/auth.module';

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
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
