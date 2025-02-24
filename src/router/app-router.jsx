import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MovieList } from "../components/movie-list.component"
import { MovieForm } from "../components/movie-form.component"
import { RoomList } from "../components/room-list.component"
import { RoomForm } from "../components/room-form.component"
import { ReservationForm } from "../components/reservation-form.component"


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies-register" element={<MovieForm />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms-register" element={<RoomForm />} />
        <Route path="/booking" element={<ReservationForm />} />
        <Route path="*" element={<MovieList />} />
      </Routes>
    </BrowserRouter>
  )
}