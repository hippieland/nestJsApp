import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserModel } from '../model/user.model';
import { Document, Model } from 'mongoose';

const mockUserModel = {
  find: jest.fn(),
  findById: jest.fn(),
  exec: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, 
        {
        provide: getModelToken(User.name),
        useValue: mockUserModel,
      },],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all users', async () => {
    const createUserInstance = (userData: Partial<User>): Document & User => {
      return {
        _id: '1',
        ...userData,
      } as unknown as Document & User;
    };
  
    const user1 = createUserInstance({ name: 'Stefany Sanchez', email: 'ssanchez@gmail.com' });
    const user2 = createUserInstance({ name: 'Pepito Perez', email: 'pperez@gmail.com' });
    
    mockUserModel.find.mockReturnThis();  
    mockUserModel.exec.mockResolvedValueOnce([user1, user2]);

    jest.clearAllMocks();

    const users = await service.findAll();
  
    expect(users).toEqual([user1, user2]);
  
    expect(mockUserModel.find).toHaveBeenCalledTimes(1);
  });

  it('should find a user by ID', async () => {
    const userId = '1';
    const user = { _id: userId, name: 'Stefany Sanchez', email: 'ssanchez@gmail.com' };

    mockUserModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(user) } as unknown as Model<User>);

    const foundUser = await service.findOneById(userId);

    expect(foundUser).toEqual(user);
    expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
    expect(mockUserModel.findById).toHaveBeenCalledTimes(1);
  });

  it('should return null if user is not found', async () => {
    const userId = '2';

    mockUserModel.findById.mockReturnValueOnce({ exec: jest.fn().mockResolvedValueOnce(null) } as unknown as Model<User>);

    const foundUser = await service.findOneById(userId);

    expect(foundUser).toBeNull();
    expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
    expect(mockUserModel.findById).toHaveBeenCalledTimes(1);
  });

});

