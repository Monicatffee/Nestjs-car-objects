//Curso https://mantugroup.udemy.com/course/nest-framework/learn/lecture/32897346#questions
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto} from './dto';

@Controller('cars')
export class CarsController {

    constructor( private readonly carsService: CarsService ) {

    }

    @Get()
    getAllCars() {
        return this.carsService.findAll()
    }


    //Validamos con los pipes que el id sea de tipo uuid
    @Get(':id')
    getCarsById( @Param('id', ParseUUIDPipe) id:string ) {
        return this.carsService.findOneById( id );
    }

    //Validamos el body con el ValidationPipe por medio del DTO create.car.dto.ts
    //@UsePipes( ValidationPipe )
    @Post()
    createCar ( @Body() createCarDto: CreateCarDto ){
        return this.carsService.createCar( createCarDto )
    }

    @Patch(':id')
    updateCar (
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto){
        return this.carsService.updateCar(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar ( @Param('id', ParseUUIDPipe) id: string){
        return this.carsService.deleteCar( id );
    }

}
