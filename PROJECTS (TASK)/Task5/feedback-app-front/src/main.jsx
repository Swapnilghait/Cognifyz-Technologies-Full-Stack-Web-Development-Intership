import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import {FeedbackForm} from "../components/FeedbackForm.jsx";
import FeedbackCollections from "../components/FeedbackCollections.jsx";
import Layout from '../src/layout.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(


        <Route path="/" element={<Layout/>}>
            <Route path="" element={<FeedbackCollections/>}/>
            <Route path="/feedback-form" element={<FeedbackForm/>}/>


        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={ router }/>
  </React.StrictMode>,
)
