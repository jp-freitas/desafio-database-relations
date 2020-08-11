import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer does not exists');
    }

    const existInProducts = await this.productsRepository.findAllById(products);

    if (!existInProducts) {
      throw new AppError('There are no products registered with the given ID');
    }

    const existInProductsIds = existInProducts.map(product => {
      return product.id;
    });

    const inexistentProducts = products.filter(product => {
      return !existInProductsIds.includes(product.id);
    });

    if (inexistentProducts.length) {
      throw new AppError(`Could not find product ${inexistentProducts[0].id}`);
    }

    const checkExistentProductsQuantity = products.filter(
      product =>
        existInProducts.filter(p => p.id === product.id)[0].quantity <=
        product.quantity,
    );

    if (checkExistentProductsQuantity.length) {
      throw new AppError(
        `The quantity ${checkExistentProductsQuantity[0].quantity} is not available for ${checkExistentProductsQuantity[0].id}`,
      );
    }

    const formattedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existInProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer,
      products: formattedProducts,
    });

    const { order_products } = order;

    const orderedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existInProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
