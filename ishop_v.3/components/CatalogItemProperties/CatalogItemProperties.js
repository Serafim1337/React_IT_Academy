import React from 'react';
import PropTypes from 'prop-types';

import './CatalogItemProperties.css';

class CatalogItemProperties extends React.Component {

    static propTypes = {
        workMode: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>{this.props.workMode}</div>
        );
    }
};

export default CatalogItemProperties;