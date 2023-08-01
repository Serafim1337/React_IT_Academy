import React from "react";
import PropTypes from 'prop-types';

import './BR2JSX.css';

function BR2JSX(props) {
    let codeStr = props.text;

    codeStr = codeStr
        .replace(/<br\/>/, '<br/>')
        .replace(/<br\s\/>/, '<br/>')
        .replace(/<br>/, '<br/>');

    let jsxArray = [];

    codeStr.split('<br/>').forEach((item, index) => {
        if (index) {
            jsxArray.push(<br />, item);
        } else {
            jsxArray.push(item);
        }
    })

    return (
        <div style={{ backgroundColor: "green", padding: '10px' }}>
            {jsxArray}
        </div>
    )

}

BR2JSX.propTypes = {
    text: PropTypes.string.isRequired,
}

export default BR2JSX;