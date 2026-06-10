import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    usersService = module.get(UsersService);
  });

  it('should register a user without returning password', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    usersService.create.mockImplementation(async (email, password) => ({
      id: 1,
      email,
      password,
      createdAt: new Date(),
    }));

    const result = await service.register({
      email: 'user@example.com',
      password: 'secret123',
    });

    const createdPassword = usersService.create.mock.calls[0][1];

    expect(await bcrypt.compare('secret123', createdPassword)).toBe(true);
    expect(result).not.toHaveProperty('password');
  });

  it('should reject an existing email', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      password: 'hash',
      createdAt: new Date(),
    });

    await expect(
      service.register({
        email: 'user@example.com',
        password: 'secret123',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
