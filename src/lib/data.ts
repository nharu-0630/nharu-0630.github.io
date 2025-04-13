import type { ExternalLink, PortfolioItem } from './types';

export const PortfolioGroups: { [key: string]: PortfolioItem[] } = {
    "Works": [
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
    ],
    "Papers": [
        {
            title: 'STaMP:個人の性格や政治的立場等の多面的特性と紐づくSNSデータの構築及び文章スタイルによる個人特性予測',
            description: '福畠汐音, 仲田明良, 佐橋優人, 増川哲太 (静大), 三輪洋文, 野中尚人 (学習院大), 木下翔太郎, 岸本泰士郎 (慶應大), 五十嵐彰 (阪大), 岡久太郎, 狩野芳伸 (静大)',
            url: 'https://www.anlp.jp/proceedings/annual_meeting/2024/pdf_dir/P2-2.pdf',
            date: new Date('2024-03-01'),
        },
        {
            title: 'ソーシャルメディアにおける投稿およびユーザの政治的傾向予測と政治的投稿フィルタによる性能向上',
            description: '佐橋 優人, 狩野 芳伸 (静大)',
            url: 'https://www.anlp.jp/proceedings/annual_meeting/2025/pdf_dir/P9-9.pdf',
            date: new Date('2025-03-01'),
        },
    ]
};

export const ExternalLinks: ExternalLink[] = [
    { url: 'mailto:root@nharu.dev', label: 'Email' },
    { url: 'https://x.com/nharu_0630', label: 'Twitter' },
    { url: 'https://github.com/nharu-0630', label: 'GitHub' }
];
