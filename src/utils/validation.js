import * as yup from 'yup'
const phoneNumberRegex = /^\d{10,11}$/

export const createResidentValidation = yup.object().shape({
  email: yup
    .string()
    .required('Enter your email')
    .email('Enter a valid email address'),

  phoneNumber: yup
    .string()
    .required('Enter your phoneNumber')
    .matches(phoneNumberRegex, 'Please enter a valid phone number'),
})

export const updateResidentValidation = yup.object().shape({
  residentName: yup.string().required('Enter your name'),

  dateOfBirth: yup.string().required('Enter your date of birth'),

  street: yup.string().required('Select your street'),

  houseNumber: yup.string().required('Select your house number'),

  status: yup.string().required('Select your status'),

  gender: yup.string().required('Select your gender'),

  unitType: yup.string().required('Select your unit type'),
})

export const addDependantValidation = yup.object().shape({
  dependantName: yup.string().required('Enter your name'),

  dependantDateOfBirth: yup.string().required('Enter your date of birth'),

  gender: yup.string().required('Select your gender'),
})
