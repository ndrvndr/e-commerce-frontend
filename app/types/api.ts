export interface ApiResponse<T> {
  data: T;
  links?: {
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    total: number;
  };
}
