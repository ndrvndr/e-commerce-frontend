import type { CartItem } from '~/types/cart';

const CART_KEY = 'cart_items';

const items = ref<CartItem[]>([]);

function loadFromStorage() {
  if (import.meta.client) {
    try {
      const raw = localStorage.getItem(CART_KEY);
      items.value = raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      items.value = [];
    }
  }
}

function saveToStorage() {
  if (import.meta.client) {
    localStorage.setItem(CART_KEY, JSON.stringify(items.value));
  }
}

export function useCart() {
  if (items.value.length === 0) loadFromStorage();

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );

  function addItem(item: Omit<CartItem, 'key'>) {
    const key = `${item.productId}-${item.variantId}`;
    const existing = items.value.find((i) => i.key === key);

    if (existing) {
      const newQty = existing.quantity + item.quantity;
      existing.quantity = Math.min(newQty, item.stock);
    } else {
      items.value.push({ ...item, key });
    }

    saveToStorage();
  }

  function removeItem(key: string) {
    items.value = items.value.filter((i) => i.key !== key);
    saveToStorage();
  }

  function updateQuantity(key: string, quantity: number) {
    const item = items.value.find((i) => i.key === key);
    if (!item) return;
    if (quantity < 1) {
      removeItem(key);
    } else {
      item.quantity = Math.min(quantity, item.stock);
      saveToStorage();
    }
  }

  function clearCart() {
    items.value = [];
    saveToStorage();
  }

  return {
    items: readonly(items),
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
