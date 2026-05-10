interface Color {
  color: string;
  images: string[];
}

interface Variation {
  id: number;
  color: string;
  size: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  image_primary: string;
  image_hover: string;
  size_chart_image: string;
  price: number;
  discount_price: number;
  total_stock: number;
  colors: Color[];
  material: string;
  variations: Variation[];
}
