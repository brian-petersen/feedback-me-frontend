import React, { Component } from 'react'

// import { Document, Page } from 'react-pdf'

// import URLSearchParams from "url-search-params";

import {
  PdfLoader,
  PdfHighlighter,
  // Tip,
  // Highlight,
  // Popup,
  // AreaHighlight
} from 'react-pdf-highlighter'

// import testHighlights from "./test-highlights";\\\

// import Spinner from "./Spinner";
// import Sidebar from "./Sidebar";

// import type { T_Highlight, T_NewHighlight } from "../../src/types";

// import "./style/App.css";

// type T_ManuscriptHighlight = T_Highlight;

// type Props = {};

// type State = {
//   highlights: Array<T_ManuscriptHighlight>
// };

// const getNextId = () => String(Math.random()).slice(2);

// const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

// const resetHash = () => {
//   window.location.hash = "";
// };

// const HighlightPopup = ({ comment }) =>
//   comment.text ? (
//     <div className="Highlight__popup">
//       {comment.emoji} {comment.text}
//     </div>
//   ) : null;

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

// const searchParams = new URLSearchParams(window.location.search);
// const url = searchParams.get("url") || DEFAULT_URL;

export default class Feedback extends Component {
  // state = {
  //   highlights: []
  // };

  // resetHighlights = () => {
  //   this.setState({
  //     highlights: []
  //   });
  // };

  // scrollViewerTo = (highlight: any) => {};

  // scrollToHighlightFromHash = () => {
  //   const highlight = this.getHighlightById(parseIdFromHash());

  //   if (highlight) {
  //     this.scrollViewerTo(highlight);
  //   }
  // };

  // componentDidMount() {
  //   window.addEventListener(
  //     "hashchange",
  //     this.scrollToHighlightFromHash,
  //     false
  //   );
  // }

  // getHighlightById(id: string) {
  //   const { highlights } = this.state;

  //   return highlights.find(highlight => highlight.id === id);
  // }

  // addHighlight(highlight: T_NewHighlight) {
  //   const { highlights } = this.state;

  //   console.log("Saving highlight", highlight);

  //   this.setState({
  //     highlights: [{ ...highlight, id: getNextId() }, ...highlights]
  //   });
  // }

  // updateHighlight(highlightId: string, position: Object, content: Object) {
  //   console.log("Updating highlight", highlightId, position, content);

  //   this.setState({
  //     highlights: this.state.highlights.map(h => {
  //       return h.id === highlightId
  //         ? {
  //             ...h,
  //             position: { ...h.position, ...position },
  //             content: { ...h.content, ...content }
  //           }
  //         : h;
  //     })
  //   });
  // }

  render() {
    // const { highlights } = this.state;

    // console.log('hi')

    // return <p>test</p>

    return (
      <div>
        <PdfLoader url={DEFAULT_URL} beforeLoad={<div />}>
        {pdfDocument => {
          console.log(pdfDocument)
              return <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                // onScrollChange={resetHash}
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  // this.scrollToHighlightFromHash();
                }}
                // onSelectionFinished={(
                //   position,
                //   content,
                //   hideTipAndSelection,
                //   transformSelection
                // ) => (
                //   <Tip
                //     onOpen={transformSelection}
                //     onConfirm={comment => {
                //       this.addHighlight({ content, position, comment });

                //       hideTipAndSelection();
                //     }}
                //   />
                // )}
                // highlightTransform={(
                //   highlight,
                //   index,
                //   setTip,
                //   hideTip,
                //   viewportToScaled,
                //   screenshot,
                //   isScrolledTo
                // ) => {
                //   const isTextHighlight = !Boolean(
                //     highlight.content && highlight.content.image
                //   );

                //   const component = isTextHighlight ? (
                //     <Highlight
                //       isScrolledTo={isScrolledTo}
                //       position={highlight.position}
                //       comment={highlight.comment}
                //     />
                //   ) : (
                //     <AreaHighlight
                //       highlight={highlight}
                //       onChange={boundingRect => {
                //         this.updateHighlight(
                //           highlight.id,
                //           { boundingRect: viewportToScaled(boundingRect) },
                //           { image: screenshot(boundingRect) }
                //         );
                //       }}
                //     />
                //   );

                //   return (
                //     <Popup
                //       popupContent={<HighlightPopup {...highlight} />}
                //       onMouseOver={popupContent =>
                //         setTip(highlight, highlight => popupContent)
                //       }
                //       onMouseOut={hideTip}
                //       key={index}
                //       children={component}
                //     />
                  // );
                // }}
                // highlights={highlights}
              />
            }}
        </PdfLoader>
      </div>
    )
  }
}
