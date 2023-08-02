import React from "react";
import PropTypes from "prop-types";

import './MobileBlock.css'

import MobileClient from '../MobileClient/MobileClient'

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
        )
    }

    state = {
        stateClientsList: this.props.clientsList
    }

    componentDidMount() {
        mobileEvents.addListener('clientDelete', this.deleteHandler);
    }

    deleteHandler = (clientId) => {
        let clients = [...this.state.stateClientsList];
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id == clientId) {
                clients.splice(i, 1);
            }
        }
        this.setState({ stateClientsList: clients })
    }

    render() {
        let clientsComponents = this.state.stateClientsList.map((client) =>
            <MobileClient clientInfo={client} key={client.id}></MobileClient>)

        console.log('MobileBlock render');

        return (
            <div className="MobileBlock">
                <button type="button" className="btn btn-secondary">Все</button>
                <button type="button" className="btn btn-secondary">Активные</button>
                <button type="button" className="btn btn-secondary">Заблокированные</button>
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
                        {clientsComponents}
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary">Добавить клиента</button>
            </div>
        );
    }
}

export default MobileBlock;