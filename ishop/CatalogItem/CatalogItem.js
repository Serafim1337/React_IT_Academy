const CatalogItem = React.createClass({
  displayName: "CatalogItem",

  propTypes: {
    gId: React.PropTypes.number.isRequired,
    gName: React.PropTypes.string.isRequired,
    gPrice: React.PropTypes.number.isRequired,
    imageURL: React.PropTypes.string.isRequired,
    gRemains: React.PropTypes.number.isRequired,
  },

  render: function () {
    return React.DOM.tr(
      { className: "CatalogRow" },
      React.DOM.td({ className: "RowCell" }, item.gId),
      React.DOM.td({ className: "RowCell" }, item.gName),
      React.DOM.td({ className: "RowCell" }, item.gPrice),
      React.DOM.td(
        { className: "RowCell" },
        React.DOM.img({ src: item.imageURL }, null)
      ),
      React.DOM.td({ className: "RowCell" }, item.gRemains)
    );
  },
});
