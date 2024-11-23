import * as yup from 'yup'

export const newJobSchema = yup.object().shape({
  title: yup.string().required('Job title is required.'),
  company: yup.string().required('Company name is required.'),
  location: yup.string().required('Job location is required.'),
  employmentType: yup.string().required('Employment type is required.'),
  salary: yup.string(),
  summary: yup.string().required('Job summary is required.'),
  responsibilities: yup
    .array()
    .of(yup.string().required('Each responsibility must be a valid string.'))
    .min(1, 'At least one responsibility is required.'),
  requirements: yup
    .array()
    .of(yup.string().required('Each requirement must be a valid string.'))
    .min(1, 'At least one requirement is required.'),
  educationLevel: yup.string().required('Education level is required.'),
  aboutCompany: yup
    .string()
    .required('Information about the company is required.'),
  benefits: yup
    .array()
    .of(yup.string().required('Each benefit must be a valid string.'))
    .min(1, 'At least one benefit is required.'),
  applicationDeadline: yup
    .date()
    .required('Application deadline is required.')
    .typeError('Application deadline must be a valid date.'),
  contactEmail: yup
    .string()
    .required('Contact email is required.')
    .email('Please provide a valid email address.'),
})
