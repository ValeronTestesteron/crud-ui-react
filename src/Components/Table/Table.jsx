import React, { Component } from 'react';
import CoctailData from './CoctailData.json'

export default class Table extends Component {
    

    componentDidMount() {
        fetch('www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
            .then( response => response.json() )
            .then(data => { 
                console.log('data', data); 
                this.setState({ hits: data.hits });
            })
            .catch(error => console.log('error', error)); // этот выполнится в случае ошибки
    }

    render() {
        return (
            
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Coctail Name</th>
                        <th scope="col">Coctail Image</th>
                    </tr>
                </thead>
                <tbody>
                    { CoctailData.drinks.map((coctailInfo, i) => {
                        return (
                            <tr>
                                <th scope="row">{coctailInfo.idDrink}</th>
                                <td>{coctailInfo.strDrink}</td>
                                <td><img src={coctailInfo.strDrinkThumb} alt="" width="50" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        )
    }
}

