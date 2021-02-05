type ANavData = {
  url: string
  title: string
}

type NavData = ANavData[]

// ___________
//
export const navData: NavData = [
  { url: '/about-me', title: 'Aboutme' },
  { url: '/apps', title: 'Apps' },
  { url: '/articles', title: 'Articles' },
  { url: '/arts', title: 'Arts' },
]
