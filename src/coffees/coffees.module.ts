import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';

@Injectable()
export class CoffeebrandsFactory {
  create() {
    //
    return ['buddy_brew', 'nescafe'];
  }
}

class ConfigService {}
class DevelopmentService {}
class ProdcutionConfigService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeebrandsFactory,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development' ? DevelopmentService : ProdcutionConfigService,
    },
    {
      provide: COFFEE_BRANDS,
      // useFactory: (brandsFactory: CoffeebrandsFactory) => brandsFactory.create(),
      useFactory: async (connection: Connection) => {
        const coffeeBrands = await Promise.resolve(['buddy_brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [CoffeebrandsFactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
