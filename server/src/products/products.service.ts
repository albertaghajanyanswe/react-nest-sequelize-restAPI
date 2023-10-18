import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/shared/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product) {}

  async createProduct(dto: CreateProductDto) {
    const product = await this.productRepository.create(dto);
    return product;
  }

  async getProductById(name: string) {
    const product = await this.productRepository.findOne({ where: { name } });
    return product;
  }

  async getProductByUserId(userId: string) {
    const product = await this.productRepository.findOne({ where: { userId } });
    return product;
  }

  async getProduct(payload) {
    const product = await this.productRepository.findOne({ where: payload });
    return product;
  }
}
