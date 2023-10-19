import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { AuthGuard } from '@nestjs/passport';
import { GetProductsDto } from './dto/product.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({ status: 200, type: GetProductsDto })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  // getAll(@Req() request: Request, @Query('params') params: string) {
  getAll(@Req() request: Request) {
    return this.productService.getAllProducts(request);
  }

  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto);
  }
}
