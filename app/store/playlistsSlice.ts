import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface Playlist {
  id: number
  title: string
  // Add other relevant fields
}

interface PlaylistsState {
  playlists: Playlist[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: PlaylistsState = {
  playlists: [],
  status: "idle",
  error: null,
}

export const fetchPlaylists = createAsyncThunk("playlists/fetchPlaylists", async () => {
  const response = await axios.get("https://api.deezer.com/chart/0/playlists?limit=30")
  return response.data.data
})

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.playlists = action.payload
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
    //   .addCase(fetchPlaylists.settled, (state) => {
    //     state.status = "idle"
    //   })
  },
})

export default playlistsSlice.reducer
