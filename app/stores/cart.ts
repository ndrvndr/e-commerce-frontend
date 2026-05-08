import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem } from '~/types/cart';

export const useCartStore = defineStore('cart', () => {
  const CART_KEY = 'cart_items';
  const items = ref<CartItem[]>([]);
  const isLoaded = ref(false);

  function loadFromStorage() {
    if (import.meta.client && !isLoaded.value) {
      try {
        const raw = localStorage.getItem(CART_KEY);
        if (raw) {
          items.value = JSON.parse(raw) as CartItem[];
        }
      } catch {
        items.value = [];
      }
      isLoaded.value = true;
    }
  }

  function saveToStorage() {
    if (import.meta.client && isLoaded.value) {
      localStorage.setItem(CART_KEY, JSON.stringify(items.value));
    }
  }

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
    items,
    isLoaded,
    loadFromStorage,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
});
