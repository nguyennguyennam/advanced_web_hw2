import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Gallery from './pages/GalleryPage.jsx';
import PhotoDetailPage from './pages/PhotoDetailPage.jsx';
import Header from './components/Header.jsx';

/*
    Main App component that sets up routing for the gallery and photo detail pages.
*/
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/photos" element={<Gallery />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
