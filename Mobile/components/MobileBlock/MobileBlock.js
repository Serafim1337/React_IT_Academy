import React from "react";
import PropTypes from "prop-types";

import "./MobileBlock.css";
import "./MobileBlock.css";

import MobileClient from "../MobileClient/MobileClient";
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
  state = {
    stateClientsList: this.props.clientsList,
    sortMode: 0, // 0 - all, 1 - sorted by active, 2 - sorted by blocked
  };

  componentDidMount() {
    mobileEvents.addListener("clientDelete", this.deleteHandler);
    mobileEvents.addListener("clientSave", this.saveHandler);
  }
  componentDidMount() {
    mobileEvents.addListener("clientDelete", this.deleteHandler);
    mobileEvents.addListener("clientSave", this.saveHandler);
  }

  componentWillUnmount() {
    mobileEvents.removeListener("clientDelete", this.deleteHandler);
    mobileEvents.removeListener("clientSave", this.saveHandler);
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
        let newClientItem = { ...newClients[i] };
        newClientItem = { ...editedClientInfo };
        newClients[i] = newClientItem;
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
    const newClientId = newClients.slice(-1)[0]
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

  sortByActive = () => {
    this.setState({ sortMode: 1 });
  };

  sortByBlocked = () => {
    this.setState({ sortMode: 2 });
  };

  sortCancel = () => {
    this.setState({ sortMode: 0 });
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
    let clientsComponents;

    switch (this.state.sortMode) {
      case 0:
        clientsComponents = this.state.stateClientsList.map((client) => (
          <MobileClient clientInfo={client} key={client.id}></MobileClient>
        ));
        break;
      case 1:
        const clientsSortedByActive = this.state.stateClientsList.filter(
          (client) => client.balance >= 0
        );
        clientsComponents = clientsSortedByActive.map((client) => (
          <MobileClient clientInfo={client} key={client.id}></MobileClient>
        ));
        break;
      case 2:
        const clientsSortedByBlocked = this.state.stateClientsList.filter(
          (client) => client.balance < 0
        );
        clientsComponents = clientsSortedByBlocked.map((client) => (
          <MobileClient clientInfo={client} key={client.id}></MobileClient>
        ));
        break;
    }

    console.log("MobileBlock render");
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
          type="button"
          className="btn btn-secondary"
          onClick={this.sortCancel}
        >
          Все
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.sortByActive}
        >
          Активные
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.sortByBlocked}
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
          <tbody>{clientsComponents}</tbody>
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
