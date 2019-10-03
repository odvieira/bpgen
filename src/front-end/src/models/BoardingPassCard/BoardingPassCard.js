class BoardingPassCard {
    // Is a class because it's props are needed to easily filter
    KeyValuePairs = []
    Title = ''
    ItemId
    PassengerNameInBoardingPass
    Project
    PassengerName
    Airline
    DepartureAirport
    DepartureData
    Bags
    Flights
    CreateAt
    Title

    constructor(
        itemId,
        project,
        passengerName,
        airline,
        departureAirport,
        departureData,
        bags,
        flights,
        createAt,
        title,
        passengerNameInBoardingPass
    )
    {
        this.ItemId = itemId
        this.PassengerNameInBoardingPass = passengerNameInBoardingPass
        this.Project = project
        this.PassengerName = passengerName
        this.Airline = airline
        this.DepartureAirport = departureAirport
        this.DepartureData = departureData
        this.Bags = bags
        this.Flights = flights
        this.CreateAt = createAt
        this.Title = title
        this.KeyValuePairs = [
            ['Project: ', project],
            ['Passenger Name: ', passengerName],
            ['Airline: ', airline],
            ['Departure Airport: ', departureAirport],
            ['Departure Date: ', departureData],
            ['Bags: ', bags],
            ['Flights: ', flights],
            ['Created At: ', createAt]
        ]

        this.Title = title
    }
}

export default BoardingPassCard