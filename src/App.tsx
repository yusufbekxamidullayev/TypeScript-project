import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import CategoryPage from "./pages/category/CategoryPage"
import ActorPAge from "./pages/actor/ActorPage"
import DirectorPage from "./pages/director/DirectorPage"
import MoviePage from "./pages/movie/MoviePage"
import GenrePage from "./pages/genre/GenrePage"
import Layout from "./components/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type React from "react"
import MovieActorPage from "./pages/movie/MovieActorPage"
import MovieCategoryPage from "./pages/movie-category/MovieCategoryPage"
import MovieDirectorPage from "./pages/movie-director/MovieDirectorPage"
import MovieGenrePage from "./pages/movie-genre/MovieGenrePage"

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>/
          <Route path="/" element={<LoginPage />} />
          <Route element={localStorage.getItem("token") ? <Layout /> : <Navigate to={"/"} />}>
            <Route path="admin/category" element={<CategoryPage />} />
            <Route path="admin/actor" element={<ActorPAge />} />
            <Route path="admin/director" element={<DirectorPage />} />
            <Route path="admin/movie" element={<MoviePage />} />
            <Route path="admin/genre" element={<GenrePage />} />
            <Route path="admin/movie-actor" element={<MovieActorPage />} />
            <Route path="admin/movie-category" element={<MovieCategoryPage />} />
            <Route path="admin/movie-director" element={<MovieDirectorPage />} />
            <Route path="admin/movie-genre" element={<MovieGenrePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
