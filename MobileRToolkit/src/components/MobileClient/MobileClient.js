import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { saveClient, deleteClient } from "../../redux/slices/clientsSlice";

import "./MobileClient.scss";

const MobileClient = ({ clientInfo }) => {
  const [stateClientInfo, setStateClientInfo] = useState(clientInfo);
  const [isEditMode, setIsEditMode] = useState(
    clientInfo.firstname === null ? true : false
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setStateClientInfo(clientInfo);
    setIsEditMode(clientInfo.firstname === null ? true : false);
  }, [clientInfo]);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const birthdayRef = useRef();
  const genderRef = useRef();

  const deleteClientInfo = () => {
    dispatch(deleteClient(clientInfo.id));
  };

  const editClient = () => {
    setIsEditMode(true);
  };

  const saveClientInfo = () => {
    let editedClientInfo = {
      id: stateClientInfo.id,
      changes: {
        firstname: firstNameRef.current.value,
        lastname: lastNameRef.current.value,
        email: emailRef.current.value,
        birthday: birthdayRef.current.value,
        gender: genderRef.current.value,
      },
    };
    setIsEditMode(false);
    dispatch(saveClient(editedClientInfo));
  };

  return (
    <tr className="MobileClient">
      <th scope="row" className="id-column">
        {stateClientInfo.id}
      </th>
      <td>
        {isEditMode ? (
          <input
            type="text"
            defaultValue={stateClientInfo.firstname}
            ref={firstNameRef}
          ></input>
        ) : (
          stateClientInfo.firstname
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="text"
            defaultValue={stateClientInfo.lastname}
            ref={lastNameRef}
          ></input>
        ) : (
          stateClientInfo.lastname
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="email"
            defaultValue={stateClientInfo.email}
            ref={emailRef}
          />
        ) : (
          stateClientInfo.email
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="date"
            defaultValue={stateClientInfo.birthday}
            ref={birthdayRef}
          ></input>
        ) : (
          stateClientInfo.birthday
        )}
      </td>

      {isEditMode ? (
        <td>
          <select
            className="form-select form-select-sm"
            ref={genderRef}
            defaultValue={clientInfo.gender}
          >
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>
        </td>
      ) : clientInfo.gender === "male" ? (
        <td className="clientMale">Мужчина</td>
      ) : (
        <td className="clientFemale">Женщина</td>
      )}

      <td>
        {isEditMode ? (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={saveClientInfo}
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
          onClick={deleteClientInfo}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default React.memo(MobileClient);
