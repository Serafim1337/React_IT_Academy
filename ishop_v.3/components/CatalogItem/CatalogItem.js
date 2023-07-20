import React from "react";
import PropTypes from 'prop-types';

import './CatalogItem.css';

class CatalogItem extends React.Component {

  static propTypes = {
    gId: PropTypes.number.isRequired,
    gName: PropTypes.string.isRequired,
    gPrice: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    gRemains: PropTypes.number.isRequired,
    cbItemSelectHandler: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string,
    cbDeleteItemHandler: PropTypes.func.isRequired,
  };

  itemSelectHandler = (e) => {
    this.props.cbItemSelectHandler(e.currentTarget.dataset.item_id);
  };

  deleteItemHandler = (e) => {
    e.stopPropagation();
    this.props.cbDeleteItemHandler(e.target.dataset.parent_item_id);
  };

  render() {

    return (
      <tr
        className="CatalogItem"
        data-item_id={this.props.gId}
        onClick={this.itemSelectHandler}
        style={{
          backgroundColor:
            (this.props.selectedItemId == this.props.gId) ?
              'orange' : ''
        }}>
        <td className="RowCell">{this.props.gId}</td>
        <td className="RowCell">{this.props.gName}</td>
        <td className="RowCell">{this.props.gPrice}</td>
        <td className="RowCell">
          <img src={this.props.imageURL}></img>
        </td>
        <td className="RowCell">{this.props.gRemains}</td>
        <td className="RowCell">
          <input
            className="DeleteButton"
            type="button"
            value="Delete"
            data-parent_item_id={this.props.gId}
            onClick={this.deleteItemHandler}>
          </input>
        </td>
      </tr >
    );
  };
};

export default CatalogItem;
