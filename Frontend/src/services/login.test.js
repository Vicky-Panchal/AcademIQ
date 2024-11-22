import { post } from 'axios';
import { login } from './login';

jest.mock('axios'); // Mock the axios library

describe('loginService', () => {
  it('sends a POST request with credentials and returns data', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { data: { token: 'mockToken', user: { id: 1, name: 'Test User' } } };

    post.mockResolvedValueOnce(mockResponse);

    const result = await login(mockCredentials);

    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith('/api/v1/auth/authenticate', mockCredentials);
    expect(result).toEqual(mockResponse.data);
  });

  it('throws an error if the request fails', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'wrongpassword' };

    post.mockRejectedValueOnce(new Error('Invalid credentials'));

    await expect(login(mockCredentials)).rejects.toThrow('Invalid credentials');
  });
});
