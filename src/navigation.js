import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      links: [
        {
          text: 'Research background and theme',
          href: getPermalink('/about'),
        },
        {
          text: 'Research interests',
          href: getPermalink('/about#research-interests'),
        },
        {
          text: 'Current Projects',
          href: getPermalink('/about#current-projects'),
        },
        {
          text: 'Collaboration',
          href: getPermalink('/about#collaboration'),
        }
      ],
    },
    {
      text: 'Publications',
      href: getPermalink('/publications'),
    },
    {
      text: 'Databases and Tools',
      links: [
        {
          text: 'MePPI-In',
          href: '/ppi',
        },
        {
          text: 'MePPI-U',
          href: '/ppi2',
        },
        {
          text: 'MeRecon',
          href: '/MeRecon',
        },
        {
          text: 'ph-MeRecon',
          href: '/ph-MeRecon',
        },
        {
          text: 'Me-miRNA',
          href: '/miRNAs',
        },
        {
          text: 'Me-lncRNAs',
          href: '/Me-lncRNAs',
        },
        {
          text: 'MeTRN',
          href: '/MeTRN',
        },
        {
          text: 'Plant-DTI',
          href: '/Plant-DTI',
        },
        {
          text: 'mmGEM',
          href: 'https://github.com/KMUTT-CASB/mmGEM',
        }
      ],
    },
    {
      text: 'People',
      href: getPermalink('/people'),
    },
    {
      text: 'News',
      links: [
        {
          text: 'News Update',
          href: getBlogPermalink(),
        },
        {
          text: 'Lab Activity',
          href: getPermalink('activity', 'tag'),
        },
      ],
    },
    {
      text: 'Contact Us',
      href: getPermalink('/contact'),
    },
  ],
  // actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Research Lab',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Members', href: getPermalink('/people') },
        { text: 'Contact Us', href: getPermalink('/contact') }
      ],
    },
    {
      title: 'Our Publish',
      links: [
        { text: 'Publications', href: getPermalink('/publications') },
        { text: 'Database & Tools', href: getPermalink('/database') }
      ],
    },
    {
      title: 'Databases & Tools',
      links: [
        {
          text: 'MePPI-In',
          href: '/ppi',
        },
        {
          text: 'MePPI-U',
          href: '/ppi2',
        },
        {
          text: 'MeRecon',
          href: '/MeRecon',
        },
        {
          text: 'ph-MeRecon',
          href: '/ph-MeRecon',
        },
        {
          text: 'Me-miRNA',
          href: '/miRNAs',
        },
        {
          text: 'Me-lncRNAs',
          href: '/Me-lncRNAs',
        },
        {
          text: 'MeTRN',
          href: '/MeTRN',
        },
        {
          text: 'Plant-DTI',
          href: '/Plant-DTI',
        }
      ],
    },
    {
      title: 'News & Activity',
      links: [
        { text: 'Blog', href: getPermalink('/blog') }
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'http://facebook.com/casb.kmutt' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/KMUTT-BML' },
  ],
  footNote: `
    &copy; 2024 Center for Agricultural Systems Biology, King Mongkut's University of Technology Thonburi · All rights reserved.
  `,
};
