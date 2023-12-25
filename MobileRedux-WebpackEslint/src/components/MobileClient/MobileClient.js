import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./MobileClient.scss";

const MobileClient = ({ clientInfo, deleteHandler, saveHandler }) => {
  const [stateClientInfo, setStateClientInfo] = useState(clientInfo);
  const [isEditMode, setIsEditMode] = useState(
    clientInfo.firstName == null ? true : false
  );
  const [isBlocked, setIsBlocked] = useState(clientInfo.balance < 0);

  useEffect(() => {
    setStateClientInfo(clientInfo);
    setIsEditMode(clientInfo.firstName == null ? true : false);
    setIsBlocked(clientInfo.balance < 0);
  }, [clientInfo]);

  const firstNameRef = useRef();
  const secondNameRef = useRef();
  const surnameRef = useRef();
  const balanceRef = useRef();

  const deleteClient = () => {
    deleteHandler(clientInfo.id);
  };

  const editClient = () => {
    setIsEditMode(true);
  };

  const saveClient = () => {
    let editedClientInfo = {
      id: stateClientInfo.id,
      firstName: firstNameRef.current.value,
      secondName: secondNameRef.current.value,
      surname: surnameRef.current.value,
      balance: parseFloat(balanceRef.current.value),
    };

    saveHandler(editedClientInfo);
  };

  return (
    <tr className="MobileClient">
      <th scope="row">{stateClientInfo.id}</th>
      <td>
        {isEditMode ? (
          <input
            type="text"
            defaultValue={stateClientInfo.firstName}
            ref={firstNameRef}
          ></input>
        ) : (
          stateClientInfo.firstName
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="text"
            defaultValue={stateClientInfo.secondName}
            ref={secondNameRef}
          ></input>
        ) : (
          stateClientInfo.secondName
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="text"
            defaultValue={stateClientInfo.surname}
            ref={surnameRef}
          />
        ) : (
          stateClientInfo.surname
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="number"
            defaultValue={stateClientInfo.balance}
            ref={balanceRef}
          ></input>
        ) : (
          stateClientInfo.balance
        )}
      </td>
      {isBlocked ? (
        <td className="clientBlocked">Заблокирован</td>
      ) : (
        <td className="clientActive">Активен</td>
      )}
      <td>
        {isEditMode ? (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={saveClient}
          >
            Сохранить
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={editClient}
          >
            Редактировать
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={deleteClient}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

MobileClient.propTypes = {
  clientInfo: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    secondName: PropTypes.string,
    surname: PropTypes.string,
    balance: PropTypes.number,
  }),
  deleteHandler: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
};

export default React.memo(MobileClient);
