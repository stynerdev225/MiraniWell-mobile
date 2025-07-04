import { RitualRoom, Affirmation, ElementType } from '@/types';

// Ritual Room Data
export const ritualRoomsData: RitualRoom[] = [
  {
    id: '1',
    element: 'earth',
    name: 'Grounding Garden',
    description: 'Connect with stability and strength through earth-based practices',
    duration: 15,
    color: 'from-amber-400 to-orange-600',
    practices: [
      {
        id: 'earth-1',
        type: 'meditation',
        title: 'Root Chakra Grounding',
        duration: 10,
        instructions: [
          'Sit comfortably with your feet flat on the ground',
          'Take three deep breaths, feeling your connection to the earth',
          'Visualize roots growing from your body into the earth',
          'Feel the stability and strength of the earth supporting you',
          'Breathe in grounding energy, breathe out any tension'
        ]
      },
      {
        id: 'earth-2',
        type: 'movement',
        title: 'Stone Mountain Posture',
        duration: 5,
        instructions: [
          'Stand tall with feet hip-width apart',
          'Imagine yourself as a strong mountain',
          'Feel your feet rooted firmly to the ground',
          'Breathe steadily, maintaining your mountain presence',
          'Hold this posture for 5 minutes'
        ]
      }
    ]
  },
  {
    id: '2',
    element: 'water',
    name: 'Flowing River',
    description: 'Find fluidity and emotional balance with water meditations',
    duration: 20,
    color: 'from-blue-400 to-cyan-600',
    practices: [
      {
        id: 'water-1',
        type: 'visualization',
        title: 'River Flow Meditation',
        duration: 15,
        instructions: [
          'Close your eyes and imagine sitting by a gentle river',
          'Listen to the sound of flowing water',
          'Feel your emotions flowing like the river - not stuck, but moving',
          'If difficult emotions arise, let them flow past like the water',
          'End by feeling the peace of the flowing water within you'
        ]
      },
      {
        id: 'water-2',
        type: 'breathing',
        title: 'Ocean Wave Breathing',
        duration: 5,
        instructions: [
          'Breathe in slowly like a wave building',
          'Hold briefly at the peak',
          'Exhale slowly like a wave receding',
          'Continue this rhythm, feeling the ebb and flow',
          'Let your breath mirror the ocean\'s natural rhythm'
        ]
      }
    ]
  },
  {
    id: '3',
    element: 'fire',
    name: 'Sacred Flame',
    description: 'Ignite passion and transformation through fire ceremonies',
    duration: 10,
    color: 'from-red-400 to-orange-500',
    practices: [
      {
        id: 'fire-1',
        type: 'visualization',
        title: 'Inner Fire Activation',
        duration: 8,
        instructions: [
          'Sit comfortably and close your eyes',
          'Visualize a warm, golden flame in your heart center',
          'Feel this flame growing brighter with each breath',
          'Let this fire burn away what no longer serves you',
          'Feel the warmth and energy spreading throughout your body'
        ]
      },
      {
        id: 'fire-2',
        type: 'movement',
        title: 'Dynamic Fire Flow',
        duration: 2,
        instructions: [
          'Stand and begin with gentle arm movements',
          'Let your movements become more dynamic and flowing',
          'Feel the energy building in your body',
          'Express your inner fire through movement',
          'End in stillness, feeling the energy settled within'
        ]
      }
    ]
  },
  {
    id: '4',
    element: 'air',
    name: 'Wind Sanctuary',
    description: 'Breathe freely and gain clarity with air-focused practices',
    duration: 12,
    color: 'from-gray-300 to-blue-400',
    practices: [
      {
        id: 'air-1',
        type: 'breathing',
        title: 'Clarity Breath Work',
        duration: 10,
        instructions: [
          'Sit with your spine straight, shoulders relaxed',
          'Breathe in for 4 counts through your nose',
          'Hold for 4 counts',
          'Exhale for 6 counts through your mouth',
          'Feel clarity and lightness with each breath cycle'
        ]
      },
      {
        id: 'air-2',
        type: 'meditation',
        title: 'Sky Mind Meditation',
        duration: 2,
        instructions: [
          'Imagine your mind as vast as the open sky',
          'Let thoughts pass like clouds - temporary and changing',
          'Rest in the spacious awareness of your sky-like mind',
          'Feel the freedom and clarity of open space',
          'Return to this sky-mind whenever you need clarity'
        ]
      }
    ]
  }
];

