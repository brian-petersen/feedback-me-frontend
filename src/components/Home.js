import React, { Fragment } from 'react'

import Uploader from './Uploader'

import "./Home.css"

export default function Home() {
  return (
    <Fragment>
      <div className="Home">
        <h1>PDF reviews made easy</h1>
        <ol>
          <li>Upload your PDF on the left</li>
          <li>Share the feedback URL with others</li>
          <li>Review the feedback with the other URL</li>
        </ol>
      </div>
      <Uploader />
    </Fragment>
  )
}
