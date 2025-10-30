export declare class CreatePaymentDto {
    id: string;
    booking_id: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    transaction_id?: string;
    paid_at: Date;
    created_at: Date;
}
