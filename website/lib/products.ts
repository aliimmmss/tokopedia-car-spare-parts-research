// TODO: Replace with actual Luxor WhatsApp number
export const WHATSAPP_NUMBER = "6281234567890";

export type Category = "Kemudi" | "Engine" | "Rem" | "Suspensi" | "Lainnya";

export interface Product {
  id: number;
  name: string;
  category: Category;
  brand: string;
  price: number;
  quantity: string;
  image?: string | null;
}

export const products: Product[] = [
  { id: 1, name: "Rack End Long Tie Rod Mazda E2000", category: "Kemudi", brand: "OEM", price: 280000, quantity: "Sepasang/set (2pcs)" },
  { id: 2, name: "Tie Rod End Timor S515 SOHC DOHC Set", category: "Kemudi", brand: "Federal Mogul", price: 160000, quantity: "Sepasang/set (2pcs)" },
  { id: 3, name: "Ball Joint Mazda MR90/Vantren", category: "Kemudi", brand: "Asahi", price: 250000, quantity: "Biji (1pc)" },
  { id: 4, name: "As Kopling Main Drive Gear Mitsubishi L300", category: "Lainnya", brand: "Mitsuda", price: 475000, quantity: "Biji (1pc)" },
  { id: 5, name: "Tie Rod End Mitsubishi Lancer Dangan 1988 Up", category: "Kemudi", brand: "Mitsubishi", price: 190000, quantity: "Biji (1pc)" },
  { id: 6, name: "Packing Cylinder Head Graphite Galant Eterna G63B", category: "Engine", brand: "Mitsubishi", price: 145000, quantity: "Set (1set)" },
  { id: 7, name: "Packing Cylinder Head Graphite Panther 2500cc", category: "Engine", brand: "Isuzu", price: 125000, quantity: "Set (1set)" },
  { id: 8, name: "Pulley Water Pump Hino Dutro", category: "Lainnya", brand: "Hino", price: 600000, quantity: "Biji (1pc)" },
  { id: 9, name: "Pulley Alternator Innova Diesel", category: "Engine", brand: "Toyota", price: 250000, quantity: "Biji (1pc)" },
  { id: 10, name: "Tie Rod End Daihatsu Zebra Fan", category: "Kemudi", brand: "Daihatsu", price: 150000, quantity: "Biji (1pc)" },
  { id: 11, name: "Diaphragm Assy Mitsubishi Canter", category: "Engine", brand: "Mitsubishi", price: 175000, quantity: "Set (1set)" },
  { id: 12, name: "Armature Mitsubishi Ganjo ME701446", category: "Engine", brand: "Mitsubishi", price: 350000, quantity: "Biji (1pc)" },
  { id: 13, name: "Packing Cylinder Head Graphite Panther 2300cc", category: "Engine", brand: "Isuzu", price: 150000, quantity: "Set (1set)" },
  { id: 14, name: "Selenoid Switch Starter Isuzu NKR71 24V", category: "Engine", brand: "Isuzu", price: 400000, quantity: "Biji (1pc)" },
  { id: 15, name: "Selenoid Switch Starter Isuzu Giga FTR240 24V", category: "Engine", brand: "Isuzu", price: 650000, quantity: "Biji (1pc)" },
  { id: 16, name: "Brake Master Assy Master Rem Atas Isuzu NMR71", category: "Rem", brand: "Isuzu", price: 650000, quantity: "Biji (1pc)" },
  { id: 17, name: "Brake Master Assy Suzuki Carry ST100", category: "Rem", brand: "Suzuki", price: 225000, quantity: "Biji (1pc)" },
  { id: 18, name: "Brake Master Assy Suzuki Carry Extra", category: "Rem", brand: "Suzuki", price: 220000, quantity: "Biji (1pc)" },
  { id: 19, name: "Filter Asm Fuel Sedimenter Pompa Solar Isuzu NMR81", category: "Engine", brand: "Isuzu", price: 350000, quantity: "Biji (1pc)" },
  { id: 20, name: "Brake Master Assy Dyna BU30", category: "Rem", brand: "Toyota", price: 475000, quantity: "Biji (1pc)" },
  { id: 21, name: "Tie Rod End Isuzu Bison TLD56 TLD58 KAD", category: "Kemudi", brand: "Isuzu", price: 175000, quantity: "Biji (1pc)" },
  { id: 22, name: "Tie Rod End Mitsubishi PS100", category: "Kemudi", brand: "Mitsubishi", price: 175000, quantity: "Biji (1pc)" },
  { id: 23, name: "Brake Master Assy Suzuki ST20", category: "Rem", brand: "Suzuki", price: 200000, quantity: "Biji (1pc)" },
  { id: 24, name: "Hanger Spring Mitsubishi PS120 MC114412", category: "Suspensi", brand: "Mitsubishi", price: 280000, quantity: "Biji (1pc)" },
  { id: 25, name: "Shuckle Spring Front PS120", category: "Suspensi", brand: "Mitsubishi", price: 220000, quantity: "Biji (1pc)" },
  { id: 26, name: "Timing Belt Trooper Diesel 4JB1 Turbo", category: "Engine", brand: "Isuzu", price: 750000, quantity: "Biji (1pc)" },
  { id: 27, name: "Repair Kit Air Master Isuzu Giga FRR", category: "Rem", brand: "Isuzu", price: 420000, quantity: "Set (1set)" },
  { id: 28, name: "Kit Valve Governor H07C Hino", category: "Engine", brand: "Hino", price: 150000, quantity: "Set (1set)" },
  { id: 29, name: "Bushing Kingpin Isuzu NKR71 66", category: "Kemudi", brand: "Isuzu", price: 60000, quantity: "Set 4pcs" },
];

export function formatPrice(price: number): string {
  return "Rp" + price.toLocaleString("id-ID").replace(/,/g, ".");
}

export function generateWhatsAppLink(product: Product): string {
  const message = `Halo Luxor Automotive, saya ingin memesan:\n\n*${product.name}*\nBrand: ${product.brand}\nHarga: ${formatPrice(product.price)}\nJumlah: ${product.quantity}\n\nApakah barang ini tersedia?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralWhatsAppLink(): string {
  const message = "Halo Luxor Automotive, saya ingin bertanya tentang spare part kendaraan niaga.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
