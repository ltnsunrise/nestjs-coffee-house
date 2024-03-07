import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  //   @Get()
  //   findAll(@Query() paginationQuery) {
  //     const { limit, offset } = paginationQuery;
  //     return `this actions returns all coffees. Limit: ${limit}, offset: ${offset}`;
  //   }
  //   @Get()
  //   findAll(@Res() response) {
  //     response.status(200).send('this actions returns all coffees');
  //   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffee = this.coffeesService.findOne(id);
    if (!coffee) {
      //   throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  @Post()
  //   @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: any) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.coffeesService.remove(id);
    // return this.coffeesService.findAll({});
  }
}
