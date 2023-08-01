import React from "react";

const withRainbowFrame = colors => Comp => props => {
    return createBlocks(colors, Comp, props);
}

function createBlocks(arr, Comp, props) {
    let currentBlock = arr.shift();
    if (currentBlock) {
        return <div style={{
            border: '10px ' + currentBlock + ' solid',
            padding: '10px'
        }}>
            {createBlocks(arr, Comp, props)}
        </div>
    } else {
        return <Comp {...props}></Comp>;
    }
}

export default withRainbowFrame;