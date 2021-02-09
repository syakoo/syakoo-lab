// ___________
//
const ENDPOINT = 'https://syakoo-lab-functions.azurewebsites.net/api'
const FUNCKEY = 'Vt1rUt6S2cLa8OEDQ7gqOEIAh6PhjCk/tt5aK0V9k3AjOo3FVhXKEw=='

// ___________
//
const favArtURL = (artId: string) =>
  `${ENDPOINT}/fav-art/${artId}?code=${FUNCKEY}`

export const getArtFav = async (artId: string) => {
  const data = await fetch(favArtURL(artId)).then((res) => res.json())
  return data.favs as number
}

export const incrementArtFav = async (artId: string) => {
  const data = await fetch(favArtURL(artId), { method: 'POST' }).then((res) =>
    res.json()
  )
  return data.favs as number
}
