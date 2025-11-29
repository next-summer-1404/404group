export interface PaymentType {
  id: number;
  userId: number;
  bookingId: number;
  amount: number;
  description: string;
  status: "pending" | "paid" | "failed";
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentsResponse {
  payments: PaymentType[];
  totalCount: number;
}
