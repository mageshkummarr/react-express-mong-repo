import {
  addFlight,
  viewFlights,
  updateFlightByFlightNumber,
  deleteFlightByFlightNumber,
} from './flightService';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
global.fetch = jest.fn();

afterEach(() => {
  fetch.mockClear();
});
import Cookies from 'js-cookie';

// Mock js-cookie
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

const renderWithContext = (role = '', auth = null) => {
  Cookies.get.mockReturnValue(role);

  render(
    <AuthContext.Provider value={{ auth, logout: jest.fn() }}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};
test('adds a flight successfully', async () => {
  const mockFlight = {
    flightNumber: 'AI202',
    airline: 'Air India',
    from: 'Delhi',
    to: 'Mumbai',
    departureTime: '2025-08-01T10:00',
    arrivalTime: '2025-08-01T13:00',
    price: 4999
  };

  const mockResponse = { success: true, message: 'Flight added' };
  fetch.mockResolvedValueOnce({
    ok: true,
    headers: { get: () => 'application/json' },
    text: async () => JSON.stringify(mockResponse),
  });

  const result = await addFlight(mockFlight);
  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/flights/add'), expect.objectContaining({
    method: 'POST',
  }));
});

test('fetches all flights successfully', async () => {
  const mockFlights = [
    { flightNumber: 'AI101', airline: 'Air India' },
    { flightNumber: 'IND505', airline: 'Indigo' },
  ];

  fetch.mockResolvedValueOnce({
    ok: true,
    headers: { get: () => 'application/json' },
    text: async () => JSON.stringify(mockFlights),
  });

  const result = await viewFlights();
  expect(result).toEqual(mockFlights);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/flights/all'), expect.any(Object));
});

test('updates flight by flight number successfully', async () => {
  const flightNumber = 'AI202';
  const updatedData = { price: 6999 };

  const mockResponse = { success: true, message: 'Flight updated' };
  fetch.mockResolvedValueOnce({
    ok: true,
    headers: { get: () => 'application/json' },
    text: async () => JSON.stringify(mockResponse),
  });

  const result = await updateFlightByFlightNumber(flightNumber, updatedData);
  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/flights/update/${flightNumber}`), expect.objectContaining({
    method: 'PUT',
  }));
});

test('deletes flight by flight number successfully', async () => {
  const flightNumber = 'AI202';

  fetch.mockResolvedValueOnce({
    ok: true,
    text: async () => '',
    headers: { get: () => 'application/json' },
  });

  const result = await deleteFlightByFlightNumber(flightNumber);
  expect(result).toEqual({ success: true, message: 'Flight deleted successfully' });
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/flights/delete/${flightNumber}`), expect.objectContaining({
    method: 'DELETE',
  }));
});
test('renders Search Flights button for user role', () => {
  renderWithContext('user', { name: 'Test User' });

  expect(screen.getByText(/search flights/i)).toBeTruthy();
  expect(screen.queryByText(/manage flights/i)).toBeNull(); // should not appear
});
test('renders Manage Flights button for admin role', () => {
  renderWithContext('admin', { name: 'Admin User' });

  expect(screen.getByText(/manage flights/i)).toBeTruthy();
  expect(screen.queryByText(/search flights/i)).toBeNull(); // should not appear
});
