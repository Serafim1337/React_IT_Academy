import React, { Fragment } from "react";
import PropTypes from 'prop-types';

import './CatalogBlock.css';

import CatalogItem from '../CatalogItem/CatalogItem';
import CatalogItemShowcase from "../CatalogItemShowcase/CatalogItemShowcase";
import CatalogItemProperties from '../CatalogItemProperties/CatalogItemProperties'

class CatalogBlock extends React.Component {

  static propTypes = {
    listOfGoods: PropTypes.arrayOf(
      PropTypes.shape({
        gId: PropTypes.number.isRequired,
        gName: PropTypes.string.isRequired,
        gPrice: PropTypes.number.isRequired,
        imageURL: PropTypes.string.isRequired,
        gRemains: PropTypes.number.isRequired,
      })
    ),
    shopName: PropTypes.string.isRequired,
  };

  state = {
    selectedItemId: null,
    stateListOfGoods: this.props.listOfGoods,
  };

  itemSelectHandler = (selectedItemId) => {
    this.setState({ selectedItemId });
  };

  deleteItemHandler = (deleteItemId) => {
    confirm('Are you sure?') ?
      this.setState((currState, props) => {
        if (currState.selectedItemId == deleteItemId) {
          currState.selectedItemId = null;
        }
        return {
          stateListOfGoods:
            currState.stateListOfGoods.filter(
              (item) => item.gId != deleteItemId)
        };
      }) : null;
  };

  render() {
    const catalogCode = this.state.stateListOfGoods.map((item) =>
      <CatalogItem
        key={item.gId}
        gId={item.gId}
        gName={item.gName}
        gPrice={item.gPrice}
        imageURL={item.imageURL}
        gRemains={item.gRemains}
        cbItemSelectHandler={this.itemSelectHandler}
        selectedItemId={this.state.selectedItemId}
        cbDeleteItemHandler={this.deleteItemHandler} />
    );

    return (
      <Fragment>
        <table className="CatalogBlock">
          <thead className="CatalogHeader">
            <tr>
              <td className="HeaderTitle" colSpan={7}>
                {this.props.shopName}
              </td>
            </tr>
            <tr>
              <th className="HeaderCell">ID</th>
              <th className="HeaderCell">Name</th>
              <th className="HeaderCell">Price</th>
              <th className="HeaderCell">Image</th>
              <th className="HeaderCell">Remains</th>
              <th className="HeaderCell" colSpan={2}>Control</th>
            </tr>
          </thead>
          <tbody className="TableBody">
            {catalogCode}
          </tbody>
        </table>
        <input
          className="NewItemButton"
          type="button"
          value="New product"
          data-parent_item_id={this.props.gId}
          onClick={this.deleteItemHandler}>
        </input>

        {this.state.selectedItemId &&
          <CatalogItemShowcase
            itemData={
              this.state.stateListOfGoods.filter(
                (item) => item.gId == this.state.selectedItemId)[0]
            }
          ></CatalogItemShowcase>
        }

      </Fragment>
    );
  };
};

export default CatalogBlock;