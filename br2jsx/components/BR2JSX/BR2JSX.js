import React from "react";
import PropTypes from 'prop-types';

import './BR2JSX.css';

function BR2JSX(props) {
    let codeStr = props.text.slice(0, props.text.length);

    codeStr = codeStr
        .replace(/<br\/>/, ' <br/> ')
        .replace(/<br\s\/>/, ' <br/> ')
        .replace(/<br>/, ' <br/> ');
    //не смог объединить в одно регулярное выражение

    let jsxArray = codeStr.split(' ').map(item => item == '<br/>' ? <br /> : item);

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