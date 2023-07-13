const FilterControls = React.createClass({
    displayName: 'FilterControls',

    propTypes: {
        cbSearchTextChanged: React.PropTypes.func.isRequired,
        cbSortCheckboxChanged: React.PropTypes.func.isRequired,
        cbResetSearch: React.PropTypes.func.isRequired,
    },

    getInitialState: function (e) {
        return {
            isChecked: false,
            searchValue: '',
        }
    },

    searchTextChanged: function (e) {
        this.setState({ searchValue: e.target.value })
        this.props.cbSearchTextChanged(e.target.value);
    },

    sortCheckboxChanged: function (e) {
        this.setState({ isChecked: e.target.checked })
        this.props.cbSortCheckboxChanged(e.target.checked);
    },

    resetSearch: function (e) {
        this.setState({ searchValue: '', isChecked: false })
        this.props.cbResetSearch();
    },

    render: function () {
        return React.DOM.div(
            { className: 'FilterControls' },
            React.DOM.input({
                type: 'checkbox', name: 'sortCheckbox',
                onChange: this.sortCheckboxChanged,
                checked: this.state.isChecked,
            }
            ),
            React.DOM.input({
                type: 'text', name: 'searchField',
                onChange: this.searchTextChanged,
                value: this.state.searchValue
            }),
            React.DOM.input({
                type: 'button', value: 'Сброс',
                onClick: this.resetSearch,
            }),
        )
    },
});