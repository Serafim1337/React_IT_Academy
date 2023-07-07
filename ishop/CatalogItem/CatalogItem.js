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
      { className: "CatalogItem" },
      React.DOM.td({ className: "RowCell" }, this.props.gId),
      React.DOM.td({ className: "RowCell" }, this.props.gName),
      React.DOM.td({ className: "RowCell" }, this.props.gPrice),
      React.DOM.td(
        { className: "RowCell" },
        React.DOM.img({ src: this.props.imageURL }, null)
      ),
      React.DOM.td({ className: "RowCell" }, this.props.gRemains)
    );
  },
});
