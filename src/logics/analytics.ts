export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

// ___________
//
type ClickArtLinkEvent = {
  action: 'click_art_link'
  category: 'Art'
  label: { artId: string }
}

type ClickArtFavEvent = {
  action: 'click_art_fav'
  category: 'Art'
  label: { artId: string }
}

type Event = ClickArtLinkEvent | ClickArtFavEvent

// ___________
//
export const isValidGA = (GAID?: string): GAID is string => {
  if (!GAID) return false
  if (process.env.NODE_ENV !== 'production') return false

  return true
}

export const pageViewEvent = (
  path: string,
  { shallow }: { shallow: boolean }
) => {
  if (!isValidGA(GA_ID) || shallow) return

  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const fireEvent = ({ action, category, label }: Event) => {
  if (!isValidGA(GA_ID)) return

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}
