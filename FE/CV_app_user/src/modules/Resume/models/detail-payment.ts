export class DetailOrderPayment {
    id: string = "";
    user_id: string = "";
    order_id: string = "";
    request_id: string = "";
    amount: number = 0;
    payment_method: number = 0;
    status: string = "";
    created_at: any = "";
    updated_at: any = "";
    user: any = {
        username: "",
        id: ""
    };
    order: any = {
        id: "",
        user_id: "",
        coupon_id: "",
        coupon_discount_vnd: 0,
        total_price: 0,
        status: "",
        created_at: "",
        updated_at: "",
        coupon: "",
        order_item: [{
            id: "",
            order_id: "",
            product_id: "",
            quantity: 0,
            price_each: 0,
            created_at: '',
            updated_at: '',
            product: {
                id: "",
                cart_item_id: "",
                productable_type: "",
                productable_id: 0,
                order_id: "",
                name: ""
            }
        }],
    }
}
