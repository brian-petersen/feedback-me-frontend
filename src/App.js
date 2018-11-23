import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
        <div className={styles.wrap}>
          <div className={styles.scrollable}>
            <div className={styles.uploader}>
              <Icon icon="plus-circle" />
              <h2>Add your PDF</h2>
              <p>And get feedback</p>
            </div>
      
            <div className={styles.message}>
              <label htmlFor="message">Message</label>
              <textarea name="message" />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.inactive}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
