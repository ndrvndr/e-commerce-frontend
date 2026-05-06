import z from 'zod';

export const AddressSchema = z.object({
  country: z.string('Country is required'),
  first_name: z
    .string('First name is required')
    .min(1, 'First name is required'),
  last_name: z.string('Last name is required').min(1, 'Last name is required'),
  address: z.string('Address is required').min(1, 'Address is required'),
  note: z.string().optional(),
  city: z.string('City is required').min(1, 'City is required'),
  province: z.string('Province is required').min(1, 'Province is required'),
  postal_code: z
    .number({ message: 'Postal code must be a number' })
    .refine((val) => val !== undefined && val !== null, {
      message: 'Postal code is required',
    })
    .refine((val) => val.toString().length >= 3, {
      message: 'Postal code must be at least 3 digits',
    }),
  phone_number: z
    .string('Phone number is required')
    .min(1, 'Phone number is required'),
  is_default: z.boolean().default(false),
});

export type Address = z.output<typeof AddressSchema>;

export type AddressWithId = Address & { id: number };
