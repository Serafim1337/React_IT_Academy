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

  render: function () {
    const catalogCode = this.props.listOfGoods.map((item) =>
      React.createElement(CatalogItem, {
        key: item.gId,
        gId: item.gId,
        gName: item.gName,
        gPrice: item.gPrice,
        imageURL: item.imageURL,
        gRemains: item.gRemains,
      })
    );

    return React.DOM.table(
      { className: "CatalogBlock" },
      React.DOM.thead(
        { className: "CatalogHeader" },
        React.DOM.tr(
          null,
          React.DOM.td(
            { className: "HeaderTitle", colSpan: "5" },
            this.props.shopName
          )
        ),
        React.DOM.tr(
          null,
          React.DOM.th({ className: "HeaderCell" }, "ID"),
          React.DOM.th({ className: "HeaderCell" }, "Name"),
          React.DOM.th({ className: "HeaderCell" }, "Price"),
          React.DOM.th({ className: "HeaderCell" }, "Image"),
          React.DOM.th({ className: "HeaderCell" }, "Remains")
        )
      ),
      React.DOM.tbody({ className: "TableBody" }, catalogCode)
    );
  },
});
