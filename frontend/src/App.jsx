import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <div data-theme="forest">
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/note/:id' element={<NoteDetailPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
