import React from "react"
import { sortBy } from 'lodash'

import './Sidebar.css'

export default function Sidebar({ highlights, onDeleteHighlight, reviewing }) {
  const sortedHighlights = sortBy(highlights, [h => h.position.pageNumber, h => h.position.boundingRect.y1])

  return (
    <div className="Sidebar">
      <div className="instructions">
        <h1>Feedback Me</h1>
        {!reviewing && (
          <p className="directions">
            To create feedback either:
            <ul>
              <li>Highlight text</li>
              <li>Hold Alt/Option key then click-and-drag</li>
            </ul>
          </p>
        )}
      </div>

      <ul className="feedback">
        {sortedHighlights.length === 0 && reviewing && <i style={{ padding: 10 }}>No feedback has been left yet. Check back soon!</i>}
        {sortedHighlights.length === 0 && !reviewing && <p style={{ paddingLeft: 10, paddingRight: 10 }}><i>No feedback left yet</i></p>}

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
