import React from 'react';

/**
 * Functional component ami ki rendereli a  kiemeli a szöveget meghatározott indexek alapján.
 * @param {Object} props - Component properties.
 * @param {string} props.T - A szöveg.
 * @param {string} props.P - A minta amit kiemel.
 * @param {Array.<number>} props.indices - Amiket ki kell emelni.
 * @returns {JSX.Element} - React JSX element.
 */
const HighlightedText = ({ T, P, indices }) => {
  const renderHighlightedText = () => {
    let currentPosition = 0;
    const result = [];

    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      const beforeText = T.substring(currentPosition, index);
      currentPosition = index + P.length;
      const highlightedText = T.substring(index, currentPosition);
      result.push(
        <React.Fragment key={i}>
          {beforeText}
          <span style={{ backgroundColor: '#5865F2' }}>{highlightedText}</span>
        </React.Fragment>
      );
    }
    result.push(T.substring(currentPosition));

    return result;
  };

  return <div className='output-text'>{renderHighlightedText()}</div>;
};

export default HighlightedText;
