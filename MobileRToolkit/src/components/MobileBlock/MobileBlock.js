import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewClient,
  deleteClient,
  fetchClientsData,
  saveClient,
} from "../../redux/slices/clientsSlice";

import "./MobileBlock.scss";

import MobileClient from "../MobileClient/MobileClient";

const MobileBlock = () => {
  const clientsList = useSelector((state) => state.clients.clientsList);

  const dispatch = useDispatch();

  const [sortMode, setSortMode] = useState(0); // 0 - all, 1 - sort by male, 2 - sort by female

  const clientsFetchStatus = useSelector((state) => state.clients.status);

  useEffect(() => {
    if (clientsFetchStatus === "idle") {
      // dispatch(fetchClientsData());
    }
  }, [dispatch, clientsFetchStatus]);

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
    let sorted = clientsList;
    if (sortMode === 1) {
      sorted = sorted.filter((client) => client.gender === "male");
    } else if (sortMode === 2) {
      sorted = sorted.filter((client) => client.gender === "female");
    }
    return sorted;
  }, [sortMode, clientsList]);

  return (
    <div className="MobileBlock">
      <button
        data-sort_type="0"
        type="button"
        className="btn btn-secondary"
        onClick={sortBy}
      >
        Все клиенты
      </button>
      <button
        data-sort_type="1"
        type="button"
        className="btn btn-secondary"
        onClick={sortBy}
      >
        Мужчины
      </button>
      <button
        data-sort_type="2"
        type="button"
        className="btn btn-secondary"
        onClick={sortBy}
      >
        Женщины
      </button>
      <table className="table">
        <thead className="thead-dark">
          <tr className="table-header">
            <th scope="col">id</th>
            <th scope="col">Имя</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Email</th>
            <th scope="col">Дата рождения</th>
            <th scope="col">Пол</th>
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

export default React.memo(MobileBlock);
