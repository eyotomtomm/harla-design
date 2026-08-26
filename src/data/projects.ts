/**
 * Project gallery data.
 *
 * Projects are grouped by category. To add a new project, append an item to the
 * `items` array of the relevant category. Each image states the client name,
 * the project type, and the location. No individual project pages exist —
 * images open in a lightbox.
 *
 * `fit: 'contain'` is for logos / graphics that should not be cropped.
 */

export interface ProjectItem {
  client: string;
  type: string;
  location?: string;
  image: string;
  alt: string;
  fit?: 'cover' | 'contain';
}

export interface ProjectCategory {
  id: string;
  title: string;
  description: string;
  items: ProjectItem[];
}

const ADDIS = 'Addis Ababa, Ethiopia';

export const projectCategories: ProjectCategory[] = [
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Gyms, spas, and wellness spaces — designed for daily use and long-term wellbeing.',
    items: [
      { client: 'Anbessa Apartment', type: 'Residents’ Gym', location: ADDIS, image: '/images/projects/anbessa-apartment/gym-1.jpg', alt: 'Anbessa Apartment residents’ gym' },
      { client: 'Anbessa Apartment', type: 'Residents’ Gym', location: ADDIS, image: '/images/projects/anbessa-apartment/gym-2.jpg', alt: 'Anbessa Apartment gym, second view' },
      { client: 'Anbessa Apartment', type: 'Coffee Lounge', location: ADDIS, image: '/images/projects/anbessa-apartment/coffee-area.png', alt: 'Anbessa Apartment coffee lounge' },
      { client: 'Abay Bank', type: 'Staff Gym', location: ADDIS, image: '/images/projects/abay-bank/gym-1.jpg', alt: 'Abay Bank staff gym' },
      { client: 'Abay Bank', type: 'Staff Gym', location: ADDIS, image: '/images/projects/abay-bank/gym-2.jpg', alt: 'Abay Bank staff gym, second view' },
    ],
  },
  {
    id: 'institutions',
    title: 'Institutions',
    description: 'Headquarters and civic buildings for banks, agencies, and public bodies.',
    items: [
      { client: 'Africa CDC', type: 'Headquarters', location: ADDIS, image: '/images/projects/africa-cdc/headquarters.jpg', alt: 'Africa CDC headquarters building' },
      { client: 'Abay Bank', type: 'Headquarters Tower', location: ADDIS, image: '/images/projects/abay-bank/tower.jpg', alt: 'Abay Bank headquarters tower' },
      { client: 'Abay Bank', type: 'Headquarters Lobby', location: ADDIS, image: '/images/projects/abay-bank/lobby-1.jpg', alt: 'Abay Bank headquarters lobby' },
      { client: 'Abay Bank', type: 'Headquarters Lobby', location: ADDIS, image: '/images/projects/abay-bank/lobby-2.jpg', alt: 'Abay Bank headquarters lobby, reception' },
      { client: 'Abay Bank', type: 'Headquarters Lobby', location: ADDIS, image: '/images/projects/abay-bank/lobby-3.jpg', alt: 'Abay Bank headquarters lobby, seating' },
      { client: 'Abay Bank', type: 'Headquarters Lobby', location: ADDIS, image: '/images/projects/abay-bank/lobby-6.jpg', alt: 'Abay Bank headquarters lobby, detail' },
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Office spaces and corporate headquarters that support how organisations actually work.',
    items: [
      { client: 'Glorious Group', type: 'Headquarters', location: ADDIS, image: '/images/projects/glorious-group-hq/exterior.jpg', alt: 'Glorious Group headquarters exterior' },
      { client: 'East Africa Holdings', type: 'Corporate Offices', location: ADDIS, image: '/images/projects/east-africa-holdings/logo.png', alt: 'East Africa Holdings', fit: 'contain' },
      { client: 'Anbessa', type: 'Executive Offices', location: ADDIS, image: '/images/projects/anbessa-apartment/office-lounge.png', alt: 'Anbessa executive office lounge' },
      { client: 'Anbessa', type: 'Executive Offices', location: ADDIS, image: '/images/projects/anbessa-apartment/office-waiting.png', alt: 'Anbessa executive office waiting area' },
      { client: 'Anbessa', type: 'Executive Offices', location: ADDIS, image: '/images/projects/anbessa-apartment/meeting-room.png', alt: 'Anbessa meeting room' },
      { client: 'Anbessa', type: 'Executive Offices', location: ADDIS, image: '/images/projects/anbessa-apartment/waiting-area.png', alt: 'Anbessa reception waiting area' },
    ],
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Hotels and serviced residences where arrival, stay, and service are designed as one experience.',
    items: [
      { client: 'Aya Luxury Living', type: 'Serviced Residences', location: ADDIS, image: '/images/projects/aya-luxury-living/building.jpg', alt: 'Aya Luxury Living residential building' },
      { client: 'Lobby Concept', type: 'Hotel Lobby', location: ADDIS, image: '/images/projects/lobby-design/lobby-a.jpg', alt: 'Hotel lobby concept, atrium' },
      { client: 'Lobby Concept', type: 'Hotel Lobby', location: ADDIS, image: '/images/projects/lobby-design/lobby-b.jpg', alt: 'Hotel lobby concept, chandelier' },
      { client: 'Lobby Concept', type: 'Hotel Lobby', location: ADDIS, image: '/images/projects/lobby-design/lobby-c.jpg', alt: 'Hotel lobby concept, seating' },
    ],
  },
  {
    id: 'retail',
    title: 'Retail',
    description: 'Malls, flagship stores, and cafés — retail environments built around the customer journey.',
    items: [
      { client: 'Arada Mall', type: 'Luxury Mall', location: ADDIS, image: '/images/projects/arada-mall/exterior.jpg', alt: 'Manson Arada Luxury Mall exterior' },
      { client: 'Hanson Coffee Lab', type: 'Café & Retail', location: ADDIS, image: '/images/projects/hanson-coffee-lab/store.jpg', alt: 'Hanson Coffee Lab display' },
      { client: 'Rungo Perfumes', type: 'Flagship Store', image: '/images/projects/rungo-perfumes/interior.jpg', alt: 'Rungo Perfumes flagship store interior' },
      { client: 'Rungo Perfumes', type: 'Brand Identity', image: '/images/projects/rungo-perfumes/logo.png', alt: 'Rungo Perfumes logo', fit: 'contain' },
    ],
  },
];
