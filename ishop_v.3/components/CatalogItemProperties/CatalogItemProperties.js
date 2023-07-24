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
        saveDisabled: false,
        gNameFieldValidStatus: true,
        gPriceFieldValidStatus: true,
        imageURLFieldValidStatus: true,
        gRemainsFieldValidStatus: true,
    }

    componentDidUpdate = (oldProps, oldState) => {
        if (oldState.currentItem.gId != this.props.itemData.gId) {
            this.setState({ currentItem: Object.assign({}, this.props.itemData) })
        }
    }

    fieldChanged = (e) => {
        this.props.cbLockModeOn();
        let newItem = this.state.currentItem;
        newItem[e.target.name] = e.target.value;
        this.setState({ currentItem: newItem, saveDisabled: true })
    }

    fieldBlur = (e) => {
        let gNameIsValid;
        let gPriceIsValid;
        let imageURLIsValid;
        let gRemainsIsValid;
        switch (e.target.name) {
            case 'gName':
                gNameIsValid = this.gNameValidator(e.target.value);
                this.setState({
                    gNameFieldValidStatus: gNameIsValid,
                }, this.isSaveAvailable)
                break;
            case 'gPrice':
                gPriceIsValid = this.gPriceValidator(e.target.value);
                this.setState({
                    gPriceFieldValidStatus: gPriceIsValid,
                }, this.isSaveAvailable)
                break;
            case 'imageURL':
                imageURLIsValid = this.imageURLValidator(e.target.value);
                this.setState({
                    imageURLFieldValidStatus: imageURLIsValid,
                }, this.isSaveAvailable)
                break;
            case 'gRemains':
                gRemainsIsValid = this.gRemainsValidator(e.target.value);
                this.setState({
                    gRemainsFieldValidStatus: gRemainsIsValid,
                }, this.isSaveAvailable)
                break;
            default:
                console.log('error invalid field name');
        }

    }

    gNameValidator(fieldValue) {
        let regExp = /[А-Я]{1}[а-я]+/;
        return regExp.test(fieldValue);
    }

    gPriceValidator(fieldValue) {
        let regExp = /((^\d+$)|(^\d+\.?\d+$))/;
        return regExp.test(fieldValue);
    }

    imageURLValidator(fieldValue) {
        let regExp = /^(https:\/\/)/;
        return regExp.test(fieldValue);
    }

    gRemainsValidator(fieldValue) {
        let regExp = /(^\d+$)/;
        return regExp.test(fieldValue);
    }

    isSaveAvailable = () => {
        if (this.state.gNameFieldValidStatus &&
            this.state.gPriceFieldValidStatus &&
            this.state.imageURLFieldValidStatus &&
            this.state.gRemainsFieldValidStatus) {
            this.setState({ saveDisabled: false })
        }
    }

    resultHandler = () => {
        switch (this.props.workMode) {
            case 'edit':
                // number type validation before save
                let item = this.state.currentItem;
                item.gPrice = parseFloat(item.gPrice);
                item.gRemains = parseInt(item.gRemains);

                this.props.cbGetEditedItem(item);
                this.props.cbLockModeOff();
                break;
            case 'new':
                // TODO new item add
                break;
        }
    }

    cancelHandler = () => {
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
                    <label className='FieldBlock'>
                        <input type='text'
                            value={this.props.itemData ? this.state.currentItem.gName : ""}
                            onChange={this.fieldChanged}
                            name='gName'
                            placeholder='Name'
                            onBlur={this.fieldBlur}>
                        </input>
                        {this.state.gNameFieldValidStatus ||
                            <div style={{ color: 'red' }}>Поле должно начинаться со слова на русском языке с большой буквы</div>
                        }
                    </label>
                    <label>
                        <input type='text'
                            value={this.props.itemData ? this.state.currentItem.gPrice : ""}
                            onChange={this.fieldChanged}
                            name='gPrice'
                            placeholder='Price'
                            onBlur={this.fieldBlur}>
                        </input>
                        {this.state.gPriceFieldValidStatus ||
                            <div style={{ color: 'red' }}>Поле должно быть числом, возможно дробным через точку</div>
                        }
                    </label>
                    <label>
                        <input type='text'
                            value={this.props.itemData ? this.state.currentItem.imageURL : ""}
                            onChange={this.fieldChanged}
                            name='imageURL'
                            placeholder='Image URL'
                            onBlur={this.fieldBlur}>
                        </input>
                        {this.state.imageURLFieldValidStatus ||
                            <div style={{ color: 'red' }}>Поле должно начинаться с "https://"</div>
                        }
                    </label>
                    <label>
                        <input type='text'
                            value={this.props.itemData ? this.state.currentItem.gRemains : ""}
                            onChange={this.fieldChanged}
                            name='gRemains'
                            placeholder='Remain Quantity'
                            onBlur={this.fieldBlur}>
                        </input>
                        {this.state.gRemainsFieldValidStatus ||
                            <div style={{ color: 'red' }}>Поле должно быть целым числом</div>
                        }
                    </label>
                </form>
                <div className='PropertiesControls'>
                    <input type='button'
                        value={this.props.workMode == 'edit' ? 'Save' : "Add"}
                        onClick={this.resultHandler}
                        disabled={this.state.saveDisabled}>
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