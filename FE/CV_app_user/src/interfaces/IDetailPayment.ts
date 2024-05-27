export interface IDetailPayment {
    id?: string;
    user_id?: string;
    order_id?: string;
    request_id?: string;
    amount?: number;
    payment_method?: number;
    status?: string;
    created_by?: any;
    updated_by?: any;
    order?: IOrder
}

export interface IOrder {
    id?: string;
    user_id?: string;
    coupon_id?: string;
    coupon_discount_vnd?: number;
    total_price?: number;
    status?: string;
    created_by?: any;
    updated_by?: any;
    coupon?: any;
    order_item?: Array<IOrderItem>
}

export interface IOrderItem {
    id?: string;
    order_id?: string;
    product_id?: string;
    quantity?: number;
    price_each?: number;
    created_by?: any;
    updated_by?: any;
    product?: IProduct
}

export interface IProduct {
    id?: string;
    cart_item_id?: string;
    productable_type?: any;
    productable_id?: number;
    order_id?: string
}
