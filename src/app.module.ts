import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';

//Mondulo principal con referencia a todos los modulos y submodulos que mi aplicacion va a tener
@Module({
  imports: [CarsModule],
  controllers: [],
  providers: [],
  exports:[],
})
export class AppModule {}
