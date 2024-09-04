import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface Track {
  id: number
  title: string
  // Add other relevant fields
}

interface TracksState {
  tracks: Track[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TracksState = {
  tracks: [],
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
        state.tracks = action.payload
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
  },
})

export default tracksSlice.reducer
