#!/usr/bin/env python3

import requests

url = "http://localhost:5000/bpgen"

name = ['DANIEL', 'JOHN', 'JOHN', 'ROD', 'MICHAEL', 'WILLIAM']
surname = ['VIEIRA', 'MARSHALL', 'STEWART', 'STEWART', 'JORDAN', 'OLIVER']
airport = ['YUL','CWB','NWC','HOU','CAL', 'BCB']

for i in range(6):
    for j in range(6):
        for k in range(6):
            payload = ("{\n    \"project\": \"APC\",\n    \"formatCode\": \"M\",\n    \"numberOfLegs\": \"1\",\n    \"passengerFirstName\": \""+
            name[i]+
            "\",\n    \"passengerLastName\": \""+
            surname[j]+
            "\",\n    \"electronicTicketIndicator\": \"E\",\n    \"legs\": [\n        {\n            \"operatingCarrierPNRCode\": \"ABC123\",\n            \"fromCityAirportCode\": \""+airport[k]+"\",\n            \"toCityAirportCode\": \"FRA\",\n            \"operatingCarrierDesignator\": \"AC\",\n            \"flightNumber\": \"0834\",\n            \"dateOfFlight\": \"2019/05/02\",\n            \"compartmentCode\": \"Y\",\n            \"seatNumber\": \"001A\",\n            \"checkInSequenceNumber\": \"0001\",\n            \"passengerStatus\": \"0\",\n            \"airlineNumericCode\": \"784\",\n            \"documentFormSerialNumber\": \"0\",\n            \"selecteeIndicator\": \"0\",\n            \"internationalDocumentationVerification\": \"0\",\n            \"marketingCarrierDesignator\": \"0\",\n            \"frequentFlyerAirlineDesignator\": \"0\",\n            \"frequentFlyerNumber\": \"5432109876543210\",\n            \"idAdIndicator\": \"0\",\n            \"freeBaggageAllowance\": \"0\",\n            \"fastTrack\": \"0\",\n            \"forIndividualAirlineUse\": \"\"\n        },\n        {\n            \"operatingCarrierPNRCode\": \"ABC123\",\n            \"fromCityAirportCode\": \"FRA\",\n            \"toCityAirportCode\": \"YUL\",\n            \"operatingCarrierDesignator\": \"AC\",\n            \"flightNumber\": \"0834\",\n            \"dateOfFlight\": \"2019/05/02\",\n            \"compartmentCode\": \"Y\",\n            \"seatNumber\": \"001A\",\n            \"checkInSequenceNumber\": \"0001\",\n            \"passengerStatus\": \"0\",\n            \"airlineNumericCode\": \"0\",\n            \"documentFormSerialNumber\": \"0\",\n            \"selecteeIndicator\": \"0\",\n            \"internationalDocumentationVerification\": \"0\",\n            \"marketingCarrierDesignator\": \"0\",\n            \"frequentFlyerAirlineDesignator\": \"0\",\n            \"frequentFlyerNumber\": \"0123456789012345\",\n            \"idAdIndicator\": \"0\",\n            \"freeBaggageAllowance\": \"0\",\n            \"fastTrack\": \"0\",\n            \"forIndividualAirlineUse\": \"\"\n        }\n    ],\n    \"beginningOfVersionNumber\": \">\",\n    \"versionNumber\": \"6\",\n    \"passengerDescription\": \"_\",\n    \"sourceOfCheckIn\": \"W\",\n    \"sourceOfBoardingPassIssuance\": \"W\",\n    \"dateOfIssueOfBoardingPass\": \"2019/05/02\",\n    \"documentType\": \"B\",\n    \"airlineDesignatorOfBoardingPassIssuer\": \"X\",\n    \"bags\": [\n        {\n            \"bagTag\": \"0123456789\"\n        },\n        {\n            \"bagTag\": \"0123456788\"\n        },\n        {\n            \"bagTag\": \"0123456786\"\n        },\n        {\n            \"bagTag\": \"0123456796\"\n        }\n    ]\n}")

            headers = {
                'Content-Type': "application/json",
                'User-Agent': "PostmanRuntime/7.15.2",
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Postman-Token': "b0f93064-0800-4d0b-a1e2-322943e3c4f9,4a2cf61a-0e52-4199-835c-64a225733f6c",
                'Host': "localhost:5001",
                'Accept-Encoding': "gzip, deflate",
                'Content-Length': "2098",
                'Connection': "keep-alive",
                'cache-control': "no-cache"
                }

            response = requests.request("POST", url, data=payload, headers=headers)

            print(response.text)