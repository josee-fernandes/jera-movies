import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

const token = process.env.THEMOVIEDB_ACCESS_TOKEN

export const theMovieDbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
