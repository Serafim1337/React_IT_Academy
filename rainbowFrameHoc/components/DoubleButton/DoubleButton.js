import React from "react";
import PropTypes from 'prop-types';

import './DoubleButton.css';

const DoubleButton = props => {

    return (
        <div>
            <input
                type="button"
                value={props.caption1}
                onClick={() => props.cbPressed(1)}>
            </input>
            <span>{props.children}</span>
            <input
                type="button"
                value={props.caption2}
                onClick={() => props.cbPressed(2)}>
            </input>
        </div>
    )
}

DoubleButton.propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
}

export default DoubleButton;
