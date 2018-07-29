export class Product {
  id: number;
  sku: number;
  name: string;
  price: number;
  mrp: number;
  description: string;
  packing: string;
  imag: string;
  catgory: number;
  stock: number;
  status: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
