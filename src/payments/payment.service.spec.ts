import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Payment, PaymentModel } from './payment.model';
import { Document, Model } from 'mongoose';

const mockPaymentModel = {
  find: jest.fn(),
  findById: jest.fn(),
  exec: jest.fn(),
};

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, 
        {
        provide: getModelToken(Payment.name),
        useValue: mockPaymentModel,
      },],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all payments', async () => {
    const createPaymentInstance = (paymentData: Partial<Payment>): Document & Payment => {
      return {
        _id: '1',
        ...paymentData,
      } as unknown as Document & Payment;
    };
  
    const payment1 = createPaymentInstance({ date: '04/12/2023', reservationId: '54694321564', paymentMethod: 'Cash', totalPaid: '1500000' });
    const payment2 = createPaymentInstance({ date: '04/12/2023', reservationId: '57984546545', paymentMethod: 'Cash', totalPaid: '1000000' });
    
    mockPaymentModel.find.mockReturnThis();  
    mockPaymentModel.exec.mockResolvedValueOnce([payment1, payment2]);

    jest.clearAllMocks();

    const payments = await service.findAll();
  
    expect(payments).toEqual([payment1, payment2]);
  
    expect(mockPaymentModel.find).toHaveBeenCalledTimes(1);
  });

  it('should find a payment by ID', async () => {
    const paymentId = '1';
    const payment = { _id: paymentId, name: 'Stefany Sanchez', email: 'ssanchez@gmail.com' };

    mockPaymentModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(payment) } as unknown as Model<Payment>);

    const foundPayment = await service.findOneById(paymentId);

    expect(foundPayment).toEqual(payment);
    expect(mockPaymentModel.findById).toHaveBeenCalledWith(paymentId);
    expect(mockPaymentModel.findById).toHaveBeenCalledTimes(1);
  });

  it('should return null if payment is not found', async () => {
    const paymentId = '2';

    mockPaymentModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) } as unknown as Model<Payment>);

    const foundPayment = await service.findOneById(paymentId);

    expect(foundPayment).toBeNull();
    expect(mockPaymentModel.findById).toHaveBeenCalledWith(paymentId);
    expect(mockPaymentModel.findById).toHaveBeenCalledTimes(1);
  });

});

