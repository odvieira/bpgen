import React from 'react';

import Card from '../Card/Card.component'

import './CardList.styles.scss'
import CardLine from '../CardLine/CardLine.component';

class CardList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            Items: [],
            ItemsRoot: props.itemsRoot,
            Single: props.single,
            SortColumn: 'CreatedAt',
            SortOrder: 1
        }
    }

    sortTable = (tableArray, column) => {
        if (column === 'Project') {
            tableArray.sort((a, b) => {
                if (a.Project > b.Project)
                    return 1 * this.state.SortOrder;
                else if (a.Project < b.Project)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'PassengerName') {
            tableArray.sort((a, b) => {
                if (a.PassengerName > b.PassengerName)
                    return 1 * this.state.SortOrder;
                else if (a.PassengerName < b.PassengerName)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'CreatedAt') {
            tableArray.sort((a, b) => {
                if (a.CreateAt > b.CreateAt)
                    return 1 * this.state.SortOrder;
                else if (a.CreateAt < b.CreateAt)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'DepartureDate') {
            tableArray.sort((a, b) => {
                if (a.DepartureData > b.DepartureData)
                    return 1 * this.state.SortOrder;
                else if (a.DepartureData < b.DepartureData)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'Bags') {
            tableArray.sort((a, b) => {
                if (a.Bags > b.Bags)
                    return 1 * this.state.SortOrder;
                else if (a.Bags < b.Bags)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'DepartureAirport') {
            tableArray.sort((a, b) => {
                if (a.DepartureAirport > b.DepartureAirport)
                    return 1 * this.state.SortOrder;
                else if (a.DepartureAirport < b.DepartureAirport)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'Airline') {
            tableArray.sort((a, b) => {
                if (a.Airline > b.Airline)
                    return 1 * this.state.SortOrder;
                else if (a.Airline < b.Airline)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else if (column === 'Flights') {
            tableArray.sort((a, b) => {
                if (a.Flights > b.Flights)
                    return 1 * this.state.SortOrder;
                else if (a.Flights < b.Flights)
                    return -1 * this.state.SortOrder;
                else
                    return 0;
            })
        }
        else
            console.log('Not Right')
            // throw new Error("CardList [ sortTable ]: Can't find the column to sort")
    
        return tableArray
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.items !== this.props.items)
             this.setState({ Items: nextProps.items })

        if(nextProps.single !== this.props.single)
            this.setState({ Single: nextProps.single })
    }

    handleProjectButton = () => {
        if (this.state.SortColumn === 'Project')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'Project' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handlePassengerNameButton = () => {
        if (this.state.SortColumn === 'PassengerName')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'PassengerName' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handleAirlineButton = () => {
        if (this.state.SortColumn === 'Airline')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'Airline' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handleDepartureAirportButton = () => {
        if (this.state.SortColumn === 'DepartureAirport')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'DepartureAirport' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handleDepartureDateButton = () => {
        if (this.state.SortColumn === 'DepartureDate')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'DepartureDate' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handleBagsButton = () => {
        if (this.state.SortColumn === 'Bags')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'Bags' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handleFlightsButton = () => {
        if (this.state.SortColumn === 'Flights')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'Flights' } )
            this.setState({ SortOrder: 1 })
        }
    }
    
    handleCreatedAtButton = () => {
        if (this.state.SortColumn === 'CreatedAt')
            this.setState({ SortOrder: -1 * this.state.SortOrder })
        else {
            this.setState( { SortColumn: 'CreatedAt' } )
            this.setState({ SortOrder: 1 })
        }
    }

    render() {
        let tableArray = this.sortTable([...this.state.Items], this.state.SortColumn)

        return (
            <div className="card-list-parent">
                { this.state.Single ?
                    <table>
                        <thead>
                            <tr className='thead-row'>
                                <th><button onClick= { this.handleProjectButton } className='header-button'>Project</button></th>
                                <th><button onClick= { this.handlePassengerNameButton } className='header-button'>Passenger Name</button></th>
                                <th><button onClick= { this.handleAirlineButton } className='header-button'>Airline</button></th>
                                <th><button onClick= { this.handleDepartureAirportButton } className='header-button'>Departure Airport</button></th>
                                <th><button onClick= { this.handleDepartureDateButton } className='header-button'>Departure Date</button></th>
                                <th><button onClick= { this.handleBagsButton } className='header-button'>Bags</button></th>
                                <th><button onClick= { this.handleFlightsButton } className='header-button'>Flights</button></th>
                                <th><button onClick= { this.handleCreatedAtButton } className='header-button'>Created At</button></th>
                            </tr>
                        </thead>
                        <tbody>{
                            tableArray.map( item =>
                                <CardLine
                                    key={ item.ItemId }
                                    itemId={ item.ItemId }
                                    itemsRoot={ this.state.ItemsRoot }
                                    kvp = { item.KeyValuePairs }
                                />
                            )
                        }</tbody>
                    </table> :
                    <div className="card-list"> { 
                        tableArray.map( item =>
                            <Card 
                                key={ item.ItemId }
                                itemId={ item.ItemId }
                                itemsRoot={ this.state.ItemsRoot }
                                itemTitle={ item.Title }
                                kvp = { item.KeyValuePairs }
                            />
                        )
                    } </div>
                }
            </div>
        )
    }
}

export default CardList