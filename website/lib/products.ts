// PRODUCT IMAGE MAPPING:
// Place optimized photos in public/products/{slug}.webp
//
// ID | Product Name                                      | Slug                                      | Photos
// -- | ------------------------------------------------- | ----------------------------------------- | ------
//  1 | Rack End Long Tie Rod Mazda E2000                 | rack-end-mazda-e2000                      | 2
//  2 | Tie Rod End Timor S515 SOHC DOHC Set              | tie-rod-end-timor-s515                    | 2
//  3 | Ball Joint Mazda MR90/Vantren                     | ball-joint-mazda-mr90-vantren             | 2
//  4 | As Kopling Main Drive Gear Mitsubishi L300         | as-kopling-l300                           | 2
//  5 | Tie Rod End Mitsubishi Lancer Dangan 1988 Up      | tie-rod-end-mitsubishi-lancer-dangan      | 2
//  6 | Packing Cylinder Head Graphite Galant Eterna G63B | packing-cylinder-head-mitsubishi-galant-eterna | 2
//  7 | Packing Cylinder Head Graphite Panther 2500cc     | packing-cylinder-head-panther-2500cc      | 2
//  8 | Pulley Water Pump Hino Dutro                      | pulley-water-pump-hino-dutro              | 3
//  9 | Pulley Alternator Innova Diesel                   | pulley-alternator-innova-diesel           | 3
// 10 | Tie Rod End Daihatsu Zebra Fan                    | tie-rod-end-daihatsu-zebra-fan            | 4
// 11 | Diaphragm Mitsubishi Canter                       | diaphragm-assy-mitsubishi-canter          | 3
// 12 | Armature Mitsubishi Ganjo ME701446                | armature-mitsubishi-ganjo-me701446        | 2
// 13 | Packing Cylinder Head Graphite Panther 2300cc     | packing-cylinder-head-panther-2300cc      | 2
// 14 | Selenoid Switch Starter Isuzu NKR71 24V           | selenoid-switch-starter-isuzu-nkr71-24v   | 3
// 15 | Selenoid Switch Starter Isuzu Giga FTR240 24V     | selenoid-switch-starter-isuzu-giga-ftr240-24v | 2
// 16 | Brake Master Assy Isuzu NMR71                     | brake-master-assy-nmr71                   | 2
// 17 | Brake Master Assy Suzuki Carry ST100              | brake-master-assy-suzuki-carry-st100      | 1
// 18 | Brake Master Assy Suzuki Carry Extra              | brake-master-assy-suzuki-carry-extra      | 2
// 19 | Filter Fuel Sedimenter Isuzu NMR81                | sedimeter-isuzu-nmr81                     | 2
// 20 | Brake Master Assy Dyna BU30                       | brake-master-assy-dyna-bu30               | 1
// 21 | Tie Rod End Isuzu Bison TLD56 TLD58 KAD           | tie-rod-end-isuzu-tld56                   | 2
// 22 | Tie Rod End Mitsubishi PS100                      | tie-rod-end-mitsubishi-ps100              | 2
// 23 | Brake Master Assy Suzuki ST20                     | brake-master-assy-suzuki-st20             | 2
// 24 | Hanger Spring Mitsubishi PS120 MC114412           | hanger-spring-mitsubishi-ps120-mc114412   | 2
// 25 | Shackle Spring Front PS120                        | shuckle-spring-front-ps120                | 2
// 26 | Timing Belt Trooper Diesel 4JB1 Turbo             | timing-belt-trooper-diesel-4jb1-turbo     | 2
// 27 | Repair Kit Air Master Isuzu Giga FRR              | repair-kit-air-master-isuzu-giga-frr      | 1
// 28 | Kit Valve Governor H07C Hino                      | kit-valve-governor-h07c-hino              | 2
// 29 | Bushing Kingpin Isuzu NKR71 66                    | bushing-kingpin-isuzu-nkr71-66            | 2

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
  images: string[];
}

export function getPrimaryImage(product: Product): string | null {
  return product.images.length > 0 ? product.images[0] : null;
}

/** @deprecated Use getPrimaryImage instead */
export function getProductImage(product: Product): string | null {
  return getPrimaryImage(product);
}

