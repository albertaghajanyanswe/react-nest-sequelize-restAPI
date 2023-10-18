export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly currency: string;
  readonly province: string;
  readonly city: string;
  readonly address: string;
  readonly categoryId: string;
  readonly otherInfo: string;
}
