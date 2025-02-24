import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MovieList } from "../components/movie-list.component"
import { RoomList } from "../components/room-list.component"
import { ReservationForm } from "../components/reservation-form.component"


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/reservations" element={<ReservationForm />} />
        <Route path="*" element={<MovieList />} />
      </Routes>
    </BrowserRouter>
  )
}