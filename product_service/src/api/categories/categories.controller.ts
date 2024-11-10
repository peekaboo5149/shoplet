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
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('filter') filter: string = '',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const _pageSize = pageSize + 1
    const datum: unknown[] = await this.categoriesService.findAll(
      filter,
      page,
      _pageSize,
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
    return this.categoriesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id)
  }
}
