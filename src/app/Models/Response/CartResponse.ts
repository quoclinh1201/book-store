import { CartItemResponse } from "./CartItemResponse";

export interface CartResponse {
    cartItems: CartItemResponse[];
    totalPrice: string;
}