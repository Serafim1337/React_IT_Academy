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
        cbSwitchLockMode: PropTypes.func.isRequired,
    }

    fieldChanged = (e) => {
        this.props.cbSwitchLockMode();
    }

    resultHandler = () => {

    }

    cancelHandler = () => {
        this.props.cbSwitchLockMode();
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
                        value={this.props.itemData ? this.props.itemData.gName : ""}
                        onChange={this.fieldChanged}
                        placeholder='Name'>
                    </input>
                    <input type='text'
                        value={this.props.itemData ? this.props.itemData.gPrice : ""}
                        onChange={this.fieldChanged}
                        placeholder='Price'>
                    </input>
                    <input type='text'
                        value={this.props.itemData ? this.props.itemData.imageURL : ""}
                        onChange={this.fieldChanged}
                        placeholder='Image URL'>
                    </input>
                    <input type='text'
                        value={this.props.itemData ? this.props.itemData.gRemains : ""}
                        onChange={this.fieldChanged}
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
            </div>

        );
    }
};

export default CatalogItemProperties;