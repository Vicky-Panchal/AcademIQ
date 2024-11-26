import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Salary from "./Salary";
import '@testing-library/jest-dom'; // for custom matchers


// Mock Data
const mockUser = {
  access_token: "mockAccessToken",
};

const mockSalaryDetails = {
  employeeName: "John Doe",
  paymentDate: "2023-11-26",
  totalSalary: 50000,
  description: "Monthly Salary",
  netSalary: 41000,
  history: [
    { paymentDate: "2023-10-26T00:00:00.000Z", amount: 49000 },
    { paymentDate: "2023-10-27T00:00:00.000Z", amount: 50000 },
  ],
};

// Mocking global fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockSalaryDetails),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Salary Component", () => {
//   it("renders salary details correctly", async () => {
//     render(<Salary user={mockUser} />);

//     expect(await screen.findByText(/Name: John Doe/i)).toBeInTheDocument();
//     expect(await screen.findByText(/Payment Date: 2023-11-26/i)).toBeInTheDocument();
//     expect(await screen.findByText(/₹50000/i)).toBeInTheDocument();
//     expect(await screen.findByText(/₹41000/i)).toBeInTheDocument();
//   });

  it("renders salary history correctly", async () => {
    render(<Salary user={mockUser} />);

    const historyItems = await screen.findAllByRole("listitem");
    expect(historyItems.length).toBe(2);

    expect(historyItems[0]).toHaveTextContent("10/26/2023");
    expect(historyItems[0]).toHaveTextContent("Amount: ₹49000");
    expect(historyItems[1]).toHaveTextContent("10/27/2023");
    expect(historyItems[1]).toHaveTextContent("Amount: ₹50000");
  });

  it("shows error when user is not authenticated", async () => {
    render(<Salary user={null} />);

    await waitFor(() =>
      expect(screen.getByText(/Error: User not authenticated/i)).toBeInTheDocument()
    );
  });
});
