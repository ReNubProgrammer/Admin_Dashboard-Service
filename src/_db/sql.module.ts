import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MY_HOST'),
        port: +configService.get('MY_PORT'),
        username: configService.get('MY_USER'),
        password: configService.get('MY_PASS'),
        database: configService.get('MY_SCHEMA'),
        entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: configService.get('MY_SYNC'),
        autoLoadEntities: true
      }),
      inject: [ConfigService],
    })]
})
export class SqlModule { }
