import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

type Album = {
  cover: string
  cover_big: string
  cover_medium: string
  cover_small: string
  cover_xl: string
  id: number
  md5_image: string
  title: string
  tracklist: string
  type: string
}

type Artist = {
  id: number
  link: string
  name: string
  tracklist: string
  type: string
}

export type PlayListTracks = {
  album: Album
  artist: Artist
  duration: number
  explicit_content_cover: number
  explicit_content_lyrics: number
  explicit_lyrics: boolean
  id: number
  link: string
  md5_image: string
  preview: string
  rank: number
  readable: boolean
  time_add: number
  title: string
  title_short: string
  title_version: string
  type: string
}

export interface Track {
  checksum: string
  id: number
  title: string
  description: string
  public: boolean
  share: string
  tracklist: string // use to retrive API data
  picture_type: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  creation_date: string
  nb_tracks: number
  duration: number
  fans: number
  tracks: {
    data: PlayListTracks[]
    checksum: string
  }
}

export interface InitialSliceState {
  data: Track
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: InitialSliceState = {
  data: {
    checksum: "",
    id: 0,
    title: "",
    description: "",
    public: false,
    share: "",
    tracklist: "",
    picture_type: "",
    picture: "",
    picture_small: "",
    picture_medium: "",
    picture_big: "",
    picture_xl: "",
    creation_date: "",
    nb_tracks: 0,
    duration: 0,
    fans: 0,
    tracks: {
      data: [],
      checksum: "",
    },
  },
  status: "idle",
  error: null,
}

export const fetchTracks = createAsyncThunk("tracks/fetchTracks", async (playlistId: number) => {
  const response = await axios.get(`https://api.deezer.com/playlist/${playlistId}`)
  return response.data
})

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
  },
})

export default tracksSlice.reducer
