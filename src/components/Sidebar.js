import React from "react"
import { sortBy } from 'lodash'

import './Sidebar.css'

export default function Sidebar({ highlights, onDeleteHighlight }) {
  const sortedHighlights = sortBy(highlights, [h => h.position.pageNumber, h => h.position.boundingRect.y1])

  return (
    <div className="Sidebar">
      <div className="instructions">
        <h1>Feedback Me</h1>
        <i>
          Either highlight text or hold the Alt/Option key then click-and-drag.
        </i>
      </div>

      <ul>
        {sortedHighlights.map(h => (
          <li
            key={h.id}
            onClick={() => {
              updateHash(h)
            }}>
            <div>
              <span
                className="delete"
                title="Delete Feedback"
                onClick={e => {
                  e.stopPropagation()
                  onDeleteHighlight(h.id)
                }}>
                &times;
              </span>
              <div className="comment-text">
                {h.comment.text}
              </div>
              {h.content.text && (
                <blockquote className="highlight-text">
                  {`${h.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              )}
              {h.content.image && (
                <div className="highlight-image">
                  <img src={h.content.image} alt={"Screenshot"} />
                </div>
              )}
            </div>
            <div className="highlight-location">
              Page {h.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const updateHash = highlight => {
  window.location.hash = `highlight-${highlight.id}`
}
