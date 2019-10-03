import React from 'react'

import './ItemPage.styles.scss'
import BoardingPassView from '../../components/BoardingPassView/BoardingPassView.component';

import {Tabs, Tab} from 'react-bootstrap'

class ItemPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            key: 'boardingPassView',
            BoardingPassModel: [],
            FirstLeg: []
        }
    }

    componentDidMount() {
        fetch(`https://localhost:5001/bpgen/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(boardingPass => this.setState({ BoardingPassModel: boardingPass }))
        
        this.setState({ FirstLeg: this.state.BoardingPassModel.legs })
    }

    setKey = newKey => {
        this.setState({key: newKey})
    }

    render() {
        return (
            <div className='item-page'>
                <Tabs id="controlled-tab-example" className='custom-tabs' activeKey={this.state.key} onSelect={k => this.setKey(k)}>
                    <Tab eventKey="boardingPassView" title="View">
                        <BoardingPassView
                            barCodeString={ this.state.BoardingPassModel.barCodeString }
                            departureDate={ 'THU APRIL 25 2019' }
                            arrivalDate={ 'THU APRIL 25 2019' }
                            passengerName={ this.state.BoardingPassModel.passengerNameInBoardingPass }
                            fromCityAirportCode={ 'GRU' }
                            toCityAirportCode={ 'IAH' }
                        />
                    </Tab>
                    <Tab eventKey="details" title="Details">
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default ItemPage