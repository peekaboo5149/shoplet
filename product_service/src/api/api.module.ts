import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [HealthModule, ProductsModule, CategoriesModule]
})
export class ApiModule {}
