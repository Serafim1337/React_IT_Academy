const CatalogItem = React.createClass({
  displayName: "CatalogItem",

  propTypes: {
    gId: React.PropTypes.number.isRequired,
    gName: React.PropTypes.string.isRequired,
    gPrice: React.PropTypes.number.isRequired,
    imageURL: React.PropTypes.string.isRequired,
    gRemains: React.PropTypes.number.isRequired,
    cbItemSelectHandler: React.PropTypes.func.isRequired,
    selectedItemId: React.PropTypes.string,
    cbDeleteItemHandler: React.PropTypes.func.isRequired,
  },

  itemSelectHandler: function (e) {
    if (e.target.value != 'Delete') {
      this.props.cbItemSelectHandler(e.currentTarget.dataset.item_id);
    }
  },

  deleteItemHandler: function (e) {
    this.props.cbDeleteItemHandler(e.target.dataset.parent_item_id);
  },

  render: function () {
    return React.DOM.tr(
      {
        className: "CatalogItem",
        'data-item_id': this.props.gId,
        onClick: this.itemSelectHandler,
        style: {
          backgroundColor:
            (this.props.selectedItemId == this.props.gId) ?
              'orange' : ''
        },
      },
      React.DOM.td({ className: "RowCell" }, this.props.gId),
      React.DOM.td({ className: "RowCell" }, this.props.gName),
      React.DOM.td({ className: "RowCell" }, this.props.gPrice),
      React.DOM.td(
        { className: "RowCell" },
        React.DOM.img({ src: this.props.imageURL }, null)
      ),
      React.DOM.td({ className: "RowCell" }, this.props.gRemains),
      React.DOM.td({ className: "RowCell" },
        React.DOM.input({
          className: 'DeleteButton',
          type: 'button',
          value: 'Delete',
          'data-parent_item_id': this.props.gId,
          onClick: this.deleteItemHandler,
        })
      ),
    );
  },
});
