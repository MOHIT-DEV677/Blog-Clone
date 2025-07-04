import { useState } from 'react'
import './index.css'
import React from 'react'
import {store} from './store/store'
import Body from './components/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from './components/Feed'
import {Provider} from 'react-redux'
import Login from './components/Login'
import Profile from './components/Profile'
function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path='/' element={<Feed/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
