export interface PaymentItem {
  id: string;
  userId: string;
  bookingId: string | null;
  amount: string;
  description: string;
  status: "pending" | "completed" | string;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentsResponse {
  data: PaymentItem[];
  totalCount: number;
}
