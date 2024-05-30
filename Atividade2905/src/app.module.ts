import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/aula2905'), 
    ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
