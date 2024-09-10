import axios from 'axios'

const auth_link = 'https://www.strava.com/oauth/token'

export async function getAccestoken() {
  const res = await axios.post(auth_link, {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  })

  return res.data.access_token
}

export async function getTenActivities(access_token: string, page: number) {
  return fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=10&page=${page}&access_token=${access_token}`
  )
    .then((res) => res.json())
    .then(function (data) {
      return data
    })
}
