import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { DatabaseService } from 'src/config/database/database.service'

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.databaseService.product.create({
      data: { ...createProductDto },
    })
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    sortBy: 'title' | 'price' = 'title',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * pageSize
    const take = pageSize
    return await this.databaseService.product.findMany({
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    })
  }

  async findOne(id: string) {
    return await this.databaseService.product.findFirst({ where: { id } })
  }

  async findByFilterBy(
    filter: string,
    page: number = 1,
    pageSize: number = 10,
    sortBy: 'title' | 'price' = 'title',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    if (!filter)
      throw new BadRequestException(
        'Unsupported filter expression: empty filter expression',
      )

    const [key, condition, value] = filter.split(' ')

    if (!key || !condition || !value)
      throw new BadRequestException(
        'Unsupported filter expression: length more than 3',
      )

    const filterConditions: { [key: string]: any } = {
      co: { contains: value }, // Contains
      sw: { startsWith: value }, // Starts with
      ew: { endsWith: value }, // Ends with
      gt: { gt: parseFloat(value) }, // Greater than
      lt: { lt: parseFloat(value) }, // Less than
      lte: { lte: parseFloat(value) }, // Less than equal to
      gte: { gte: parseFloat(value) }, // Greater than equal to
    }

    if (!filterConditions[condition])
      throw new BadRequestException(
        `Unsupported filter condition: ${condition}`,
      )

    const whereClause = {
      [key]: filterConditions[condition],
    }

    const skip = (page - 1) * pageSize
    const take = pageSize

    return await this.databaseService.product.findMany({
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      where: whereClause,
    })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
    })
    if (!product)
      throw new NotFoundException(`Could not find product with id: ${id}`)

    return await this.databaseService.product.update({
      where: { id },
      data: { ...updateProductDto },
    })
  }

  async remove(id: string) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
    })
    if (!product)
      throw new NotFoundException(`Could not find product with id: ${id}`)

    await this.databaseService.product.delete({ where: { id } })

    return { message: `Product with ${id} deleted successfully` }
  }
}
