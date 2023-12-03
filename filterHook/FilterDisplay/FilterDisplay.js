const FilterDisplay = React.createClass({
    displayName: 'FilterDisplay',

    propTypes: {
        filterData: React.PropTypes.arrayOf(React.PropTypes.string.isRequired),
        searchString: React.PropTypes.string,
        isSortEnabled: React.PropTypes.bool.isRequired,
    },

    render: function () {

        const searchResults = this.props.filterData.filter((item, index) => {
            return this.props.searchString ? item.includes(this.props.searchString) : item;
        })

        if (this.props.isSortEnabled) {
            searchResults.sort();
        }

        let resultData = searchResults.map((item, index) => React.DOM.p({ key: index }, item));

        return React.DOM.div(
            { className: 'FilterDisplay' },
            resultData
        )
    },
})