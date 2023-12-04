import React from "react";
import PropTypes from "prop-types";

import "./MobileBlock.css";

import MobileClient from "../MobileClient/MobileClient";

import mobileEvents from "../eventFlow";

class MobileBlock extends React.PureComponent {
  static propTypes = {
    clientsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        secondName: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    stateClientsList: this.props.clientsList,
    sortMode: 0, // 0 - all, 1 - sorted by active, 2 - sorted by blocked
  };

  componentDidMount() {
    mobileEvents.addListener("clientDelete", this.deleteHandler);
    mobileEvents.addListener("clientSave", this.saveHandler);
  }

  componentWillUnmount() {
    mobileEvents.removeListener("clientDelete", this.deleteHandler);
    mobileEvents.removeListener("clientSave", this.saveHandler);
  }

  deleteHandler = (clientId) => {
    let newClients = [...this.state.stateClientsList];
    for (let i = 0; i < newClients.length; i++) {
      if (newClients[i].id == clientId) {
        newClients.splice(i, 1);
      }
    }
    this.setState({ stateClientsList: newClients });
  };

  saveHandler = (editedClientInfo) => {
    let newClients = [...this.state.stateClientsList];
    for (let i = 0; i < newClients.length; i++) {
      if (newClients[i].id == editedClientInfo.id) {
        newClients[i] = { ...newClients[i], ...editedClientInfo };
      }
    }
    this.setState({ stateClientsList: newClients });
  };

  addClientHandler = () => {
    const newClients = [...this.state.stateClientsList];
    const newClientId = newClients.length
      ? newClients.slice(-1)[0].id + 1
      : 100; //if no clients exist, new client will have id 100, else last client id + 1
    newClients.push({
      id: newClientId,
      firstName: null,
      secondName: null,
      surname: null,
      balance: 0,
    });
    this.setState({ stateClientsList: newClients });
  };

  sortBy = (e) => {
    const { sorttype } = e.target.dataset;
    this.setState({ sortMode: parseInt(sorttype) });
  };

  render() {
    let clientsSorted = this.state.stateClientsList;

    if (this.state.sortMode === 1) {
      clientsSorted = clientsSorted.filter((client) => client.balance >= 0);
    } else if (this.state.sortMode === 2) {
      clientsSorted = clientsSorted.filter((client) => client.balance < 0);
    }

    return (
      <div className="MobileBlock">
        <button
          data-sortType="0"
          type="button"
          className="btn btn-secondary"
          onClick={this.sortBy}
        >
          Все
        </button>
        <button
          data-sortType="1"
          type="button"
          className="btn btn-secondary"
          onClick={this.sortBy}
        >
          Активные
        </button>
        <button
          data-sortType="2"
          type="button"
          className="btn btn-secondary"
          onClick={this.sortBy}
        >
          Заблокированные
        </button>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Имя</th>
              <th scope="col">Отчество</th>
              <th scope="col">Баланс</th>
              <th scope="col">Статус</th>
              <th scope="col">Редактировать</th>
              <th scope="col">Удалить</th>
            </tr>
          </thead>
          <tbody>
            {clientsSorted.map((client) => (
              <MobileClient clientInfo={client} key={client.id}></MobileClient>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.addClientHandler}
        >
          Добавить клиента
        </button>
      </div>
    );
  }
}

export default MobileBlock;
