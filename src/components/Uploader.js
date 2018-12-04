import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import axios from 'axios'

import styles from './Uploader.module.scss'

export default class Uploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedFile: null,
      uploadedKey: null,
      hasError: false,
    }

    this.upload = React.createRef()
  }

  componentDidMount() {
    document.body.classList.add('has-background')
  }

  componentWillUmount() {
    document.body.classList.remove('has-background')
  }

  canUpload = () => {
    const { selectedFile } = this.state

    return !!selectedFile
  }

  handleFileChange = (e) => {
    if (e.target.files.length === 1) {
      this.setState({ selectedFile: e.target.files.item(0) })
    }
  }

  handleUpload = async () => {
    const { selectedFile } = this.state

    if (this.canUpload()) {
      try {
        const formData = new FormData()
        formData.append('userfile', selectedFile)

        const res = await axios.post('https://brandon-twede.net/feedback/upload.php', formData)

        this.setState({ uploadedKey: res.data })
      }
      catch (err) {
        console.error(err)

        this.setState({ hasError: true })
      }
    }
    else {
      console.log('TODO show error')
    }
  }

  renderUploader = () => {
    const { selectedFile } = this.state

    if (selectedFile) {
      return (
        <div className={styles.selectedFile}>
          <p className={styles.fileName}>{selectedFile.name}</p>
          <button
            className={styles.clearButton}
            onClick={() => this.setState({ selectedFile: null })}>
            Clear
          </button>
        </div>
      )
    }

    return (
      <div className={styles.uploader} onClick={() => this.upload.current.click()}>
        <input ref={this.upload} type="file" accept="application/pdf" hidden onChange={this.handleFileChange} />
        <Icon icon="plus-circle" />
        <h2>Add your PDF</h2>
        <p>And get feedback</p>
      </div>
    )
  }

  renderUploaderWrap = () => {
    return (
      <Fragment>
        <div className={styles.scrollable}>
          {this.renderUploader()}

          <div className={styles.message}>
            <label htmlFor="message">Message</label>
            <textarea name="message" />
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={classnames({ [styles.inactive]: !this.canUpload() })}
            onClick={this.handleUpload}>
            Upload
          </button>
        </div>
      </Fragment>
    )
  }

  renderUploaded = () => {
    const { uploadedKey } = this.state

    const feedbackUrl = generateFeedbackUrl(uploadedKey)
    const reviewUrl = generateReviewUrl(uploadedKey)

    return (
      <div className={styles.uploaded}>
        <p>You're Ready!</p>

        <div className={styles.shareLink}>
          <div className={styles.linkLabel}>Feedback Url</div>
          <hr />
          <div className={styles.linkWrap}>
            <a href={feedbackUrl} target="_blank">{feedbackUrl}</a>
          </div>
        </div>

        <div className={styles.shareLink}>
          <div className={styles.linkLabel}>Review Url</div>
          <hr />
          <div className={styles.linkWrap}>
            <a href={reviewUrl} target="_blank">{reviewUrl}</a>
          </div>
        </div>

        <p className={styles.instructions}>
          Share the Feedback Url to receive feedback. Save the Review Url to see feedback later.
        </p>

        <button
          className={styles.clearButton}
          onClick={() => this.setState({ selectedFile: null, uploadedKey: false })}>
          Upload Another
        </button>
      </div>
    )
  }

  renderError = () => {
    return (
      <div className={styles.error}>
        <p>Uh oh!</p>
        <p>Something went wrong while uploading your PDF. Try again later.</p>
        <button
          className={styles.clearButton}
          onClick={() => this.setState({ selectedFile: null, hasError: false })}>
          Clear
        </button>
      </div>
    )
  }

  renderBody = () => {
    const { uploadedKey, hasError } = this.state

    if (hasError) {
      return this.renderError()
    }

    if (uploadedKey) {
      return this.renderUploaded()
    }

    return this.renderUploaderWrap()
  }

  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
        <div className={styles.wrap}>
          {this.renderBody()}
        </div>
      </div>
    )
  }
}

function generateFeedbackUrl(key) {
  return `${document.location.href}feedback/${key}`
}

function generateReviewUrl(key) {
  return `${document.location.href}review/${key}`
}