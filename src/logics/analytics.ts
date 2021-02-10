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
export const pageViewEvent = (path: string) => {
  if (!GA_ID) return

  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const fireEvent = ({ action, category, label }: Event) => {
  if (!GA_ID) return

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}
