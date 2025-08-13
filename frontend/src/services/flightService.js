const API_URL = 'http://15.206.116.142:5000/api';


export const addFlight = async (flightData) => {
  console.log("sss",flightData)
  // const requestBody = {
  //   flightNumber: flightData.flightNumber.trim(),
  //   airline: flightData.airline.trim(),
  //   departureCity: flightData.from.trim(),
  //   arrivalCity: flightData.to.trim(),
  //   departureTime: flightData.departureTime,
  //   arrivalTime: flightData.arrivalTime,
  //   price: parseFloat(flightData.price),
  //   duration: "7h 30m",
  //   // seats: parseInt(flightData.seats, 10)
  // };
  
  const response = await fetch(`${API_URL}/flights/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // includes cookies for auth if needed
    body: JSON.stringify(flightData)
  });

  const responseText = await response.text();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    throw new Error('Failed to parse server response as JSON');
  }
};

export const viewFlights = async () => {
  const response = await fetch(`${API_URL}/flights/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // include cookies if required for auth/session
  });

  const responseText = await response.text();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    throw new Error('Failed to parse server response as JSON');
  }
};

export const getFlightById = async (id) => {
  const response = await fetch(`${API_URL}/flights/filter/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // include cookies if needed for auth
  });

  const responseText = await response.text();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    throw new Error('Failed to parse server response as JSON');
  }
};

export const updateFlightByFlightNumber = async (flightNumber, updatedData) => {
console.log("service",flightNumber , updatedData)
  const response = await fetch(`${API_URL}/flights/update/${flightNumber}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updatedData),
  });

  const responseText = await response.text();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    throw new Error('Failed to parse server response as JSON');
  }
};

export const deleteFlightByFlightNumber = async (flightNumber) => {
  const response = await fetch(`${API_URL}/flights/delete/${flightNumber}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Failed to delete flight. Status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
  }

  return { success: true, message: 'Flight deleted successfully' };
};

export const searchFlights = async (filters) => {
  const requestBody = {
    from: filters.from.trim(),
    to: filters.to.trim(),
  };

  const response = await fetch(`${API_URL}/flights/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(requestBody)
  });

  // Get response text first to check what we're receiving
  const responseText = await response.text();

  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Server returned non-JSON response. Status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
  }

  // Parse the JSON
  try {
    return JSON.parse(responseText);
  } catch (parseError) {
    throw new Error('Failed to parse server response as JSON');
  }
};

export const validateSearchFilters = (filters) => {
  if (!filters.from || !filters.to) {
    throw new Error('Please enter departure city and arrival city');
  }
  return true;
};
