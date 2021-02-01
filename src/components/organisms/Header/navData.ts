type ANavData = {
  url: string
  title: string
}

type NavData = ANavData[]

// ___________
//
export const navData: NavData = [
  { url: '/about/me', title: 'ABOUTME' },
  { url: '/apps', title: 'APPS' },
  { url: '/articles', title: 'ARTICLES' },
  { url: '/arts', title: 'ARTS' },
]
