// src/validation/validationSchemas.ts
import * as Yup from 'yup';

const usernameSchema = Yup.string()
  .min(2, 'Username must be at least 2 characters')
  .max(50, 'Username cannot be longer than 50 characters')
  .required('Username is required');

const nameSchema = Yup.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name cannot be longer than 50 characters')
  .required('Name is required');

const emailSchema = Yup.string().email('Invalid email address').required('Email is required');

const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password cannot be longer than 50 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/\d/, 'Password must contain at least one digit')
  .required('Password is required');

const deliveryMethodSchema = Yup.string().required('Delivery method is required');

const paymentMethodSchema = Yup.string().required('Payment method is required');

const orderCommentsSchema = Yup.string().optional();

const messageSchema = Yup.string().required('Message is required');

const phoneSchema = Yup.string()
  .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
  .required('Phone number is required');

const addressSchema = Yup.string()
  .required('Address is required')
  .min(5, 'Address must be at least 5 characters')
  .max(100, 'Address cannot be longer than 100 characters');

const eircodeSchema = Yup.string()
  .required('Postal code is required')
  .matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Invalid postal code');

export {
  usernameSchema,
  nameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  addressSchema,
  eircodeSchema,
  deliveryMethodSchema,
  paymentMethodSchema,
  orderCommentsSchema,
  messageSchema,
};
