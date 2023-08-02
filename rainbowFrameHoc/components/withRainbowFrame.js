import React from "react";

const withRainbowFrame = colors => Comp => props => {
    let jsxResult = <Comp {...props}></Comp >;
    for (let color of colors) {
        jsxResult = <div style={{
            border: '10px ' + color + ' solid',
            padding: '10px'
        }}>
            {jsxResult}
        </div>
    }

    return jsxResult;
}

export default withRainbowFrame;