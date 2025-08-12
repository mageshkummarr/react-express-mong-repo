import { renderHook, act } from "@testing-library/react";
import { FlightProvider } from "../../context/FlightContext";
import useFlightSearch from "../../hooks/useFlightSearch";

test("searches for a flight by ID successfully", () => {
  const wrapper = ({ children }) => <FlightProvider>{children}</FlightProvider>;
  const { result } = renderHook(() => useFlightSearch(), { wrapper });

  act(() => {
    result.current.searchFlight("F101");
  });

  expect(result.current.result).toEqual({ id: "F101", airline: "IndiGo", destination: "Delhi" });
});

test("returns not-found when flight ID is invalid", () => {
  const wrapper = ({ children }) => <FlightProvider>{children}</FlightProvider>;
  const { result } = renderHook(() => useFlightSearch(), { wrapper });

  act(() => {
    result.current.searchFlight("XYZ");
  });

  expect(result.current.result).toBe("not-found");
});