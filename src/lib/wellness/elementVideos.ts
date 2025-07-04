import { ElementType } from '@/types';

type ElementVideo = {
  element: ElementType | 'all';
  title: string;
  description: string;
  youtubeId: string;
};

export const elementVideos: ElementVideo[] = [
  {
    element: 'all',
    title: 'Elements of Wellness Meditation',
    description: 'A balanced meditation connecting with all four elemental energies',
    youtubeId: 'n4GqIJ0U-Zk'  // Relaxing nature sounds
  },
  {
    element: 'earth',
    title: 'Earth Element Meditation',
    description: 'Connect with the grounding energy of the earth element',
    youtubeId: 'WrHmr_m9Qsc'  // Forest sounds meditation
  },
  {
    element: 'water',
    title: 'Water Element Flow',
    description: 'Immerse yourself in the flowing energy of water',
    youtubeId: 'DGIXT7ce3vQ'  // Ocean waves meditation
  },
  {
    element: 'fire',
    title: 'Fire Element Transformation',
    description: 'Harness the transformative power of the fire element',
    youtubeId: 'L_LUpnjgPso'  // Fireplace meditation
  },
  {
    element: 'air',
    title: 'Air Element Breathing',
    description: 'Breathe with the freedom and clarity of the air element',
    youtubeId: 'CyUwzBK-W2c'  // Wind and sky meditation
  }
];

export const getElementVideo = (element: ElementType | 'all'): ElementVideo => {
  const video = elementVideos.find(video => video.element === element);
  return video || elementVideos[0]; // Return the 'all' video as default
};
