import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <div className='relative h-full w-full' data-theme="forest">
        <Navbar />
          <div className='absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'/>
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
