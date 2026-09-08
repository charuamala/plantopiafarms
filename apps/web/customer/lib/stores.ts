// Placeholder store/stockist data. Replace city/store names and links below
// with your real retail partners once confirmed — see CLAUDE.md.

export type Store = {
  name: string;
  city: string;
  address: string;
  availability: string;
  mapUrl?: string;
};

export const stores: Store[] = [
  {
    name: "[Store name] — Sample Entry",
    city: "Kotagiri",
    address: "[Street address, area, pincode]",
    availability: "Strawberries, Blueberries",
  },
  {
    name: "[Store name] — Sample Entry",
    city: "Coimbatore",
    address: "[Street address, area, pincode]",
    availability: "All berry varieties",
  },
  {
    name: "[Store name] — Sample Entry",
    city: "Chennai",
    address: "[Street address, area, pincode]",
    availability: "Strawberries, Raspberries, Jams",
  },
];
