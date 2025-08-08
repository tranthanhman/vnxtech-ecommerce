import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, variantId?: number) => void;
  updateQuantity: (productId: number, variantId: number | undefined, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!item || typeof item.productId !== 'number' || !item.quantity) return;
        const items = get().items;
        const existing = items.find(
          (i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId
        );

        if (existing) {
          existing.quantity += item.quantity;
          set({ items: [...items] });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.productId === productId && item.variantId === variantId)
          ),
        });
      },
      updateQuantity: (productId, variantId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // tên key trong localStorage
    }
  )
);
