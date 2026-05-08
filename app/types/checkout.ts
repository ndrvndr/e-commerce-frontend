import z from 'zod';
import { AddressSchema } from '~/types/address';

export const CheckoutFormSchema = AddressSchema.extend({
  email: z.string('Email is required').email('Invalid email'),
  courierCode: z.string(),
  isSameAsShipping: z.boolean(),
  billingAddress: AddressSchema.partial().optional(),
}).superRefine((data, ctx) => {
  if (!data.isSameAsShipping) {
    const result = AddressSchema.safeParse(data.billingAddress);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        ctx.addIssue({ ...issue, path: ['billingAddress', ...issue.path] });
      });
    }
  }
});

export type CheckoutFormSchema = z.output<typeof CheckoutFormSchema>;

export interface ShippingOption {
  courier_code: string;
  courier_name: string;
  service_name: string;
  service_code: string;
  duration: string;
  price: number;
  insurance: number;
}

export interface CheckoutSectionVisibility {
  isDeliveryOpen: boolean;
  isShippingOpen: boolean;
  isSummaryOpen: boolean;
}
