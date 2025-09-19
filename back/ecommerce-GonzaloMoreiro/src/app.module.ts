import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { ProductsModule } from './Products/products.module';
import { OrdersModule } from './Orders/order.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { OrderDetailsModule } from './OrderDetails/orderDetail.module';
import { CategoriesModule } from './Categories/categories.module';
import { FileUploadModule } from './file-upload/file-upload-module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<TypeOrmModuleOptions>('typeorm'),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    CategoriesModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
