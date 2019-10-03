class BoardingPassService {
    Data

    constructor(){
        this.Data = undefined
    }

    GenerateOperatingCarrierPNRCode = () => {
        return "ABC123"
    }

    GenerateFromCityAirportCode = () => {
        return "YUL"
    }
    
    GenerateToCityAirportCode = () => {
        return "YUL"
    }

    GenerateFormatCode = () => {
        return "M"
    }

    GenerateEletronicTicketIndicator = () => {
        return "E"
    }
    
    GenerateSourceOfCheckIn = () => {
        return "W"
    }
    
    GenerateSourceOfBoardingPassIssuance = () => "W"
    
    GenerateDateOfIssueOfBoardingPass = () => "2019/05/02"

    GenerateDocumentType = () => "B"

    GererateAirlineDesignatorOfBoardingPassIssuer = () => "X"

    GetRepeatedObject(Repeated) {
        return Repeated.map(r => {
          return ({
            "operatingCarrierPNRCode": r.operatingCarrierPNRCode === "" ? this.GenerateOperatingCarrierPNRCode() : r.operatingCarrierPNRCode,
            "fromCityAirportCode": r.fromCityAirportCode === "" ? this.GenerateFromCityAirportCode() : r.fromCityAirportCode,
            "toCityAirportCode": r.toCityAirportCode === "" ? this.GenerateToCityAirportCode() : r.toCityAirportCode,
            "operatingCarrierDesignator": r.operatingCarrierDesignator === "" ? "AC" : r.operatingCarrierDesignator,
            "flightNumber": r.flightNumber === "" ? "0834" : r.flightNumber,
            "dateOfFlight": r.dateOfFlight === "" ? "2019/06/03" : r.dateOfFlight,
            "compartmentCode": r.compartmentCode === "" ? "Y" : r.compartmentCode,
            "seatNumber": r.seatNumber === "" ? "001A" : r.seatNumber,
            "checkInSequenceNumber": r.checkInSequenceNumber === "" ? "0001" : r.checkInSequenceNumber,
            "passengerStatus": r.passengerStatus === "" ? "0" : r.passengerStatus,
            "airlineNumericCode": r.airlineNumericCode === "" ? "784" : r.airlineNumericCode,
            "documentFormSerialNumber": r.documentFormSerialNumber === "" ? "0" : r.documentFormSerialNumber,
            "selecteeIndicator": r.selecteeIndicator === "" ? "0" : r.selecteeIndicator,
            "internationalDocumentationVerification": r.internationalDocumentationVerification === "" ? "0" : r.internationalDocumentationVerification,
            "marketingCarrierDesignator": r.marketingCarrierDesignator === "" ? "0" : r.marketingCarrierDesignator,
            "frequentFlyerAirlineDesignator": r.frequentFlyerAirlineDesignator === "" ? "0" : r.frequentFlyerAirlineDesignator,
            "frequentFlyerNumber": r.frequentFlyerNumber === "" ? "5432109876543210" : r.frequentFlyerNumber,
            "idAdIndicator": r.idAdIndicator === "" ? "0" : r.idAdIndicator,
            "freeBaggageAllowance": r.freeBaggageAllowance === "" ? "0" : r.freeBaggageAllowance,
            "fastTrack": r.fastTrack === "" ? "0" : r.fastTrack,
            "forIndividualAirlineUse": r.forIndividualAirlineUse
          })
        })
    }

    GetBagsObject(bags){
        return bags.map( b => {
            return ({
                "bagTag": b 
            })
        })
    }

    AddData(unique, repeated, bags) {
        this.Data = JSON.stringify({
            "project": unique.project,
            "formatCode": unique.formatCode === "" ? this.GenerateFormatCode() : unique.formatCode,
            "numberOfLegs": unique.numberOfLegs,
            "passengerFirstName": unique.passengerFirstName,
            "passengerLastName": unique.passengerLastName,
            "electronicTicketIndicator": unique.electronicTicketIndicator === "" ? this.GenerateEletronicTicketIndicator() : unique.electronicTicketIndicator,
            "legs": this.GetRepeatedObject(repeated),
            "beginningOfVersionNumber": unique.beginningOfVersionNumber === "" ? ">" : unique.beginningOfVersionNumber,
            "versionNumber": unique.versionNumber === "" ? "6" : unique.versionNumber,
            "passengerDescription": unique.passengerDescription === "" ? "_" : unique.passengerDescription,
            "sourceOfCheckIn": unique.sourceOfCheckIn === "" ? this.GenerateSourceOfCheckIn() : unique.sourceOfCheckIn,
            "sourceOfBoardingPassIssuance": unique.sourceOfBoardingPassIssuance === "" ? this.GenerateSourceOfBoardingPassIssuance() : unique.sourceOfBoardingPassIssuance,
            "dateOfIssueOfBoardingPass": unique.dateOfIssueOfBoardingPass === "" ? this.GenerateDateOfIssueOfBoardingPass() : unique.dateOfIssueOfBoardingPass,
            "documentType": unique.documentType === "" ? this.GenerateDocumentType() : unique.documentType,
            "airlineDesignatorOfBoardingPassIssuer": unique.airlineDesignatorOfBoardingPassIssuer === "" ? this.GererateAirlineDesignatorOfBoardingPassIssuer() : unique.airlineDesignatorOfBoardingPassIssuer,
            "bags": this.GetBagsObject(bags)
        })
    }

    Post(url) {
        console.log(['JSON SENT', JSON.parse(this.Data)])
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: this.Data, // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }
}

export default BoardingPassService