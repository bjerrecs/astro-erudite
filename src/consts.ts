import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Desktop as a Service',
  description:
    'A blog where I share my thoughts on technology, guides, and and other usefull information.',
  href: 'daas.dk',
  author: 'sbjerre',
  locale: 'en-US',
  featuredPostCount: 3,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/bjerrecs',
    label: 'GitHub',
  },
  {
    href: 'https://bsky.app/profile/sbjerre.bsky.social',
    label: 'Twitter',
  },
  {
    href: 'mailto:simon@bjerrebakholdt.dk',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
