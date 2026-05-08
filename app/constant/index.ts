import type { ShippingOption } from '~/types/checkout';

export const COUNTRIES: string[] = [
  'Indonesia',
  'Malaysia',
  'Singapore',
  'Thailand',
  'Vietnam',
];

export const PROVINCES: string[] = [
  'West Java',
  'Central Java',
  'East Java',
  'Banten',
  'Jakarta',
];

export const SHIPPINGS: ShippingOption[] = [
  {
    courier_name: 'XXXX',
    courier_code: 'xxxx',
    service_name: 'XXXX Standard',
    service_code: 'standard',
    duration: '2 to 5 business days',
    price: 11500,
    insurance: 1000,
  },
  {
    courier_name: 'YYYY',
    courier_code: 'yyyy',
    service_name: 'YYYY Next Day',
    service_code: 'next_day',
    duration: '1 to 2 business days',
    price: 19900,
    insurance: 1000,
  },
  {
    courier_name: 'ZZZZ',
    courier_code: 'zzzz',
    service_name: 'ZZZZ Same Day',
    service_code: 'same_day',
    duration: '1 business days',
    price: 25000,
    insurance: 5000,
  },
];
