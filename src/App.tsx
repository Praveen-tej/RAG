import { BrowserRouter,Route,Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import UploadPage from './pages/UploadPage'

function App() {
  return (
    
<BrowserRouter>
<Routes>
  <Route path="/" element={<LoginPage/>} />
  <Route path="/upload" element={<UploadPage/>} />
  <Route path="/chat" element={<ChatPage/>}  />
</Routes>
</BrowserRouter>
  )
}

export default App