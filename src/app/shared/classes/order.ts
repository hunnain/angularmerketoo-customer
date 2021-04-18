// import { Product } from './product';


export interface OrderedProductDetail {
    productId?: string;
    name?: string;
}

export interface Order {
    orderId?: number;
    customerId?: string;
    total?: number;
    currency?: string;
    orderStatus?: string;
    paymentStatus?: string;
    paymentService?: string;
    creationDate?: Date;
    phone?: number;
    country?: string;
    city?: string;
    state?: string;
    address?: string;
    postalcode?: string;
    ifReturnExchangeRequested?: boolean;
    orderedProductDetails?: OrderedProductDetail[];
}
