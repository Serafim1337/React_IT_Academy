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
    cbEditItemHandler: PropTypes.func.isRequired,
    isItemLocked: PropTypes.bool.isRequired,
  };

  state = {
  };


  itemSelectHandler = (e) => {
    if (this.props.isItemLocked) {
      return;
    }
    this.props.cbItemSelectHandler(e.currentTarget.dataset.item_id);
  };

  deleteItemHandler = (e) => {
    e.stopPropagation();
    this.props.cbDeleteItemHandler(e.target.dataset.parent_item_id);
  };

  editItemHandler = (e) => {
    e.stopPropagation();
    this.props.cbEditItemHandler(e.target.dataset.parent_item_id);
    this.setState({ isEditClicked: true })
  }

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
            className="EditButton"
            type="button"
            value="Edit"
            data-parent_item_id={this.props.gId}
            onClick={this.editItemHandler}
            disabled={this.props.isItemLocked}>
          </input>
        </td>
        <td className="RowCell">
          <input
            className="DeleteButton"
            type="button"
            value="Delete"
            data-parent_item_id={this.props.gId}
            onClick={this.deleteItemHandler}
            disabled={this.props.isItemLocked}>
          </input>
        </td>
      </tr >
    );
  };
};

export default CatalogItem;
