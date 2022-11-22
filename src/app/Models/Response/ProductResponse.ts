import { ProductImageResponse } from "./ProductImageResponse";

export interface ProductResponse {
    productId: number;
    categoryId: number;
    productName: string;
    productImages: ProductImageResponse[];
    category: string;
    price: string;
    quantity: number;
    supplierName: string;
    author: string;
    translator: string;
    nameOfPublisher: string;
    yearOfPublication: number;
    weight: number;
    size: string;
    numberOfPages: number;
    description: string;
    isActive: boolean;
    isAvailable: boolean;
}