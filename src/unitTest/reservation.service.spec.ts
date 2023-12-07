import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../service/reservation.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reservation, ReservationModel } from '../model/reservation.model';
import { Document, Model } from 'mongoose';

const mockReservationModel = {
  find: jest.fn(),
  findById: jest.fn(),
  exec: jest.fn(),
};

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService, 
        {
        provide: getModelToken(Reservation.name),
        useValue: mockReservationModel,
      },],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all reservations', async () => {
    const createReservationInstance = (reservationData: Partial<Reservation>): Document & Reservation => {
      return {
        _id: '1',
        ...reservationData,
      } as unknown as Document & Reservation;
    };
  
    const reservation1 = createReservationInstance({ userId: '123456789', tourId: '789456123', pax: 6, totalPrice: 150000, date: "04/12/2023" });
    const reservation2 = createReservationInstance({ userId: '254654655', tourId: '587456165', pax: 4, totalPrice: 100000, date: "04/12/2023" });
    
    mockReservationModel.find.mockReturnThis();  
    mockReservationModel.exec.mockResolvedValueOnce([reservation1, reservation2]);

    jest.clearAllMocks();

    const reservations = await service.findAll();
  
    expect(reservations).toEqual([reservation1, reservation2]);
  
    expect(mockReservationModel.find).toHaveBeenCalledTimes(1);
  });

  it('should find a reservation by ID', async () => {
    const reservationId = '1';
    const reservation = { _id: reservationId, name: 'Stefany Sanchez', email: 'ssanchez@gmail.com' };

    mockReservationModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(reservation) } as unknown as Model<Reservation>);

    const foundReservation = await service.findOneById(reservationId);

    expect(foundReservation).toEqual(reservation);
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId);
    expect(mockReservationModel.findById).toHaveBeenCalledTimes(1);
  });

  it('should return null if reservation is not found', async () => {
    const reservationId = '2';

    mockReservationModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) } as unknown as Model<Reservation>);

    const foundReservation = await service.findOneById(reservationId);

    expect(foundReservation).toBeNull();
    expect(mockReservationModel.findById).toHaveBeenCalledWith(reservationId);
    expect(mockReservationModel.findById).toHaveBeenCalledTimes(1);
  });

});

