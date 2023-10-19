import { Inject, Injectable } from '@nestjs/common';
import { CollectPayloadService } from 'src/payloadHelper/collectPayload.service';
import { ProductImage } from 'src/productImages/productsImage.model';
import { PRODUCT_REPOSITORY } from 'src/shared/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    private readonly collectPayload: CollectPayloadService,
  ) {}

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

  async getAllProducts(req: Request): Promise<GetProductsDto> {
    const payload = this.collectPayload.getListPayload(req);
    payload.include = [
      {
        model: ProductImage,
        attributes: ['id', 'name', 'productId'],
      },
    ];
    const { rows, count } = await this.productRepository.findAndCountAll(payload);
    return { count: count, data: rows };
  }
}
