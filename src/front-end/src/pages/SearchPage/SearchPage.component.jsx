import React from 'react'

import CardList from '../../components/CardList/CardList.component'
import { SearchBox } from '../../components/SearchBox/SearchBox.component'

import BoardingPassCard from '../../models/BoardingPassCard/BoardingPassCard'

import TABLE from '../../assets/table.png'
import GRID from '../../assets/grid.png'

import './SearchPage.styles.scss'

class SearchPage extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          BoardingPasses: [],
          SearchField: '',
          Single: true,
          Sort: 'Passenger Name'
        }
      }
      
      componentDidMount() {
        fetch('https://localhost:5001/bpgen')
        .then(response => response.json())
        .then(body => body.createdObject)
        .then(boardingPasses => this.setState({ BoardingPasses: boardingPasses }))
      }
    
      handleSearchBoxChange = e => {
        this.setState({ SearchField: e.target.value })
      }
    
      render() {
        const boardingPasses = this.state.BoardingPasses.map(item => {
          let datetime = item.createdAt.split('T')

          return (
            new BoardingPassCard(
              item.boardingPassId,
              item.project,
              item.passengerFirstName.toUpperCase() + ' ' + item.passengerLastName.toUpperCase(),
              item.legs[0].airlineNumericCode.toUpperCase(),
              item.legs[0].fromCityAirportCode.toUpperCase(),
              item.legs[0].dateOfFlight.toUpperCase(),
              item.bags.length,
              item.legs.length,
              datetime[0] + ' ' + datetime[1].split('.')[0],
              item.passengerNameInBoardingPass.toUpperCase(),
              item.passengerNameInBoardingPass.toUpperCase()
            )
          )
        })
        
        const searchField = this.state.SearchField
        
        const filteredBoardingPasses = boardingPasses.filter(bp =>
          bp.DepartureAirport
          .toUpperCase()
          .includes( searchField.toUpperCase() ) ||
          bp.Airline
          .includes( searchField.toUpperCase() ) ||
          bp.Project
          .toUpperCase()
          .includes( searchField.toUpperCase() ) ||
          bp.PassengerName
          .toUpperCase()
          .includes( searchField.toUpperCase() ) ||
          bp.DepartureData
          .includes( searchField.toUpperCase() )
        )
    
        return (
          <div className='search-page'>
            <div className='search-header'>
              <SearchBox placeholder={'Search'} handleChange={ this.handleSearchBoxChange }/>
              <div className='view-icon-group'>
                <button onClick={ () => this.state.Single ? this.setState({ Single: false }) : null }>
                  <img className='view-icon' src={ GRID } alt='Set grid view'/>
                </button>
                <button onClick={ () => this.state.Single ? null : this.setState({ Single: true }) }>
                  <img className='view-icon' src={ TABLE } alt='Set table view'/>
                </button>
              </div>
            </div>
            <CardList items={ filteredBoardingPasses } itemsRoot='/item/' single={ this.state.Single }/>
          </div>
        )
      }
}

export default SearchPage