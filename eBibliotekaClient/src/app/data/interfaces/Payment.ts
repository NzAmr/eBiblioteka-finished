export class PaymentListVM {
  id: number;
  reason: string;
  amount: number;
  paymentMethod: string;
  timeOfPayment: Date;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.reason = 'Učitavanje...';
    this.amount = -1;
    this.paymentMethod = 'Učitavanje...';
    this.timeOfPayment = new Date();
  }
}
