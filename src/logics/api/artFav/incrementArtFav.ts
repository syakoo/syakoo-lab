import axios from 'axios'

import { withAPIRoot } from '../config'

// ___________
//
type APIIncrementArtFav = {
  fav: number
}

// ___________
//
export async function incrementArtFav(artId: string) {
  const response = await axios.put<APIIncrementArtFav>(
    withAPIRoot('/art-fav'),
    {},
    {
      params: { artId },
    }
  )
  return response.data
}
