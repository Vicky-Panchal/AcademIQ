import axios from 'axios';
import loginService from './login';

jest.mock("axios", () => ({
  post: jest.fn(), // Mock the post method
}));

describe('loginService', () => {
  it('sends a POST request with credentials and returns data', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { data: { token: 'mockToken', user: { id: 1, name: 'Test User' } } };

    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await loginService.login(mockCredentials);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/v1/auth/authenticate', mockCredentials);
    expect(result).toEqual(mockResponse.data);
  });

  it('throws an error if the request fails', async () => {
    const mockCredentials = { email: 'test@example.com', password: 'wrongpassword' };

    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    await expect(loginService.login(mockCredentials)).rejects.toThrow('Invalid credentials');
  });
});
