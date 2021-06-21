import axios from 'axios'

import { withAPIRoot, withAPIKeyHeader } from '../config'

// ___________
//
export async function syncArts(artIds: string[]): Promise<void> {
  await axios
    .post(
      withAPIRoot('/art-fav'),
      {
        artIds,
      },
      {
        headers: withAPIKeyHeader({
          'Content-Type': 'application/json',
        }),
      }
    )
    .catch((err) => console.error(err))
}
