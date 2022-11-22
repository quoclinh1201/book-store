import { DeliveryInformaionResponse } from "./DeliveryInformaionResponse";
import { OrderDetailResponse } from "./OrderDetailResponse";


export interface OrderResponse {
    orderId: number;
    deliveryInformaion: DeliveryInformaionResponse;
    createDate: string;
    totalPrice: string;
    paymentMethod: string;
    status: string;
    orderDetail: OrderDetailResponse[];
}