export const products: Product[] = [
  { id: 1, name: "Rack End Long Tie Rod Mazda E2000", category: "Kemudi", brand: "OEM", price: 280000, quantity: "Sepasang/set (2pcs)", images: ["/products/rack-end-mazda-e2000-1.webp", "/products/rack-end-mazda-e2000-2.webp"] },
  { id: 2, name: "Tie Rod End Timor S515 SOHC DOHC Set", category: "Kemudi", brand: "Federal Mogul", price: 160000, quantity: "Sepasang/set (2pcs)", images: ["/products/tie-rod-end-timor-s515-1.webp", "/products/tie-rod-end-timor-s515-2.webp"] },
  { id: 3, name: "Ball Joint Mazda MR90/Vantren", category: "Kemudi", brand: "Asahi", price: 250000, quantity: "Biji (1pc)", images: ["/products/ball-joint-mazda-mr90-vantren-1.webp", "/products/ball-joint-mazda-mr90-vantren-2.webp"] },
  { id: 4, name: "As Kopling Main Drive Gear Mitsubishi L300", category: "Lainnya", brand: "Mitsuda", price: 475000, quantity: "Biji (1pc)", images: ["/products/as-kopling-l300-1.webp", "/products/as-kopling-l300-2.webp"] },
  { id: 5, name: "Tie Rod End Mitsubishi Lancer Dangan 1988 Up", category: "Kemudi", brand: "Mitsubishi", price: 190000, quantity: "Biji (1pc)", images: ["/products/tie-rod-end-mitsubishi-lancer-dangan-1.webp", "/products/tie-rod-end-mitsubishi-lancer-dangan-2.webp"] },
  { id: 6, name: "Packing Cylinder Head Graphite Galant Eterna G63B", category: "Engine", brand: "Mitsubishi", price: 145000, quantity: "Set (1set)", images: ["/products/packing-cylinder-head-mitsubishi-galant-eterna-1.webp", "/products/packing-cylinder-head-mitsubishi-galant-eterna-2.webp"] },
  { id: 7, name: "Packing Cylinder Head Graphite Panther 2500cc", category: "Engine", brand: "Isuzu", price: 125000, quantity: "Set (1set)", images: ["/products/packing-cylinder-head-panther-2500cc-1.webp", "/products/packing-cylinder-head-panther-2500cc-2.webp"] },
  { id: 8, name: "Pulley Water Pump Hino Dutro", category: "Lainnya", brand: "Hino", price: 600000, quantity: "Biji (1pc)", images: ["/products/pulley-water-pump-hino-dutro-1.webp", "/products/pulley-water-pump-hino-dutro-2.webp", "/products/pulley-water-pump-hino-dutro-3.webp"] },
  { id: 9, name: "Pulley Alternator Innova Diesel", category: "Engine", brand: "Toyota", price: 250000, quantity: "Biji (1pc)", images: ["/products/pulley-alternator-innova-diesel-1.webp", "/products/pulley-alternator-innova-diesel-2.webp", "/products/pulley-alternator-innova-diesel-3.webp"] },
  { id: 10, name: "Tie Rod End Daihatsu Zebra Fan", category: "Kemudi", brand: "Daihatsu", price: 150000, quantity: "Biji (1pc)", images: ["/products/tie-rod-end-daihatsu-zebra-fan-1.webp", "/products/tie-rod-end-daihatsu-zebra-fan-2.webp", "/products/tie-rod-end-daihatsu-zebra-fan-3.webp", "/products/tie-rod-end-daihatsu-zebra-fan-4.webp"] },
  { id: 11, name: "Diaphragm Assy Mitsubishi Canter", category: "Engine", brand: "Mitsubishi", price: 175000, quantity: "Set (1set)", images: ["/products/diaphragm-assy-mitsubishi-canter-1.webp", "/products/diaphragm-assy-mitsubishi-canter-2.webp", "/products/diaphragm-assy-mitsubishi-canter-3.webp"] },
  { id: 12, name: "Armature Mitsubishi Ganjo ME701446", category: "Engine", brand: "Mitsubishi", price: 350000, quantity: "Biji (1pc)", images: ["/products/armature-mitsubishi-ganjo-me701446-1.webp", "/products/armature-mitsubishi-ganjo-me701446-2.webp"] },
  { id: 13, name: "Packing Cylinder Head Graphite Panther 2300cc", category: "Engine", brand: "Isuzu", price: 150000, quantity: "Set (1set)", images: ["/products/packing-cylinder-head-panther-2300cc-1.webp", "/products/packing-cylinder-head-panther-2300cc-2.webp"] },
  { id: 14, name: "Selenoid Switch Starter Isuzu NKR71 24V", category: "Engine", brand: "Isuzu", price: 400000, quantity: "Biji (1pc)", images: ["/products/selenoid-switch-starter-isuzu-nkr71-24v-1.webp", "/products/selenoid-switch-starter-isuzu-nkr71-24v-2.webp", "/products/selenoid-switch-starter-isuzu-nkr71-24v-3.webp"] },
  { id: 15, name: "Selenoid Switch Starter Isuzu Giga FTR240 24V", category: "Engine", brand: "Isuzu", price: 650000, quantity: "Biji (1pc)", images: ["/products/selenoid-switch-starter-isuzu-giga-ftr240-24v-1.webp", "/products/selenoid-switch-starter-isuzu-giga-ftr240-24v-2.webp"] },
  { id: 16, name: "Brake Master Assy Master Rem Atas Isuzu NMR71", category: "Rem", brand: "Isuzu", price: 650000, quantity: "Biji (1pc)", images: ["/products/brake-master-assy-nmr71-1.webp", "/products/brake-master-assy-nmr71-2.webp"] },
  { id: 17, name: "Brake Master Assy Suzuki Carry ST100", category: "Rem", brand: "Suzuki", price: 225000, quantity: "Biji (1pc)", images: ["/products/brake-master-assy-suzuki-carry-st100-1.webp"] },
  { id: 18, name: "Brake Master Assy Suzuki Carry Extra", category: "Rem", brand: "Suzuki", price: 220000, quantity: "Biji (1pc)", images: ["/products/brake-master-assy-suzuki-carry-extra-1.webp", "/products/brake-master-assy-suzuki-carry-extra-2.webp"] },
  { id: 19, name: "Filter Asm Fuel Sedimenter Pompa Solar Isuzu NMR81", category: "Engine", brand: "Isuzu", price: 350000, quantity: "Biji (1pc)", images: ["/products/sedimeter-isuzu-nmr81-1.webp", "/products/sedimeter-isuzu-nmr81-2.webp"] },
  { id: 20, name: "Brake Master Assy Dyna BU30", category: "Rem", brand: "Toyota", price: 475000, quantity: "Biji (1pc)", images: ["/products/brake-master-assy-dyna-bu30-1.webp"] },
  { id: 21, name: "Tie Rod End Isuzu Bison TLD56 TLD58 KAD", category: "Kemudi", brand: "Isuzu", price: 175000, quantity: "Biji (1pc)", images: ["/products/tie-rod-end-isuzu-tld56-1.webp", "/products/tie-rod-end-isuzu-tld56-2.webp"] },
  { id: 22, name: "Tie Rod End Mitsubishi PS100", category: "Kemudi", brand: "Mitsubishi", price: 175000, quantity: "Biji (1pc)", images: ["/products/tie-rod-end-mitsubishi-ps100-1.webp", "/products/tie-rod-end-mitsubishi-ps100-2.webp"] },
  { id: 23, name: "Brake Master Assy Suzuki ST20", category: "Rem", brand: "Suzuki", price: 200000, quantity: "Biji (1pc)", images: ["/products/brake-master-assy-suzuki-st20-1.webp", "/products/brake-master-assy-suzuki-st20-2.webp"] },
  { id: 24, name: "Hanger Spring Mitsubishi PS120 MC114412", category: "Suspensi", brand: "Mitsubishi", price: 280000, quantity: "Biji (1pc)", images: ["/products/hanger-spring-mitsubishi-ps120-mc114412-1.webp", "/products/hanger-spring-mitsubishi-ps120-mc114412-2.webp"] },
  { id: 25, name: "Shuckle Spring Front PS120", category: "Suspensi", brand: "Mitsubishi", price: 220000, quantity: "Biji (1pc)", images: ["/products/shuckle-spring-front-ps120-1.webp", "/products/shuckle-spring-front-ps120-2.webp"] },
  { id: 26, name: "Timing Belt Trooper Diesel 4JB1 Turbo", category: "Engine", brand: "Isuzu", price: 750000, quantity: "Biji (1pc)", images: ["/products/timing-belt-trooper-diesel-4jb1-turbo-1.webp", "/products/timing-belt-trooper-diesel-4jb1-turbo-2.webp"] },
  { id: 27, name: "Repair Kit Air Master Isuzu Giga FRR", category: "Rem", brand: "Isuzu", price: 420000, quantity: "Set (1set)", images: ["/products/repair-kit-air-master-isuzu-giga-frr-1.webp"] },
  { id: 28, name: "Kit Valve Governor H07C Hino", category: "Engine", brand: "Hino", price: 150000, quantity: "Set (1set)", images: ["/products/kit-valve-governor-h07c-hino-1.webp", "/products/kit-valve-governor-h07c-hino-2.webp"] },
  { id: 29, name: "Bushing Kingpin Isuzu NKR71 66", category: "Kemudi", brand: "Isuzu", price: 60000, quantity: "Set 4pcs", images: ["/products/bushing-kingpin-isuzu-nkr71-66-1.webp", "/products/bushing-kingpin-isuzu-nkr71-66-2.webp"] },
];

export function formatPrice(price: number): string {
  return "Rp" + price.toLocaleString("id-ID").replace(/,/g, ".");
}

export function generateWhatsAppLink(product: Product): string {
  const message = `Halo Luxor Automotive, saya ingin memesan:\\n\\n*${product.name}*\\nBrand: ${product.brand}\\nHarga: ${formatPrice(product.price)}\\nJumlah: ${product.quantity}\\n\\nApakah barang ini tersedia?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralWhatsAppLink(): string {
  const message = "Halo Luxor Automotive, saya ingin bertanya tentang spare part kendaraan niaga.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
