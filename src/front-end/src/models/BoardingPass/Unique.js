class Unique {
    Id
    Data = []    

    constructor(id) {
        this.Id = id
        this.Data = [
            {
                dtoLabel: "passengerFirstName",
                label: "Passenger First Name",
                value: "",
                default: ""
            },
            {
                dtoLabel: "passengerLastName",
                label: "Passenger Last Name",
                value: "",
                default: ""
            },
            {
                dtoLabel: "formatCode",
                label: "Format Code",
                value: "",
                default: "M"
            },
            {
                dtoLabel: "electronicTicketIndicator",
                label: "Electronic Ticket Indicator",
                value: "",
                default: "E"
            },
            {
                dtoLabel: "passengerDescription",
                label: "Passenger Description",
                value: "",
                default: "Foo"
            },
            {
                dtoLabel: "sourceOfCheckIn",
                label: "Source Of Check In",
                value: "",
                default: "W"
            },
            {
                dtoLabel: "sourceOfBoardingPassIssuance",
                label: "Source Of Boarding Pass Issuance",
                value: "",
                default: "W"
            },
            {
                dtoLabel: "dateOfIssueOfBoardingPass",
                label: "Date Of Issue Of BoardingPass",
                value: "",
                default: "2019"
            },
            {
                dtoLabel: "documentType",
                label: "Document Type",
                value: "",
                default: "B"
            },
            {
                dtoLabel: "airlineDesignatorOfBoardingPassIssuer",
                label: "Airline Designator Of Boarding PassIssuer",
                value: "",
                default: "X"
            },
        ]
    }
}


export default Unique