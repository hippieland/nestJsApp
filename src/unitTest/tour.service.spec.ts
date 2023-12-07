import { Test, TestingModule } from '@nestjs/testing';
import { TourService } from '../service/tour.service';
import { Document, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Tour, TourModel } from '../model/tour.model'

const mockTourModel = {
  find: jest.fn(),
  findById: jest.fn(),
  exec: jest.fn(),
};

describe('TourService', () => {
  let service: TourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourService, 
        {provide: getModelToken(Tour.name),
        useValue: mockTourModel,},],
    }).compile();

    service = module.get<TourService>(TourService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all tours', async () => {
    const createTourInstance = (tourData: Partial<Tour>): Document & Tour => {
      return {
        _id: '1',
        ...tourData,
      } as unknown as Document & Tour;
    };

    const tour1 = createTourInstance({ name: 'Tour 1', price: 15000, category: "cat 1", description: "desc 1", level: "level 1", meals: "meals 1", transport: "car", hosting: "lodge", groupSize: "6 pax", image: "" });
    const tour2 = createTourInstance({ name: 'Tour 2', price: 15000, category: "cat 2", description: "desc 2", level: "level 2", meals: "meals 2", transport: "car", hosting: "lodge", groupSize: "6 pax", image: "" });
    
    mockTourModel.find.mockReturnThis();  
    mockTourModel.exec.mockResolvedValueOnce([tour1, tour2]);

    jest.clearAllMocks();

    const tours = await service.findAll();
  
    expect(tours).toEqual([tour1, tour2]);
  
    expect(mockTourModel.find).toHaveBeenCalledTimes(1);
  });

  it('should find a tour by ID', async () => {
    const tourId = '1';
    const tour = { _id: tourId, name: 'Tour 1',  price: 15000, category: "cat 1", description: "desc 1", level: "level 1", meals: "meals 1", transport: "car", hosting: "lodge", groupSize: "6 pax", image: "" };

    mockTourModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(tour) } as unknown as Model<Tour>);

    const foundTour = await service.findOneById(tourId);

    expect(foundTour).toEqual(tour);
    expect(mockTourModel.findById).toHaveBeenCalledWith(tourId);
    expect(mockTourModel.findById).toHaveBeenCalledTimes(1);
  });

  it('should return null if tour is not found', async () => {
    const tourId = '2';

    mockTourModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) } as unknown as Model<Tour>);

    const foundTour = await service.findOneById(tourId);

    expect(foundTour).toBeNull();
    expect(mockTourModel.findById).toHaveBeenCalledWith(tourId);
    expect(mockTourModel.findById).toHaveBeenCalledTimes(1);
  });

});
