import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Table from './Components/Table/Table';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React crud-ui in table</h2>
          <p>Данные получены из http://178.128.196.163:3000/api/records и выведены в таблицу. Можно добавить новую запись через поля name и age. Удалить запись нажав на X в столбце action. Так же можно отредактировать выбранную запись, эта запись выберется и поля станут доступны для редактирования.</p>
          <p>В консоли есть вывод Стэйтов при операциях.</p>
        </div>
        <div className="table-container">
          <Table />
        </div>
      </div>
    );
  }
}

export default App;
