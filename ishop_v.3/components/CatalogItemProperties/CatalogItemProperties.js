import React from 'react';
import PropTypes from 'prop-types';

import './CatalogItemProperties.css';

class CatalogItemProperties extends React.Component {

    static propTypes = {
        workMode: PropTypes.string.isRequired,
        itemData: PropTypes.shape({
            gId: PropTypes.number,
            gName: PropTypes.string,
            gPrice: PropTypes.number,
            imageURL: PropTypes.string,
            gRemains: PropTypes.number,
        }),
        cbLockModeOn: PropTypes.func.isRequired,
        cbLockModeOff: PropTypes.func.isRequired,
        cbGetEditedItem: PropTypes.func.isRequired,
    }

    state = {
        currentItem: Object.assign({}, this.props.itemData),
    }



    fieldChanged = (e) => {
        this.props.cbLockModeOn();
        let newItem = this.state.currentItem;
        newItem[e.target.name] = e.target.value;
        this.setState({ currentItem: newItem })
        // TODO number types parse
    }

    // TODO validation

    resultHandler = () => {
        switch (this.props.workMode) {
            case 'edit':
                this.props.cbGetEditedItem(this.state.currentItem);
                this.props.cbLockModeOff();
                break;
            case 'new':
                // TODO new item add
                break;
        }
    }

    cancelHandler = () => {
        console.log('cancel');
        this.props.cbLockModeOff();
    }

    render() {
        return (

            <div className='CatalogItemProperties'>
                <h2>
                    {
                        this.props.workMode == 'edit' ?
                            'Edit Item' :
                            'Add new Item'
                    }
                </h2>
                <form className='PropertiesForm'>
                    <input type='text'
                        value={this.props.itemData ? this.state.currentItem.gName : ""}
                        onChange={this.fieldChanged}
                        name='gName'
                        placeholder='Name'>
                    </input>
                    <input type='text'
                        value={this.props.itemData ? this.state.currentItem.gPrice : ""}
                        onChange={this.fieldChanged}
                        name='gPrice'
                        placeholder='Price'>
                    </input>
                    <input type='text'
                        value={this.props.itemData ? this.state.currentItem.imageURL : ""}
                        onChange={this.fieldChanged}
                        name='imageURL'
                        placeholder='Image URL'>
                    </input>
                    <input type='text'
                        value={this.props.itemData ? this.state.currentItem.gRemains : ""}
                        onChange={this.fieldChanged}
                        name='gRemains'
                        placeholder='Remain Quantity'>
                    </input>
                </form>
                <div className='PropertiesControls'>
                    <input type='button'
                        value={this.props.workMode == 'edit' ? 'Save' : "Add"}
                        onClick={this.resultHandler}>
                    </input>
                    <input type='button'
                        value={"Cancel"}
                        onClick={this.cancelHandler}>
                    </input>
                </div>
            </div >

        );
    }
};

export default CatalogItemProperties;