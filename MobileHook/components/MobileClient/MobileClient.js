import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./MobileClient.css";

import mobileEvents from "../eventFlow";

const MobileClient = ({ clientInfo }) => {
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

  const deleteHandler = () => {
    mobileEvents.emit("clientDelete", stateClientInfo.id);
  };

  const editHandler = () => {
    setIsEditMode(true);
  };

  const saveHandler = () => {
    let editedClientInfo = {
      id: stateClientInfo.id,
      firstName: firstNameRef.current.value,
      secondName: secondNameRef.current.value,
      surname: surnameRef.current.value,
      balance: parseFloat(balanceRef.current.value),
    };

    mobileEvents.emit("clientSave", editedClientInfo);
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
            onClick={saveHandler}
          >
            Сохранить
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={editHandler}
          >
            Редактировать
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={deleteHandler}
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
};

export default React.memo(MobileClient);