// Affirmations Data
export const affirmationsData: Affirmation[] = [
  // Earth Affirmations
  {
    id: 'earth-aff-1',
    text: 'I am grounded in my truth and rooted in my strength.',
    element: 'earth',
    category: 'Self-Confidence'
  },
  {
    id: 'earth-aff-2',
    text: 'Like a mountain, I stand tall and unmoved by life\'s storms.',
    element: 'earth',
    category: 'Resilience'
  },
  {
    id: 'earth-aff-3',
    text: 'I am stable, secure, and deeply connected to my foundation.',
    element: 'earth',
    category: 'Security'
  },
  {
    id: 'earth-aff-4',
    text: 'My roots run deep, giving me strength to grow and flourish.',
    element: 'earth',
    category: 'Growth'
  },

  // Water Affirmations
  {
    id: 'water-aff-1',
    text: 'I flow with life\'s changes like water finding its path.',
    element: 'water',
    category: 'Adaptability'
  },
  {
    id: 'water-aff-2',
    text: 'I embrace the ebb and flow of my emotions with grace.',
    element: 'water',
    category: 'Emotional Balance'
  },
  {
    id: 'water-aff-3',
    text: 'Like water, I am flexible, persistent, and powerful.',
    element: 'water',
    category: 'Flexibility'
  },
  {
    id: 'water-aff-4',
    text: 'I trust in the natural flow of my life\'s journey.',
    element: 'water',
    category: 'Trust'
  },

  // Fire Affirmations
  {
    id: 'fire-aff-1',
    text: 'My inner fire burns bright with passion and purpose.',
    element: 'fire',
    category: 'Motivation'
  },
  {
    id: 'fire-aff-2',
    text: 'I transform challenges into opportunities with fiery determination.',
    element: 'fire',
    category: 'Transformation'
  },
  {
    id: 'fire-aff-3',
    text: 'My creative spark ignites endless possibilities.',
    element: 'fire',
    category: 'Creativity'
  },
  {
    id: 'fire-aff-4',
    text: 'I radiate warmth, light, and positive energy to all I meet.',
    element: 'fire',
    category: 'Positivity'
  },

  // Air Affirmations
  {
    id: 'air-aff-1',
    text: 'I breathe in clarity and exhale all that no longer serves me.',
    element: 'air',
    category: 'Clarity'
  },
  {
    id: 'air-aff-2',
    text: 'Fresh perspectives flow to me with every breath.',
    element: 'air',
    category: 'Inspiration'
  },
  {
    id: 'air-aff-3',
    text: 'My mind is clear, focused, and free from mental clutter.',
    element: 'air',
    category: 'Mental Clarity'
  },
  {
    id: 'air-aff-4',
    text: 'I communicate my truth with lightness and wisdom.',
    element: 'air',
    category: 'Communication'
  }
];

// Helper functions
export const getRitualRoomsByElement = (element: ElementType): RitualRoom[] => {
  return ritualRoomsData.filter(room => room.element === element);
};

export const getAffirmationsByElement = (element: ElementType): Affirmation[] => {
  return affirmationsData.filter(affirmation => affirmation.element === element);
};

export const getRandomAffirmation = (element?: ElementType): Affirmation => {
  const availableAffirmations = element 
    ? getAffirmationsByElement(element)
    : affirmationsData;
  
  const randomIndex = Math.floor(Math.random() * availableAffirmations.length);
  return availableAffirmations[randomIndex];
};

export const getRitualRoomById = (id: string): RitualRoom | undefined => {
  return ritualRoomsData.find(room => room.id === id);
};
