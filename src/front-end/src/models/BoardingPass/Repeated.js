class Repeated {
    Id
    Data = []

    constructor(id) {
        this.Id = id
        this.Data = [
            {
                dtoLabel: "operatingCarrierPNRCode",
                label: "Operating Carrier PNR Code",
                default: "ABC123",
                value: ""
            },
            {
                dtoLabel: "fromCityAirportCode",
                label: "From City Airport Code",
                default: "YUO",
                value: ""
            },
            {
                dtoLabel: "toCityAirportCode",
                label: "To City Airport Code",
                default: "FRA",
                value: ""
            },
            {
                dtoLabel: "operatingCarrierDesignator",
                label: "Operating Carrier Designator",
                default: "AC",
                value: ""
            },
            {
                dtoLabel: "flightNumber",
                label: "Flight Number",
                default: "0834",
                value: ""
            },
            {
                dtoLabel: "dateOfFlight",
                label: "Date Of Flight",
                default: "2019/05/02",
                value: ""
            },
            {
                dtoLabel: "compartmentCode",
                label: "Compartment Code",
                default: "Y",
                value: ""
            },
            {
                dtoLabel: "seatNumber",
                label: "Seat Number",
                default: "001A",
                value: ""
            },
            {
                dtoLabel: "checkInSequenceNumber",
                label: "Check In Sequence Number",
                default: "0001",
                value: ""
            },
            {
                dtoLabel: "passengerStatus",
                label: "Passenger Status",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "airlineNumericCode",
                label: "Airline Numeric Code",
                default: "784",
                value: ""
            },
            {
                dtoLabel: "documentFormSerialNumber",
                label: "Document Form Serial Number",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "selecteeIndicator",
                label: "Selectee Indicator",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "internationalDocumentationVerification",
                label: "International Documentation Verification",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "marketingCarrierDesignator",
                label: "Marketing Carrier Designator",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "frequentFlyerAirlineDesignator",
                label: "Frequent Flyer Airline Designator",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "frequentFlyerNumber",
                label: "Frequent Flyer Number",
                default: "5432109876543210",
                value: ""
            },
            {
                dtoLabel: "idAdIndicator",
                label: "Id Ad Indicator",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "freeBaggageAllowance",
                label: "Free Baggage Allowance",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "fastTrack",
                label: "Fast Track",
                default: "0",
                value: ""
            },
            {
                dtoLabel: "forIndividualAirlineUse",
                label: "For Individual Airline Use",
                default: "",
                value: ""
            }
        ]
    }
}

export default Repeated