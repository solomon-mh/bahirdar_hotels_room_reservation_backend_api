import { IPayment } from '../interfaces/payment.interface';
import PaymentModel from '../payment.model';

export class PaymentService {
  // find all
  async findAll() {
    const payments = PaymentModel.find();
    return payments;
  }
  // find one by id
  async findOneById(id: string) {
    const payment = PaymentModel.findById(id);
    return payment;
  }
  // create one
  async createPayment(createPaymentDto: IPayment) {
    const payment = await PaymentModel.create(createPaymentDto);
    return payment;
  }
  // update one
  async updatePayment(id: string, createPaymentDto: Partial<IPayment>) {
    const payment = await PaymentModel.findByIdAndUpdate(id, createPaymentDto, {
      new: true,
    });
    return payment;
  }

  // delete one
  async deleteOne(id: string) {
    const payment = PaymentModel.findByIdAndDelete(id);
    return payment;
  }
  // find one
  async findOne(filter: Partial<IPayment>) {
    const payment = await PaymentModel.findOne(filter);
    return payment;
  }
}
