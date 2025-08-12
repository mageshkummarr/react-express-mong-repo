import bookingSchema from "../../utils/validation/bookingSchema";

test("validates booking form with correct data", async () => {
  const validData = { name: "John", email: "john@example.com", passengers: 2 };
  await expect(bookingSchema.validate(validData)).resolves.toBe(validData);
});

test("fails validation with invalid email", async () => {
  const invalidData = { name: "John", email: "invalid-email", passengers: 2 };
  await expect(bookingSchema.validate(invalidData)).rejects.toThrow("Invalid email");
});

test("fails validation when passengers less than 1", async () => {
  const invalidData = { name: "John", email: "john@example.com", passengers: 0 };
  await expect(bookingSchema.validate(invalidData)).rejects.toThrow("At least 1 passenger required");
});