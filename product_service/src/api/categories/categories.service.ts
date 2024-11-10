import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DatabaseService } from 'src/config/database/database.service'

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.databaseService.category.findFirst({
      where: { label: createCategoryDto.label },
    })
    if (category) throw new ConflictException('Category already exist')

    return await this.databaseService.category.create({
      data: { ...createCategoryDto },
    })
  }

  async findAll(
    filter?: string,
    page: number = 1,
    pageSize: number = 10,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const sortBy = 'label'
    let whereClause = null
    if (filter) {
      const [key, condition, value] = filter.split(' ')
      if (!key || !condition || !value)
        throw new BadRequestException(
          'Unsupported filter expression: length more than 3',
        )

      const filterConditions: { [key: string]: any } = {
        co: { contains: value }, // Contains
        sw: { startsWith: value }, // Starts with
        ew: { endsWith: value }, // Ends with
      }

      if (!filterConditions[condition])
        throw new BadRequestException(
          `Unsupported filter condition: ${condition}`,
        )

      whereClause = {
        [key]: filterConditions[condition],
      }
    }

    const skip = (page - 1) * pageSize
    const take = pageSize

    if (whereClause)
      return await this.databaseService.category.findMany({
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        where: whereClause,
      })
    else
      return await this.databaseService.category.findMany({
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
      })
  }

  findOne(id: string) {
    return this.databaseService.category.findUnique({ where: { id } })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!(await this.findOne(id)))
      throw new NotFoundException(`Category with ${id} does not exist`)

    return await this.databaseService.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    })
  }

  async remove(id: string) {
    if (!(await this.findOne(id)))
      throw new NotFoundException(`Category with ${id} does not exist`)

    await this.databaseService.category.delete({ where: { id } })

    return { message: `Category with ${id} deleted successfully` }
  }
}
