import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      brand: 'kenya',
      name: 'Cappucino',
      flavors: ['vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((it) => it.id === +id);
  }

  create(newCoffee: any) {
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  update(id: string, newCoffee: UpdateCoffeeDto) {
    // const existingCoffee = this.findOne(id);
    // if (!!existingCoffee) {
    //   return;
    // }
    // return;
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((it) => it.id === +id);
    this.coffees.splice(coffeeIndex, 1);
  }
}
