
export interface DocTypeOption {
    value: 'technical' | 'api' | 'both';
    title: string;
    description: string;
    badge: string;
  }
  export const DOC_TYPES: DocTypeOption[] = [
    {
      value: 'technical',
      title: 'Technical Documentation (Architecture & Code Overview)',
      description:
        "A detailed explanation of the system's architecture, folder structure, technologies used, and logic behind the implementation.",
      badge: 'Recommended for developers',
    },
    {
      value: 'api',
      title: 'API Documentation (Endpoints & Integration Guide)',
      description:
        'A complete list of API endpoints, request and response examples, authentication methods, and usage guidelines',
      badge: 'Recommended for backend teams',
    },
    {
      value: 'both',
      title: 'Full Documentation Package (Technical + API)',
      description:
        'A combined package that includes both the technical overview and the API reference. Gives a complete picture of how the system is structured and how it can be integrated.',
      badge: 'Complete package',
    },
  ];
  
  export const links = [
    {
        title: 'Features',
        href: '#features',
    },
    {
        title: 'Overview',
        href: '#overview',
    },
    {
        title: 'Home',
        href: '#home',
    },
    {
        title: 'How it works',
        href: '#',
    },
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
];


  export const MAX_FREE_DOCS = 6;