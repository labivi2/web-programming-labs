import { ConflictException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

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
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
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

  it('should return an access token for valid credentials', async () => {
    const password = await bcrypt.hash('secret123', 10);
    usersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      password,
      createdAt: new Date(),
    });
    jwtService.signAsync.mockResolvedValue('token');

    await expect(
      service.login({
        email: 'user@example.com',
        password: 'secret123',
      }),
    ).resolves.toEqual({ access_token: 'token' });
  });

  it('should reject invalid credentials', async () => {
    const password = await bcrypt.hash('secret123', 10);
    usersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      password,
      createdAt: new Date(),
    });

    await expect(
      service.login({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);

    usersService.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({
        email: 'missing@example.com',
        password: 'secret123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
