import React, { Component } from 'react'
import uuid from 'uuid/v4'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
  PdfLoader,
  PdfHighlighter,
  // Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from 'react-pdf-highlighter'

import Tip from './Tip'

import './Feedback.css'

// const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf"
const DEFAULT_URL = 'http://localhost:8003/Resume.pdf'

export default class Feedback extends Component {
  state = {
    highlights: []
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.scrollToHighlightFromHash, false)
  }

  getHighlightById(id) {
    const { highlights } = this.state

    return highlights.find(highlight => highlight.id === id)
  }

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash())

    if (highlight) {
      this.scrollViewerTo(highlight)
    }
  }

  // resetHighlights = () => {
  //   this.setState({
  //     highlights: []
  //   })
  // }

  addHighlight(highlight) {
    const { highlights } = this.state

    this.setState({
      highlights: [{ ...highlight, id: uuid() }, ...highlights]
    })
  }

  updateHighlight(highlightId, position, content) {
    this.setState({
      highlights: this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
              ...h,
              position: { ...h.position, ...position },
              content: { ...h.content, ...content }
            }
          : h
      })
    })
  }

  render() {
    const { highlights } = this.state

    return (
      <div className="Feedback">
        <PdfLoader url={DEFAULT_URL} beforeLoad={<Spinner />}>
          {pdfDocument => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              onScrollChange={() => (window.location.hash = '')}
              scrollRef={scrollTo => {
                this.scrollViewerTo = scrollTo
                this.scrollToHighlightFromHash()
              }}
              enableAreaSelection={e => e.altKey}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection,
              ) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={comment => {
                    console.log(position, content, comment)
                    this.addHighlight({ content, position, comment })
                    hideTipAndSelection()
                  }}
                />
              )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo,
              ) => {
                const isTextHighlight = !Boolean(
                  highlight.content && highlight.content.image
                )

                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    highlight={highlight}
                    onChange={boundingRect => {
                      this.updateHighlight(
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) }
                      )
                    }}
                  />
                )

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={popupContent =>
                      setTip(highlight, highlight => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                    children={component}
                  />
                )
              }}
              highlights={highlights}
            />
         )}
        </PdfLoader>
      </div>
    )
  }
}

const parseIdFromHash = () => window.location.hash.slice('#highlight-'.length)

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null

const Spinner = () => (
  <Icon className="Spinner" icon="spinner" spin />
)
