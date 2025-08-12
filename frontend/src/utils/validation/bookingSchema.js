import * as Yup from 'yup';

const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  passengers: Yup.number()
    .required('Number of passengers is required')
    .min(1, 'At least 1 passenger is required')
    .max(10, 'Maximum 10 passengers allowed')
});

export default bookingSchema;
