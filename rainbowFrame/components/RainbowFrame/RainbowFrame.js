import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

function RainbowFrame(props) {
    return createBlocks(props.colorsList.slice(), props.children);
}

RainbowFrame.propTypes = {
    colorsList: PropTypes.arrayOf(PropTypes.string.isRequired),
}

function createBlocks(arr, childProp) {
    let currentBlock = arr.shift();
    if (currentBlock) {
        return <div style={{
            border: '10px ' + currentBlock + ' solid',
            padding: '10px'
        }}>
            {createBlocks(arr, childProp)}
        </div>
    } else {
        return childProp;
    }
}

export default RainbowFrame;



