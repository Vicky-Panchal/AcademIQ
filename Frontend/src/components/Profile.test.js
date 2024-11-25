import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import '@testing-library/jest-dom'; // for custom matchers


// Mocking NavBar component
jest.mock("./NavBar", () => ({ user, setUser }) => (
  <div data-testid="navbar">Mock NavBar</div>
));

describe("Profile Component", () => {
  beforeEach(() => {
    // Set a mock localStorage item before each test
    const mockUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      address: "123 Main St, City, Country",
    };
    window.localStorage.setItem("loggedInUser", JSON.stringify(mockUser));
  });

  afterEach(() => {
    // Clear localStorage after each test
    window.localStorage.clear();
  });

  it("renders the Profile component and displays user details", () => {
    render(<Profile />);

    // Check if the component renders the NavBar
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // Check if user details are displayed
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City, Country")).toBeInTheDocument();
  });

  it("switches to edit mode and updates user details", () => {
    render(<Profile />);

    // Click the "Edit Profile" button
    fireEvent.click(screen.getByText("Edit Profile"));

    // Check if input fields are displayed for editing
    const nameInput = screen.getByDisplayValue("John Doe");
    const addressInput = screen.getByDisplayValue("123 Main St, City, Country");

    expect(nameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();

    // Update the name and address fields
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(addressInput, { target: { value: "456 Elm St, Another City, Country" } });

    // Click the "Save Profile" button
    fireEvent.click(screen.getByText("Save Profile"));

    // Check if updated values are displayed
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("456 Elm St, Another City, Country")).toBeInTheDocument();
  });

  it("logs out the user", () => {
    render(<Profile />);

    // Mock the console log
    const consoleSpy = jest.spyOn(console, "log");

    // Click the "Log Out" button
    fireEvent.click(screen.getByText("Log Out"));

    // Check if logout logic is executed
    expect(consoleSpy).toHaveBeenCalledWith("Logged out");

    // Clean up
    consoleSpy.mockRestore();
  });
});
