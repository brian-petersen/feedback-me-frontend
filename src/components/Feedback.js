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
import axios from 'axios'

import Tip from './Tip'
import Sidebar from './Sidebar'

import './Feedback.css'

export default class Feedback extends Component {
  state = {
    highlights: [],
    loading: true,
    error: false,
    pdfData: null,
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.scrollToHighlightFromHash, false)

    this.fetchPdf()
    this.fetchContent()
  }

  componentDidUpdate() {
    this.updateContent()
  }

  get reviewing() {
    return this.props.match.path.startsWith('/review')
  }

  get id() {
    return this.props.match.params.key
  }

  fetchPdf = async () => {
    try {
      this.setState({ loading: true })
      const res = await axios.get(`/api/pdf/${this.id}`, { responseType: 'arraybuffer' })
      this.setState({ loading: false, pdfData: res.data })
    }
    catch (err) {
      this.setState({ loading: false, error: true })
    }
  }

  fetchContent = async () => {
    if (!this.reviewing) {
      try {
        const res = await axios.get(`/api/feedback/${this.id}`)

        if (res.data.hasOwnProperty('highlights')) {
          this.setState({
            highlights: res.data.highlights,
          })
        }
      }
      catch (err) {
      }
    }
    else {
      try {
        const res = await axios.get(`/api/review/${this.id}`)

        const highlights = []
        res.data.forEach(e => {
          if (e.hasOwnProperty('highlights')) {
            highlights.push(...e.highlights)
          }
        })

        this.setState({ highlights })
      }
      catch (err) {
      }
    }
  }

  updateContent = async () => {
    if (!this.reviewing) {
      const { highlights } = this.state

      axios.post(`/api/feedback/${this.id}`, { highlights })
    }
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

  addHighlight(highlight) {
    if (!this.reviewing) {
      const { highlights } = this.state

      this.setState({
        highlights: [{ ...highlight, id: uuid(), created: Date.now() }, ...highlights]
      })
    }
  }

  handleUpdateHighlight(highlightId, position, content) {
    if (!this.reviewing) {
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
  }

  handleDeleteHighlight = (id) => {
    if (!this.reviewing) {
      this.setState({
        highlights: this.state.highlights.reduce((highlights, highlight) => {
          if (highlight.id !== id) {
            highlights.push(highlight)
          }

          return highlights
        }, [])
      })
    }
  }

  render() {
    const { highlights, loading, error, pdfData } = this.state

    if (error) {
      return <p>Uh oh!</p>
    }

    if (loading) {
      return <Spinner />
    }

    return (
      <div className="Feedback">
        <Sidebar
          highlights={highlights}
          onDeleteHighlight={this.handleDeleteHighlight}
          reviewing={this.reviewing}
        />

        <div className="pdf-wrap">
          <PdfLoader url={{ data: pdfData }} beforeLoad={<Spinner />}>
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
                ) => {
                  if (this.reviewing) {
                    return null
                  }

                  return (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={comment => {
                        this.addHighlight({ content, position, comment })

                        hideTipAndSelection()
                      }}
                    />
                  )
                }}
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
                        this.handleUpdateHighlight(
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
                        setTip(highlight, _ => popupContent)
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
