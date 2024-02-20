import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SqlModule } from './db/sql.module';
import { AdminsModule } from './admins/admins.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TeamModule } from './team/team.module';
import { IsUniqueConstraint } from './validation/isunique.constraint';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),SqlModule, AuthModule, AdminsModule, ProductsModule, OrdersModule, TeamModule, PaymentModule],
  controllers: [AppController, AuthController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule { }
