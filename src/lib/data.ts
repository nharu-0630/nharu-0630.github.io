import type { Link, Work } from './types';

export const works: Work[] = [
    {
        title: 'AIWolf Project',
        description: 'Development of server programmes, libraries and template agents and web viewers for AIWolf Project.',
        url: 'https://aiwolfdial.github.io/aiwolf-nlp-viewer',
        date: new Date('2025-04-01'),
    },
    {
        title: 'GakujoGUI Project',
        description: 'Development of software programmes to automate the university\'s academic information system.',
        url: 'https://github.com/nharu-0630/GakujoGUI-WPF',
        date: new Date('2023-04-01'),
    },
];

export const links: Link[] = [
    { url: 'mailto:root@nharu.dev', label: 'Email' },
    { url: 'https://x.com/nharu_0630', label: 'Twitter' },
    { url: 'https://github.com/nharu-0630', label: 'GitHub' }
];
