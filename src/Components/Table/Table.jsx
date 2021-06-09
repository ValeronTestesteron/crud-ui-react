import React, { Component } from 'react';

export default class Table extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            readOnlyFlag: true,
            editFlag: false,
            rowId: '',
            idS: '',
            nameS: '',
            ageS: '',
            phoneS: '',
            emailS: ''
        };
    }

    addNewCoctail(e) {
        e.preventDefault();
        
        const form = e.target;
        const age = form.elements["age"].value;
        const name = form.elements["name"].value;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {data: { id: '', name: name, age: age, phone: '', email: '' }})
        };
        fetch('http://178.128.196.163:3000/api/records', requestOptions)
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    let newCoctailInfo = {data: {  id: '', name: name, age: age, phone: '', email: '' }};
                    this.setState({
                        tableData: [...this.state.tableData, newCoctailInfo]
                    });
                    console.log(`New State, add method:`);
                    console.log(this.state.tableData);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    deletRowTable(item) {
        const newItenDelet = this.state.tableData.filter(tableData => {
            return tableData !== item;
        });

        fetch('http://178.128.196.163:3000/api/records/'+item._id , { method: 'DELETE' })
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                this.setState({
                    tableData: [...newItenDelet]
                });
                console.log("New State, delete method");
                console.log(this.state.tableData);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    getRecord = (id) => {
        const tableItem = this.state.tableData.find(tableData => tableData._id === id);
        return tableItem; 
    }

    getId(val){
        return this.setState({
            idS: val
        });
    }
    getName(val){
        return this.setState({
            nameS: val
        });
    }
    getAge(val){
        return this.setState({
            ageS: val
        });
    }
    getPhone(val){
        return this.setState({
            phoneS: val
        });
    }
    getEmail(val){
        return this.setState({
            emailS: val
        });
    }

    updateTable(item, e) {
        let editFlag = this.state.editFlag;

        const savedRecord = this.state.tableData;

        let curValId = item.data.id;
        let curValName = item.data.name;
        let curValAge = item.data.age;
        let curValPhone = item.data.phone;
        let curValEmail = item.data.email;

        if(this.state.idS !== curValId) {
            this.setState({idS: curValId})
        }
        if(this.state.nameS !== curValName) {
            this.setState({nameS: curValName})
        }
        if(this.state.ageS !== curValAge) {
            this.setState({ageS: curValAge})
        }
        if(this.state.phoneS !== curValPhone) {
            this.setState({phoneS: curValPhone})
        }
        if(this.state.emailS !== curValEmail) {
            this.setState({emailS: curValEmail})
        }
        
        if(editFlag) {

            e.target.innerText = '✎';
            e.target.style = ` background-color: #0d9bcb`;

            let id = this.state.idS;
            let name = this.state.nameS;
            let age = this.state.ageS;
            let phone = this.state.phoneS;
            let email = this.state.emailS;

            let curStr = {data: { id: id, name: name, age: age, phone: phone, email: email}};

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( curStr )
            };
            fetch('http://178.128.196.163:3000/api/records/'+item._id , requestOptions)
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    let upRowId = savedRecord.indexOf(this.getRecord(item._id));
                    const newUpdateData = [];
                    for(let i = 0; i < savedRecord.length; i++) {
                        if (i === upRowId){
                            newUpdateData.push({_id: savedRecord[i]._id, data: {id: curStr.data.id, name: curStr.data.name, age: curStr.data.age, phone: curStr.data.phone, email: curStr.data.email}, __v: 0});
                        } else {
                            newUpdateData.push(savedRecord[i]);
                        }
                    }

                    this.setState({
                        readOnlyFlag: true,
                        editFlag: false,
                        tableData: [...newUpdateData]
                    });
                    console.log("New State, update method");
                    console.log(this.state.tableData);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        } else {

            e.target.innerText = '✔';
            e.target.style = "background-color: #48b398";

            this.setState({
                readOnlyFlag: false,
                editFlag: true,
                rowId: item._id,
            });

        }
        
    }

    componentDidMount() {
        fetch("http://178.128.196.163:3000/api/records")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                tableData: result
              })
            },
            (error) => {
              console.log(error)
            }
          )
      }

    render() {

        const tableDataC = this.state.tableData;
        let readOnlyFlag = this.state.readOnlyFlag;
        const rowId = this.state.rowId;
        const editFlag = this.state.editFlag

        return (

            <div>

            <form className="addNewItemForm" onSubmit={ (e) => {this.addNewCoctail(e)} }>
                <input type="text" id="name" className='test-iput' placeholder='Name' />
                <input type="text" id="age" className='test-iput' placeholder='Age' />
                <button className="btn" value="Добавить">Добавить</button>
            </form>
            
            
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { tableDataC.map((item, i) => {
                        if (editFlag && !readOnlyFlag) {
                            if (item._id === rowId) {
                                return (
                                    <tr key={i}>
                                        <th scope="row"> <input className='test-input' onChange={ (e) => this.getId(e.target.value, item)} defaultValue={item.data.id} readOnly={this.state.readOnlyFlag} /></th>
                                        <td> <input className='test-input' onChange={ (e) => this.getName(e.target.value, item)} defaultValue={item.data.name} readOnly={this.state.readOnlyFlag} /></td>
                                        <td> <input className='test-input' onChange={ (e) => this.getAge(e.target.value, item)} defaultValue={item.data.age} readOnly={this.state.readOnlyFlag} /></td>
                                        <td> <input className='test-input' onChange={ (e) => this.getPhone(e.target.value, item)} defaultValue={item.data.phone} readOnly={this.state.readOnlyFlag} /></td>
                                        <td> <input className='test-input' onChange={ (e) => this.getEmail(e.target.value, item)} defaultValue={item.data.email} readOnly={this.state.readOnlyFlag} /></td>
                                        <td><button className="btn-update" onClick={(e) => this.updateTable(item, e)} type="button">✎</button> <button className="btn-delete" id="delete" onClick={(e) => this.deletRowTable(item)} type="button">×</button></td>
                                    </tr>
                                ) 
                            } 
                        } else {
                            return (
                                <tr key={i}>
                                    <th scope="row"> <input className='test-input' defaultValue={item.data.id} readOnly={this.state.readOnlyFlag} /></th>
                                    <td> <input className='test-input' defaultValue={item.data.name} readOnly={this.state.readOnlyFlag} /></td>
                                    <td> <input className='test-input' defaultValue={item.data.age} readOnly={this.state.readOnlyFlag} /></td>
                                    <td> <input className='test-input' defaultValue={item.data.phone} readOnly={this.state.readOnlyFlag} /></td>
                                    <td> <input className='test-input' defaultValue={item.data.email} readOnly={this.state.readOnlyFlag} /></td>
                                    <td><button className="btn-update" onClick={(e) => this.updateTable(item, e)} type="button">✎</button> <button className="btn-delete" id="delete" onClick={(e) => this.deletRowTable(item)} type="button">×</button></td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>

            </div>

        )
    } 
}

