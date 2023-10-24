import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FavoriteProduct } from 'src/favoriteProducts/favoriteProducts.model';
import { CollectPayloadService } from 'src/payloadHelper/collectPayload.service';
import { ProductImage } from 'src/productImages/productsImage.model';
import { PRODUCT_REPOSITORY } from 'src/shared/constants';
import { User } from 'src/users/users.model';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto, ProductDto } from './dto/product.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: typeof Product,
    private readonly collectPayload: CollectPayloadService,
  ) { }

  async createProduct(dto: CreateProductDto) {
    const product = await this.productRepository.create(dto);
    return product;
  }

  async updateProduct(dto: Partial<CreateProductDto>, id: number): Promise<Product> {
    await this.productRepository.update(dto, { where: { id } });
    return this.productRepository.findOne<Product>({
      where: { id },
      include: [
        {
          model: ProductImage,
          attributes: ['id', 'name', 'productId'],
        },
      ],
    });
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
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
    console.log('payload = ', payload);
    payload.include = [
      {
        model: ProductImage,
        attributes: ['id', 'name', 'productId'],
      },
      {
        model: User,
        include: [
          {
            model: FavoriteProduct,
            through: { attributes: ['id', 'userId', 'favoriteProductId'] },
            // attributes: ['id', 'name', 'productId'],
          },
        ],
        // attributes: ['id', 'name', 'productId'],
      },
    ];
    const { rows, count } = await this.productRepository.findAndCountAll(payload);
    return { count: count, data: rows };
  }
}
