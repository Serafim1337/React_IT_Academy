import React from "react";
import PropTypes from 'prop-types';

import './CatalogItemShowcase.css';

class CatalogItemShowcase extends React.Component {

    static propTypes = {
        itemData: PropTypes.shape({
            gId: PropTypes.number.isRequired,
            gName: PropTypes.string.isRequired,
            gPrice: PropTypes.number.isRequired,
            imageURL: PropTypes.string.isRequired,
            gRemains: PropTypes.number.isRequired,
        })

    };

    render() {
        return (
            <div className="CatalogItemShowcase">
                <div className="itemInfo">{this.props.itemData.gName}</div>
                <div className="itemInfo">{this.props.itemData.gPrice}</div>
                <div className="itemInfo">
                    <img src={this.props.itemData.imageURL} />
                </div>
                <div className="itemInfo">{this.props.itemData.gRemains}</div>
            </div>
        );
    };
};

export default CatalogItemShowcase;