const CatalogBlock = React.createClass({
  displayName: "CatalogBlock",

  propTypes: {
    listOfGoods: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        gId: React.PropTypes.number.isRequired,
        gName: React.PropTypes.string.isRequired,
        gPrice: React.PropTypes.number.isRequired,
        imageURL: React.PropTypes.string.isRequired,
        gRemains: React.PropTypes.number.isRequired,
      })
    ),
    shopName: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return {
      selectedItemId: null,
      stateListOfGoods: this.props.listOfGoods,
    };
  },

  itemSelectHandler: function (selectedItemId) {
    this.setState({ selectedItemId });
  },

  deleteItemHandler: function (deleteItemId) {
    this.setState((currState, props) => {
      return {
        stateListOfGoods:
          currState.stateListOfGoods.filter(
            (item) => item.gId != deleteItemId)
      };
    })
  },

  render: function () {
    const catalogCode = this.state.stateListOfGoods.map((item) =>
      React.createElement(CatalogItem, {
        key: item.gId,
        gId: item.gId,
        gName: item.gName,
        gPrice: item.gPrice,
        imageURL: item.imageURL,
        gRemains: item.gRemains,
        cbItemSelectHandler: this.itemSelectHandler,
        selectedItemId: this.state.selectedItemId,
        cbDeleteItemHandler: this.deleteItemHandler,
      })
    );

    return React.DOM.table(
      { className: "CatalogBlock" },
      React.DOM.thead(
        { className: "CatalogHeader" },
        React.DOM.tr(
          null,
          React.DOM.td(
            { className: "HeaderTitle", colSpan: "6" },
            this.props.shopName
          )
        ),
        React.DOM.tr(
          null,
          React.DOM.th({ className: "HeaderCell" }, "ID"),
          React.DOM.th({ className: "HeaderCell" }, "Name"),
          React.DOM.th({ className: "HeaderCell" }, "Price"),
          React.DOM.th({ className: "HeaderCell" }, "Image"),
          React.DOM.th({ className: "HeaderCell" }, "Remains"),
          React.DOM.th({ className: "HeaderCell" }, "Control")
        )
      ),
      React.DOM.tbody({ className: "TableBody" }, catalogCode)
    );
  },
});
