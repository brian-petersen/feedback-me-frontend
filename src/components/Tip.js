import React, { Component } from 'react'

import './Tip.css'

class Tip extends Component {
  state = {
    compact: true,
    text: '',
  }

  componentDidUpdate(nextProps, nextState) {
    const { onUpdate } = this.props

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate()
    }
  }

  renderCompact = () => {
    const { onOpen } = this.props

    return (
      <div
        className="Tip__compact"
        onClick={() => {
          onOpen()
          this.setState({ compact: false })
        }}>
        Add Feedback
      </div>
    )
  }

  renderForm = () => {
    const { onConfirm } = this.props
    const { text } = this.state

    return (
      <form
        className="Tip__card"
        onSubmit={event => {
          event.preventDefault()
          onConfirm({ text })
        }}>

        <div>
          <textarea
            width="100%"
            placeholder="Feedback"
            autoFocus
            value={text}
            onChange={event => this.setState({ text: event.target.value })}
            ref={node => {
              if (node) {
                node.focus()
              }
            }}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    )
  }

  render() {
    const { compact } = this.state

    return (
      <div className="Tip">
        {compact ? this.renderCompact() : this.renderForm()}
      </div>
    )
  }
}

export default Tip
