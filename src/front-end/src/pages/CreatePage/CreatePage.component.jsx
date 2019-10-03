import React from 'react'
import { Form, Button} from 'react-bootstrap'

import './CreatePage.styles.scss'
import Repeated from '../../models/BoardingPass/Repeated';
import Unique from '../../models/BoardingPass/Unique';
import AutoFormGroup from '../../components/AutoFormGroup/AutoFormGroup.component';
import UniqueDTO from '../../dto/UniqueDTO/UniqueDTO';
import RepeatedDTO from '../../dto/RepeatedDTO/RepeatedDTO';
import BoardingPassService from '../../services/BoardingPassService'

const MAX_LEGS = 4

class CreatePage extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            AdvancedMode: false,
            NumberOfLegs: "1",
            NumberOfBags: "",
            BagList: "",
            UniqueElements: [new Unique(0)],
            Legs: [],
            Project: "APC",
            AutoGenBags: true,
            Response: "",
            BagListValid: true
        }
    }

    handleAdvancedButton = () => {
        // Toggle Advanced filling mode
        this.setState({ AdvancedMode: !this.state.AdvancedMode })
    }

    autoGenBags = () => {
        return ["0123456789", "0123456788", "0123456787", "0123456781"]
    }

    handleOnSubmit = (event) => {
        // This method auto complete the fields that are missing
        // For now is just getting a default value
        event.preventDefault()

        // If the field was not modified it recieves the default value
        // const autoCompletedBoardingPass = this.state.UniqueElements[0].Data.map( e => {
        //     return e.value === "" ? {
        //             label: e.label,
        //             value: e.default,
        //             default: e.default
        //         } :
        //         e
        // })

        const boardingPassService = new BoardingPassService()
        
        let unique = new UniqueDTO()

        // MAP FORM DATA TO THE DTO
        unique.Data.project = this.state.Project
        unique.Data.formatCode = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "formatCode").value
        unique.Data.numberOfLegs = this.state.NumberOfLegs
        unique.Data.passengerFirstName = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "passengerFirstName").value
        unique.Data.passengerLastName = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "passengerLastName").value
        unique.Data.electronicTicketIndicator = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "electronicTicketIndicator").value
        unique.Data.passengerDescription = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "passengerDescription").value
        unique.Data.sourceOfCheckIn = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "sourceOfCheckIn").value
        unique.Data.sourceOfBoardingPassIssuance = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "sourceOfBoardingPassIssuance").value
        unique.Data.dateOfIssueOfBoardingPass = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "dateOfIssueOfBoardingPass").value
        unique.Data.documentType = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "documentType").value
        unique.Data.airlineDesignatorOfBoardingPassIssuer = this.state.UniqueElements[0].Data.find(e => e.dtoLabel === "airlineDesignatorOfBoardingPassIssuer").value

        const repeated = this.state.Legs.map( element => {
            let rep = new RepeatedDTO()

            rep.Data.operatingCarrierPNRCode = element.Data.find( e => e.dtoLabel === "operatingCarrierPNRCode").value
            rep.Data.fromCityAirportCode = element.Data.find( e => e.dtoLabel === "fromCityAirportCode").value
            rep.Data.toCityAirportCode = element.Data.find( e => e.dtoLabel === "toCityAirportCode").value
            rep.Data.operatingCarrierDesignator = element.Data.find( e => e.dtoLabel === "operatingCarrierDesignator").value
            rep.Data.flightNumber = element.Data.find( e => e.dtoLabel === "flightNumber").value
            rep.Data.dateOfFlight = element.Data.find( e => e.dtoLabel === "dateOfFlight").value
            rep.Data.compartmentCode = element.Data.find( e => e.dtoLabel === "compartmentCode").value
            rep.Data.seatNumber = element.Data.find( e => e.dtoLabel === "seatNumber").value
            rep.Data.checkInSequenceNumber = element.Data.find( e => e.dtoLabel === "checkInSequenceNumber").value
            rep.Data.passengerStatus = element.Data.find( e => e.dtoLabel === "passengerStatus").value
            rep.Data.airlineNumericCode = element.Data.find( e => e.dtoLabel === "airlineNumericCode").value
            rep.Data.documentFormSerialNumber = element.Data.find( e => e.dtoLabel === "documentFormSerialNumber").value
            rep.Data.selecteeIndicator = element.Data.find( e => e.dtoLabel === "selecteeIndicator").value
            rep.Data.internationalDocumentationVerification = element.Data.find( e => e.dtoLabel === "internationalDocumentationVerification").value
            rep.Data.marketingCarrierDesignator = element.Data.find( e => e.dtoLabel === "marketingCarrierDesignator").value
            rep.Data.frequentFlyerAirlineDesignator = element.Data.find( e => e.dtoLabel === "frequentFlyerAirlineDesignator").value
            rep.Data.frequentFlyerNumber = element.Data.find( e => e.dtoLabel === "frequentFlyerNumber").value
            rep.Data.idAdIndicator = element.Data.find( e => e.dtoLabel === "idAdIndicator").value
            rep.Data.freeBaggageAllowance = element.Data.find( e => e.dtoLabel === "freeBaggageAllowance").value
            rep.Data.fastTrack = element.Data.find( e => e.dtoLabel === "fastTrack").value
            rep.Data.forIndividualAirlineUse = element.Data.find( e => e.dtoLabel === "forIndividualAirlineUse").value

            // console.log([rep])

            return rep.Data
        }).slice(0, this.state.NumberOfLegs)

        // Throw error if pattern does not match!!! [PENDING]
        let bags = this.state.BagList.split(';').map( e => e.trim() ).filter( e => e.match(/^[012][0-9]{9}$/g))        
        bags = bags.length > 0 ? bags : this.state.AutoGenBags ? this.autoGenBags() : []

        boardingPassService.AddData(...[unique.Data], repeated, [...bags])
        boardingPassService.Post('http://localhost:5000/bpgen')
            .then( data => data.result === undefined ? data : data.result) // JSON-string from `response.json()` call
            .then( result => result.message === undefined ? console.log(result) : this.setState({ Response: result }) )
            .catch(error => console.error(error))
        
        this.setState({ NumberOfBags: bags.length.toString() })        
        // this.setState({ UniqueElements: autoCompletedBoardingPass })
    }

    handleLegButton = (event) => {
        // Handle for Leg No. selector
        this.setState({ NumberOfLegs: event.target.value })
    }

    handleBagButton = (event) => {
        // Handle for Bag list field
        let bags = event.target.value.split(';').map( e => e.trim() ).filter( e => e.match(/^[012][0-9]{9}$/g))
        
        console.log(['VALID BAGS', bags])

        this.setState({ BagList: event.target.value })
    }

    updateUniqElem = (event, label) => {
        // Generic field updater
        let aux = [...this.state.UniqueElements]
        const index = aux[0].Data.findIndex( e => e.label === label )

        aux[0].Data[ index ] = {
            dtoLabel: aux[0].Data[ index ].dtoLabel,
            label: aux[0].Data[ index ].label,
            default: aux[0].Data[ index ].default,
            value: event.target.value
        }

        this.setState({ UniqueElements: aux })

        // console.log(this.state.UniqueElements)
    }

    updateRepElem = (event, label, legId) => {
        // Generic field updater
        let aux = [...this.state.Legs]
        let leg = aux.find( e => e.Id === legId)

        const index = leg.Data.findIndex( e => e.label === label )

        leg.Data[ index ] = {
            dtoLabel: leg.Data[ index ].dtoLabel,
            label: leg.Data[ index ].label,
            default: leg.Data[ index ].default,
            value: event.target.value
        }

        this.setState({ Legs: aux })

        // console.log(this.state.Legs)
    }

    componentDidMount() {
        let aux = []

        for( let i = 0; i < MAX_LEGS; i++ )
            aux.push(new Repeated(i))

        this.setState({Legs: aux})
    }

    render() {
        // Just for test
        // console.log(this.state)

        return (
            <Form className="create-page" onSubmit={ this.handleOnSubmit }>
                <Form.Group controlId="boarding-pass-form" className="custom-form">
                    <Form.Label><h4>Unique</h4></Form.Label> {
                        this.state.AdvancedMode ? (
                            <div>
                                <AutoFormGroup elements={ this.state.UniqueElements[0].Data.slice(0,2) } handleFunction={ this.updateUniqElem } required={ true } />
                                <AutoFormGroup elements={ this.state.UniqueElements[0].Data.slice(2) } handleFunction={ this.updateUniqElem } required={ false } />
                                { this.state.Legs.slice(0, this.state.NumberOfLegs).map( leg => {
                                    return (
                                        <div key={ leg.Id }>
                                            <Form.Label><h4>Repeated (One per leg)</h4></Form.Label>
                                            <AutoFormGroup elements={ leg.Data } handleFunction={ this.updateRepElem } required={ false } id={ leg.Id }/>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div>
                                <AutoFormGroup elements={ this.state.UniqueElements[0].Data.slice(0,2) } handleFunction={ this.updateUniqElem } required={ true } />
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group controlId="opt-form" className="opt-form">

                    {/* TEMPLATES */}
                    <Form.Row>
                        <Form.Label><h4>Templates</h4></Form.Label>
                        <Form.Control as="select" onChange={ (event) => {
                            console.log( event.target.value )
                        }  }>
                            <option>Default</option>
                        </Form.Control>
                    </Form.Row>

                    {/* BAGS */}
                    <Form.Row>
                        <Form.Label><h4>Bags</h4></Form.Label>                    
                        <Form.Control onChange={ (event) => this.handleBagButton(event) } />
                        <Form.Check type="checkbox" label="Generate automatically" onChange={ () => {
                            this.setState({ AutoGenBags: !this.state.AutoGenBags, BagListValid: !this.state.BagListValid }
                        )}} defaultChecked/>
                    </Form.Row>
                    
                    {/* LEGS */}
                    <Form.Row>
                        <Form.Label><h4>Legs</h4></Form.Label>                    
                        <Form.Control onChange={ event => this.handleLegButton(event)} as="select">
                            { [...Array(MAX_LEGS).keys()].map( key => <option key={ key + 1 }>{ key + 1 }</option>) }
                        </Form.Control>
                    </Form.Row>

                    {/* PROJECT */}
                    <Form.Row>
                        <Form.Label><h4>Project</h4></Form.Label>                    
                        <Form.Control onChange={ event => this.setState({ Project: event.target.value }) } as="select">
                            <option>APC</option>
                            <option>WTR</option>
                        </Form.Control>
                    </Form.Row>
                </Form.Group>

                {/* BUTTONS */}
                <Button className="custom-button-blue" onClick={ this.handleAdvancedButton }>Advanced</Button>
                <Button className="custom-button-blue" variant="primary" type="submit">Submit</Button>
                <div className='result-box'>
                    { this.state.Response.message }
                </div>
            </Form>
        )
    }
}

export default CreatePage

