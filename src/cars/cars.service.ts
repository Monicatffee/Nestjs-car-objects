import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById( id: string) {
        const car = this.cars.find( car => car.id == id)
        if( !car ) throw new NotFoundException(`Car with id '${id}' not found.`)

        return car;
    }

    createCar( createCarDto: CreateCarDto ){
        const car: Car ={
            id: uuid(),
            ...createCarDto
            // brand: createCarDto.brand,
            // model: createCarDto.model,
        }
        this.cars.push(car);
        return car;
    }

    updateCar( id: string,  updateCarDto: UpdateCarDto ){

        let carDB = this.findOneById(id);
        if( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException(`Car id is no valid inside body`);

        this.cars = this.cars.map( car =>{
            if(car.id === id){
                carDB= {
                    ...carDB, //Va a asignar en esa posicion todo lo que esta en carDB
                    ...updateCarDto, //Va a sobreescrribir unicamente las propiedades que vienen en el updateCarDto
                    id //Va a mantener el Id
                }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    deleteCar( id: string ){
        let car = this.findOneById( id );
        this.cars = this.cars.filter( car => car.id !== id );
    }
}
