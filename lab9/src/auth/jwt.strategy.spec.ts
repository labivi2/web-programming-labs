import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('should return the current user from payload', () => {
    const config = {
      getOrThrow: jest.fn().mockReturnValue('secret'),
    } as unknown as ConfigService;
    const strategy = new JwtStrategy(config);

    expect(
      strategy.validate({
        sub: 1,
        email: 'user@example.com',
      }),
    ).toEqual({
      id: 1,
      email: 'user@example.com',
    });
  });
});
