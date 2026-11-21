// Every fact here is copied from powerrecycling195.com (checked 20 Nov 2026).
// Don't add one that isn't on their site or confirmed by the owner.

export type Yard = {
  id: "calgary" | "regina" | "fort-macleod";
  city: string;
  street: string;
  region: string;
  phones: string[];
  email: string;
  inventory: { search: string; multi: string; image: string };
  map: string;
};

const inventory = (base: string) => ({
  search: `${base}/inventory/retail.htm`,
  multi: `${base}/inventory/shop.htm`,
  image: `${base}/inventory/selector/outside/multi2.htm`,
});

export const yards: Yard[] = [
  {
    id: "calgary",
    city: "Calgary",
    street: "2807 Ogden Road SE",
    region: "Calgary, AB T2G 4R4",
    phones: ["403-402-8095", "403-479-2140"],
    email: "power.recycling1959755@gmail.com",
    inventory: inventory("http://www.powerrecycling195.com"),
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40149.69668328244!2d-114.0608368812901!3d51.02804450282631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53717b6d3d9b93c7%3A0xc7c3e83e000ebae3!2sPower%20Recycling!5e0!3m2!1sen!2sus!4v1648235380340!5m2!1sen!2sus",
  },
  {
    id: "regina",
    city: "Regina",
    street: "3140 Pasqua St N",
    region: "Regina, SK S0G 5K0",
    phones: ["306-543-3300"],
    email: "regina@powerrecycling.ca",
    inventory: inventory("http://search8939.used-auto-parts.biz"),
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59064.45430049039!2d-104.66681436326448!3d50.5342737913957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x531c19e24ba2b0e5%3A0x2395b580ce792237!2sPower%20Recycling!5e0!3m2!1sen!2sus!4v1648235329264!5m2!1sen!2sus",
  },
  {
    id: "fort-macleod",
    city: "Fort Macleod",
    street: "1007 Sgt Wilde Rd",
    region: "Fort Macleod, AB T0L 0Z0",
    phones: ["403-795-8572", "403-466-2681"],
    email: "parfm.2022@gmail.com",
    inventory: inventory("http://search2860.used-auto-parts.biz"),
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47684.95369738867!2d-113.42592428043082!3d49.718953704084804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x536e5bae06402eff%3A0x5b4ce7607ec93992!2sPower%20Auto%20Recycling!5e0!3m2!1sen!2sus!4v1663619055699!5m2!1sen!2sus",
  },
];

export const hours = { label: "Business hours (MST/MDT)", weekdays: "Mon–Fri 8:00am–5:30pm", weekends: "Weekends closed" };

export const tel = (phone: string) => `tel:+1${phone.replaceAll("-", "")}`;

export const directions = (y: Yard) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Power Recycling, ${y.street}, ${y.region}`)}`;
