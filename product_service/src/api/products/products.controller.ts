import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('filter') filter: string = '',
    @Query('sortBy') sortBy: 'title' | 'price' = 'title',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const _pageSize = pageSize + 1
    let datum: unknown[] = []
    if (filter === '')
      datum = await this.productsService.findAll(
        page,
        _pageSize,
        sortBy,
        sortOrder,
      )
    else
      datum = await this.productsService.findByFilterBy(
        filter,
        page,
        _pageSize,
        sortBy,
        sortOrder,
      )

    const hasNext = _pageSize === datum.length
    return {
      data: [...datum],
      _meta: {
        page: page,
        pageSize: pageSize,
        hasNext: hasNext,
      },
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
