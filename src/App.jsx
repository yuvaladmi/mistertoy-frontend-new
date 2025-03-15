import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'


import { HashRouter as Router } from 'react-router-dom'
import { store } from './store/store.js'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
        <AppHeader />
            <main className='main-layout'>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" />
                    <Route element={<ToyIndex />} path="/toy" />
                    <Route element={<ToyEdit />} path="/toy/edit" />
                    <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                    <Route element={<ToyDetails />} path="/toy/:toyId" />
                </Routes>
            </main>
        </section>
      </Router>
  </Provider>
)}

export default App
