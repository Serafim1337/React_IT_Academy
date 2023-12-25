import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { addNewClient } from "../../redux/actions/clientsActions";
import { deleteClient } from "../../redux/actions/clientsActions";
import { saveClient } from "../../redux/actions/clientsActions";

import "./MobileBlock.scss";

import MobileClient from "../MobileClient/MobileClient";

const MobileBlock = () => {
  const clientList = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const [sortMode, setSortMode] = useState(0); // 0 - all, 1 - sorted by active, 2 - sorted by blocked

  const deleteHandler = useCallback(
    (clientId) => {
      dispatch(deleteClient(clientId));
    },
    [dispatch, deleteClient]
  );

  const saveHandler = useCallback(
    (editedClientInfo) => {
      dispatch(saveClient(editedClientInfo));
    },
    [dispatch, saveClient]
  );

  const addClientHandler = () => {
    dispatch(addNewClient());
  };

  const sortBy = (e) => {
    const { sort_type } = e.target.dataset;
    setSortMode(parseInt(sort_type));
  };

  const sortedClientsList = useMemo(() => {
    let sorted = clientList;
    if (sortMode === 1) {
      sorted = sorted.filter((client) => client.balance >= 0);
    } else if (sortMode === 2) {
      sorted = sorted.filter((client) => client.balance < 0);
    }
    return sorted;
  }, [sortMode, clientList]);

  return (
    <div className="MobileBlock">
      <button
        data-sort_type="0"
        type="button"
        className="btn btn-secondary"
        onClick={sortBy}
      >
        Все
      </button>
      <button
        data-sort_type="1"
        type="button"
        className="btn btn-secondary"
        onClick={sortBy}
      >
        Активные
      </button>
      <button
        data-sort_type="2"
        type="button"
        className="btn btn-secondary"
        onClick={sortBy}
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
            <MobileClient
              clientInfo={client}
              key={client.id}
              deleteHandler={deleteHandler}
              saveHandler={saveHandler}
            ></MobileClient>
          ))}
        </tbody>
      </table>
      {sortMode === 0 && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={addClientHandler}
        >
          Добавить клиента
        </button>
      )}
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
