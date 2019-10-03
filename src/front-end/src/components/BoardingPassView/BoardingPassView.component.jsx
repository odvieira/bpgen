import React from 'react'

import Barcode from '../Barcode/Barcode.component'

import './BoardingPassView.styles.scss'

class BoardingPassView extends React.Component {
    constructor(props)
    {
        super(props)
        
        this.bpvRef = React.createRef()
        
        this.state = {
            barCodeString: props.barCodeString,
            departureDate: props.departureDate,
            arrivalDate: props.arrivalDate,
            passengerName: props.passengerName,
            fromCityAirportCode: props.fromCityAirportCode,
            toCityAirportCode: props.toCityAirportCode
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.barCodeString !== this.props.barCodeString)
            this.setState({ barCodeString: nextProps.barCodeString })

        if(nextProps.departureDate !== this.props.departureDate)
            this.setState({ departureDate: nextProps.departureDate })

        if(nextProps.arrivalDate !== this.props.arrivalDate)
            this.setState({ arrivalDate: nextProps.arrivalDate })

        if(nextProps.passengerName !== this.props.passengerName)
            this.setState({ passengerName: nextProps.passengerName })

        if(nextProps.fromCityAirportCode !== this.props.fromCityAirportCode)
            this.setState({ fromCityAirportCode: nextProps.fromCityAirportCode })

        if(nextProps.toCityAirportCode !== this.props.toCityAirportCode)
            this.setState({ toCityAirportCode: nextProps.toCityAirportCode })
    }

    handlePrint = (elem) => {
        
    }

    render() {
        console.log(this.state.barCodeString)
        return(
            <div className='boarding-pass-view'>
                <div className="wrapper"  ref={ this.bpvRef } onClick={ () => this.handlePrint(this.bpvRef.current) }>
                    <div className="content">
                        <div className='header'>
                            <div className="path">
                                <p className="fas">
                                    <img src="https://d14ik00wldmhq.cloudfront.net/media/filer_public/67/b1/67b1b465-5c57-4394-abe9-09891647a527/united.png" alt="logo"/>
                                </p>
                            </div>
                            <div className="item">
                                <p className='flight-type'>INTL</p>
                            </div>
                        </div>
                        <div className="location">
                            <div className="item">
                                <p className='passenger'>{this.state.passengerName}</p>
                                <p>SAO PAULO TO HOUSTON</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className="item">
                                <h1>{ this.state.fromCityAirportCode }-{ this.state.toCityAirportCode }</h1>
                                <p className='flight-date'>{ this.state.departureDate }</p>
                            </div>
                            <div className="item">
                                <p className='field-id'>GATE</p>
                                <p className='b-column-big'>331</p>
                                <p className='p-subtext'>GATE MAY CHANGE</p>
                            </div>
                            <div className="item">
                                <div className='boarding'>
                                    <div className='b-row-first'>
                                        <div className='b-column'>BOARDING BEGINS:</div>
                                        <div className='b-column-big'>08:20</div>
                                    </div>
                                    <div className='b-row'>
                                        <div className='b-column'>BOARDING ENDS:</div>
                                        <div className='b-column'>09:10</div>
                                    </div>
                                    <div className='b-row'>
                                        <div className='b-column'>FLIGHT DEPARTS:</div>
                                        <div className='b-column'>07:40</div>
                                    </div>
                                    <div className='b-row'>
                                        <div className='b-column'>FLIGHT ARRIVES:</div>
                                        <div className='b-column'>15:40</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <p className='field-id'>SEAT</p>
                                <p className='b-column-big'>18W</p>
                                <p className='p-subtext'>ECONOMY</p>
                            </div>
                            <div className="item">
                                <p className='field-id'>BOARDING GROUP</p>
                                <p className='b-column-big-center'>4</p>
                            </div>
                        </div>
                        <div className='footer'>
                            Confirmation:
                        </div>
                    </div>
                    <div className="code-part">
                        <Barcode text={ this.state.barCodeString } blockWidth={2} blockHeight={1} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardingPassView