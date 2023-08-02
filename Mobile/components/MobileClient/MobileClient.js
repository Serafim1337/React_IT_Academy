import React from "react";
import PropTypes from "prop-types";

import "./MobileClient.css"

import mobileEvents from "../eventFlow";

class MobileClient extends React.PureComponent {
    static propTypes = {
        clientInfo: PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            secondName: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        })
    }

    deleteHandler = () => {
        mobileEvents.emit('clientDelete', this.props.clientInfo.id);
    }

    render() {
        console.log('MobileClient ' + this.props.clientInfo.id + ' render');
        return (
            <tr className="MobileClient">
                <th scope="row">{this.props.clientInfo.id}</th>
                <td>{this.props.clientInfo.firstName}</td>
                <td>{this.props.clientInfo.secondName}</td>
                <td>{this.props.clientInfo.surname}</td>
                <td>{this.props.clientInfo.balance}</td>
                <td>status</td>
                <td><button
                    type="button"
                    className="btn btn-outline-warning">
                    Редактировать
                </button></td>
                <td><button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={this.deleteHandler}>
                    Удалить
                </button></td>
            </tr>
        )
    }
}

export default MobileClient;