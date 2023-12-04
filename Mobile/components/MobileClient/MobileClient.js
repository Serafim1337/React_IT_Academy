import React from "react";
import PropTypes from "prop-types";

import "./MobileClient.css";

import mobileEvents from "../eventFlow";

class MobileClient extends React.PureComponent {
  static propTypes = {
    clientInfo: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      secondName: PropTypes.string,
      surname: PropTypes.string,
      balance: PropTypes.number,
    }),
  };

  state = {
    stateClientInfo: this.props.clientInfo,
    isEditMode: this.props.clientInfo.firstName == null ? true : false,
    isBlocked: this.props.clientInfo.balance < 0,
  };

  componentDidUpdate(oldProps, oldState) {
    if (this.props.clientInfo != oldState.stateClientInfo) {
      this.setState({
        stateClientInfo: this.props.clientInfo,
        isEditMode: false,
        isBlocked: this.props.clientInfo.balance < 0,
      });
    }
  }

  firstNameRef = React.createRef();
  secondNameRef = React.createRef();
  surnameRef = React.createRef();
  balanceRef = React.createRef();

  deleteHandler = () => {
    mobileEvents.emit("clientDelete", this.state.stateClientInfo.id);
  };

  editHandler = () => {
    this.setState({ isEditMode: true });
  };

  saveHandler = () => {
    let editedClientInfo = {
      id: this.state.stateClientInfo.id,
      firstName: this.firstNameRef.current.value,
      secondName: this.secondNameRef.current.value,
      surname: this.surnameRef.current.value,
      balance: parseFloat(this.balanceRef.current.value),
    };

    mobileEvents.emit("clientSave", editedClientInfo);
  };

  render() {
    return (
      <tr className="MobileClient">
        <th scope="row">{this.state.stateClientInfo.id}</th>
        <td>
          {this.state.isEditMode ? (
            <input
              type="text"
              defaultValue={this.state.stateClientInfo.firstName}
              ref={this.firstNameRef}
            ></input>
          ) : (
            this.state.stateClientInfo.firstName
          )}
        </td>
        <td>
          {this.state.isEditMode ? (
            <input
              type="text"
              defaultValue={this.state.stateClientInfo.secondName}
              ref={this.secondNameRef}
            ></input>
          ) : (
            this.state.stateClientInfo.secondName
          )}
        </td>
        <td>
          {this.state.isEditMode ? (
            <input
              type="text"
              defaultValue={this.state.stateClientInfo.surname}
              ref={this.surnameRef}
            ></input>
          ) : (
            this.state.stateClientInfo.surname
          )}
        </td>
        <td>
          {this.state.isEditMode ? (
            <input
              type="number"
              defaultValue={this.state.stateClientInfo.balance}
              ref={this.balanceRef}
            ></input>
          ) : (
            this.state.stateClientInfo.balance
          )}
        </td>
        {this.state.isBlocked ? (
          <td className="clientBlocked">Заблокирован</td>
        ) : (
          <td className="clientActive">Активен</td>
        )}
        <td>
          {this.state.isEditMode ? (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={this.saveHandler}
            >
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={this.editHandler}
            >
              Редактировать
            </button>
          )}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={this.deleteHandler}
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  }
}

export default MobileClient;
