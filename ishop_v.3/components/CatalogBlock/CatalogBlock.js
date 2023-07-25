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
    itemPropertiesActive: false,
    itemPropertiesWorkMode: null,
    itemPropertiesData: null,
    isItemLocked: false,
  };

  itemSelectHandler = (selectedItemId) => {
    this.setState({
      selectedItemId,
      itemPropertiesActive: false,
    });
  };

  deleteItemHandler = (deleteItemId) => {
    confirm('Are you sure?') ?
      this.setState((currState, props) => {
        if (currState.selectedItemId == deleteItemId) {
          currState.selectedItemId = null;
          currState.itemPropertiesActive = false;
        }
        return {
          stateListOfGoods:
            currState.stateListOfGoods.filter(
              (item) => item.gId != deleteItemId)
        };
      }) : null;
  };

  editItemHandler = (editItemId) => {
    this.setState({
      selectedItemId: editItemId,
      itemPropertiesActive: true,
      itemPropertiesWorkMode: 'edit',
      itemPropertiesData: this.state.stateListOfGoods.filter((item) => item.gId == editItemId)[0],
    });
  };

  getEditedItem = (editedItem) => {
    this.setState((currState, props) => {
      return {
        stateListOfGoods: currState.stateListOfGoods.map((item) => {
          if (item.gId == editedItem.gId) {
            item = editedItem;
          }
          return item;
        })
      }
    })
  }

  getNewItem = (newItem) => {
    this.setState((currState, props) => {
      let newListOfGoods = currState.stateListOfGoods;
      newListOfGoods.push(newItem);
      return {
        stateListOfGoods: newListOfGoods
      }
    })
  }

  lockModeOn = () => {
    this.setState({
      isItemLocked: true
    })
  }

  lockModeOff = () => {
    this.setState({
      isItemLocked: false,
      itemPropertiesActive: false,
    });
  }

  newItemHandler = () => {
    this.setState({
      selectedItemId: null,
      itemPropertiesActive: true,
      itemPropertiesWorkMode: 'new',
      itemPropertiesData: {
        gId: this.state.stateListOfGoods[
          this.state.stateListOfGoods.length - 1].gId + 100,
        gName: '',
        gPrice: 0,
        imageURL: '',
        gRemains: 0,
      },
      isItemLocked: true,
    });
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
        cbDeleteItemHandler={this.deleteItemHandler}
        cbEditItemHandler={this.editItemHandler}
        isItemLocked={this.state.isItemLocked} />
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
          onClick={this.newItemHandler}
          disabled={this.state.isItemLocked}>
        </input>

        {this.state.selectedItemId && !this.state.itemPropertiesActive &&
          <CatalogItemShowcase
            itemData={
              this.state.stateListOfGoods.filter(
                (item) => item.gId == this.state.selectedItemId)[0]
            }
          ></CatalogItemShowcase>
        }

        {this.state.itemPropertiesActive &&
          <CatalogItemProperties
            workMode={this.state.itemPropertiesWorkMode}
            itemData={this.state.itemPropertiesData}
            cbLockModeOn={this.lockModeOn}
            cbLockModeOff={this.lockModeOff}
            cbGetEditedItem={this.getEditedItem}
            cbGetNewItem={this.getNewItem}>
          </CatalogItemProperties>
        }

      </Fragment>
    );
  };
};

export default CatalogBlock;