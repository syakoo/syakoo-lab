import axios from 'axios'

import { withAPIRoot } from '../config'

// ___________
//
type APIFetchArtFavResponse = {
  fav: number
}

// ___________
//
export async function fetchArtFav(artId: string) {
  const response = await axios.get<APIFetchArtFavResponse>(
    withAPIRoot('/art-fav'),
    {
      params: { artId },
    }
  )
  return response.data
}
