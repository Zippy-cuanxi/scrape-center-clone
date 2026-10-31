/**
 * Static copy and navigation for the portal.
 * Keeping this separate from components makes the site easy to rebrand or extend.
 */
export const site = {
  name: 'Scrape Center',
  tagline: 'Python 爬虫练习案例',
  originalUrl: 'https://scrape.center/',
  bookUrl: 'https://item.jd.com/13527222.html',
  alert: {
    prefix: '以下爬虫练习案例是',
    bookLabel: '《Python3网络爬虫开发实战（第二版）》',
    suffix:
      '配套案例，案例站点与内容均归原作者所有。本页为界面复刻演示，仅用于学习与前端实现研究。',
  },
};

export const navItems = [
  { label: '案例列表', href: '#top', active: true },
  { label: '环境配置', href: 'https://setup.scrape.center' },
  { label: '配套书籍', href: 'https://item.jd.com/13527222.html' },
];
