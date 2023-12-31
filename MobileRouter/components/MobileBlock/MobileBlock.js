import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "./MobileBlock.css";

import MobileClient from "../MobileClient/MobileClient";

import mobileEvents from "../eventFlow";

const MobileBlock = ({ clientsList }) => {
  const [stateClientsList, setStateClientsList] = useState(clientsList);
  const [sortMode, setSortMode] = useState(0); // 0 - all, 1 - sorted by active, 2 - sorted by blocked

  const location = useLocation();

  useEffect(() => {
    mobileEvents.addListener("clientDelete", deleteHandler);
    mobileEvents.addListener("clientSave", saveHandler);
    switch (location.pathname) {
      case "/active":
        setSortMode(1);
        break;
      case "/blocked":
        setSortMode(2);
        break;
      default:
        setSortMode(0);
    }
    return () => {
      mobileEvents.removeListener("clientDelete", deleteHandler);
      mobileEvents.removeListener("clientSave", saveHandler);
    };
  });

  const deleteHandler = (clientId) => {
    let newClients = [...stateClientsList];
    for (let i = 0; i < newClients.length; i++) {
      if (newClients[i].id == clientId) {
        newClients.splice(i, 1);
      }
    }
    setStateClientsList(newClients);
  };

  const saveHandler = (editedClientInfo) => {
    let newClients = [...stateClientsList];
    for (let i = 0; i < newClients.length; i++) {
      if (newClients[i].id == editedClientInfo.id) {
        let newClientItem = { ...newClients[i] };
        newClientItem = { ...editedClientInfo };
        newClients[i] = newClientItem;
      }
    }
    setStateClientsList(newClients);
  };

  const addClientHandler = () => {
    const newClients = [...stateClientsList];
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
    setStateClientsList(newClients);
  };

  let clientsComponents;

  switch (sortMode) {
    case 0:
      clientsComponents = stateClientsList.map((client) => (
        <MobileClient clientInfo={client} key={client.id}></MobileClient>
      ));
      break;
    case 1:
      const clientsSortedByActive = stateClientsList.filter(
        (client) => client.balance >= 0
      );
      clientsComponents = clientsSortedByActive.map((client) => (
        <MobileClient clientInfo={client} key={client.id}></MobileClient>
      ));
      break;
    case 2:
      const clientsSortedByBlocked = stateClientsList.filter(
        (client) => client.balance < 0
      );
      clientsComponents = clientsSortedByBlocked.map((client) => (
        <MobileClient clientInfo={client} key={client.id}></MobileClient>
      ));
      break;
    default:
      clientsComponents = stateClientsList.map((client) => (
        <MobileClient clientInfo={client} key={client.id}></MobileClient>
      ));
  }

  console.log("MobileBlock render");

  return (
    <div className="MobileBlock">
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
        onClick={addClientHandler}
      >
        Добавить клиента
      </button>
    </div>
  );
};

MobileBlock.PropTypes = {
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

export default React.memo(MobileBlock);
