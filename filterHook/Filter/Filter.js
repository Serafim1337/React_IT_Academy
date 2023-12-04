const Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        filterData: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        )
    },

    getInitialState: function () {
        return {
            searchString: null,
            isSortEnabled: false,
        }
    },

    searchTextChanged: function (searchString) {
        this.setState({ searchString });
    },

    sortCheckboxChanged: function (isSortEnabled) {
        this.setState({ isSortEnabled });
    },

    resetSearch: function () {
        this.setState({
            searchString: null,
            isSortEnabled: false
        })
    },

    render: function () {
        return React.DOM.div(
            { className: 'Filter' },
            React.createElement(FilterControls, {
                cbSearchTextChanged: this.searchTextChanged,
                cbSortCheckboxChanged: this.sortCheckboxChanged,
                cbResetSearch: this.resetSearch,
            }),
            React.createElement(FilterDisplay, {
                filterData: this.props.filterData,
                searchString: this.state.searchString,
                isSortEnabled: this.state.isSortEnabled,
            })
        );
    },

});