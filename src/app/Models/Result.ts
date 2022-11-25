import { CustomError } from "./CustomError";

export interface Result<T> {
    content: T;
    error: CustomError;
    isSuccess: boolean;
}