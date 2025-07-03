import { create } from "zustand";

const useBookingStore = create((set) => ({
  bookedProperty: null,
  totalAmount: 0,
  userId: null,
  appliedPromoCode: null,
  bookProperty: (property) => {
    // console.log("Booking property:", property);
    set(() => {
      const priceAsNumber = Number(property.price);
      const newState = {
        bookedProperty: {
          ...property,
          bookingId: Date.now(),
          bookingDate: new Date(),
        },
        totalAmount: priceAsNumber,
      };
      // console.log("New state:", newState);
      return newState;
    });
  },
  removeProperty: () => {
    // console.log("Removing property");
    set(() => ({
      bookedProperty: null,
      totalAmount: 0,
      appliedPromoCode: null,
    }));
  },
  clearBookings: () => {
    // console.log("Clearing bookings");
    set({
      bookedProperty: null,
      totalAmount: 0,
      appliedPromoCode: null,
    });
  },
  setUserId: (id) => set({ userId: id }),
  setPromoCode: (promoCode) => set({ appliedPromoCode: promoCode }),
  clearPromoCode: () => set({ appliedPromoCode: null }),
}));

export default useBookingStore;
