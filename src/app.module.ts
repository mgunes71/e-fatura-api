import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { AuthModule } from './authService/auth.module';
import { UserEntity } from './entity/user.entity';
import { IncomeEntity } from './entity/income.entity';
import { ExpenseEntity } from './entity/expense.entity';
import { CustomerEntity } from './entity/customer.entity';
import { InvoiceEntity } from './entity/invoice.entity';
import { ContactEntity } from './entity/contact.entity';
import { CustomerModule } from './customer/customer.module';
import { ContactModule } from './user/contact/contact.module';
import { InvoiceModule } from './invoice/invoice.module';
import { WalletEntity } from './entity/wallet.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASS,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      define: {
        timestamps: true,
        underscored: true,
        paranoid: false,
      },
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      models: [
        UserEntity,
        IncomeEntity,
        ExpenseEntity,
        CustomerEntity,
        InvoiceEntity,
        ContactEntity,
        WalletEntity,
      ],
      // autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    ExpenseModule,
    IncomeModule,
    AuthModule,
    CustomerModule,
    ContactModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
