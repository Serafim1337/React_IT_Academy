import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes, { object } from "prop-types";

import "./MobileBlock.css";

import MobileClient from "../MobileClient/MobileClient";

import mobileEvents from "../eventFlow";

const MobileBlock = ({ clientsList }) => {
  const [stateClientsList, setStateClientsList] = useState(clientsList);
  const [sortMode, setSortMode] = useState(0); // 0 - all, 1 - sorted by active, 2 - sorted by blocked

  useEffect(() => {
    mobileEvents.addListener("clientDelete", deleteHandler);
    mobileEvents.addListener("clientSave", saveHandler);
    return () => {
      mobileEvents.removeListener("clientDelete", deleteHandler);
      mobileEvents.removeListener("clientSave", saveHandler);
    };
  }, []);

  const deleteHandler = (clientId) => {
    setStateClientsList((currentStateClientsList) => {
      let newClients = [...currentStateClientsList];

      for (let i = 0; i < newClients.length; i++) {
        if (newClients[i].id == clientId) {
          newClients.splice(i, 1);
          break;
        }
      }

      return newClients;
    });
  };
  // todo rewrite
  const saveHandler = (editedClientInfo) => {
    let newClients = [...stateClientsList];
    for (let i = 0; i < newClients.length; i++) {
      if (newClients[i].id == editedClientInfo.id) {
        newClients[i] = { ...newClients[i], ...editedClientInfo };
      }
    }
    setStateClientsList(newClients);
  };
  // todo rewrite
  const addClientHandler = () => {
    // TODO try useId
    const newClients = [...stateClientsList];
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
    setStateClientsList(newClients);
  };

  // TODO refactor

  const sortByActive = () => {
    setSortMode(1);
  };

  const sortByBlocked = () => {
    setSortMode(2);
  };

  const sortCancel = () => {
    setSortMode(0);
  };

  const sortedClientsList = useMemo(() => {
    let sorted = stateClientsList;
    if (sortMode === 1) {
      sorted = sorted.filter((client) => client.balance >= 0);
    } else if (sortMode === 2) {
      sorted = sorted.filter((client) => client.balance < 0);
    }
    return sorted;
  }, [sortMode, stateClientsList]);
  return (
    <div className="MobileBlock">
      <button type="button" className="btn btn-secondary" onClick={sortCancel}>
        Все
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={sortByActive}
      >
        Активные
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={sortByBlocked}
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
          {sortedClientsList.map((client) => (
            <MobileClient clientInfo={client} key={client.id}></MobileClient>
          ))}
        </tbody>
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

MobileBlock.propTypes = {
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
