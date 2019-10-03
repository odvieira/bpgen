using Sita.APC.Toolset.Services.Interfaces;namespace Sita.APC.Toolset.Services{    public class BoardingPassStandard : IBoardingPassStandard    {        public int FormatCodeExpectedSize { get; private set; }         public int PassengerNameExpectedSize { get; private set; }         public int ReservedSpaces { get; private set; }         public int NumberOfLegsExpectedSize { get; private set; }        public int ElectronicTicketIndicatorExpectedSize { get; private set; }        public int MaxNameSizeInDataBase { get; private set; }        public int BeginningOfVersionNumberExpectedSize { get; private set; }        public int VersionNumberExpectedSize { get; private set; }        public int FieldSizeOfFollowingStructuredMessageUniqueExpectedSize { get; private set; }        public int PassengerDescriptionExpectedSize { get; private set; }        public int SourceOfCheckInExpectedSize { get; private set; }        public int SourceOfBoardingPassIssuanceExpectedSize { get; private set; }        public int DateOfIssueOfBoardingPassExpectedSize { get; private set; }        public int DocumentTypeExpectedSize { get; private set; }        public int AirlineDesignatorOfBoardingPassIssuerExpectedSize { get; private set; }        public int BaggageTagLicencePlateNumberExpectedSize { get; private set; }        public int FirstNonConsecutiveBaggageTagLicencePlateNumberExpectedSize { get; set; }        public int SecondNonConsecutiveBaggageTagLicencePlateNumberExpectedSize { get; set; }        public BoardingPassStandard()        {            // Mandatory            FormatCodeExpectedSize = 1;            PassengerNameExpectedSize = 20;            ReservedSpaces = 1; // reservedSpaces: 1 [for '/' between names]            NumberOfLegsExpectedSize = 1;            ElectronicTicketIndicatorExpectedSize = 1;            MaxNameSizeInDataBase = 40; // Size of each name field in database            // Conditional            BeginningOfVersionNumberExpectedSize = 1;            VersionNumberExpectedSize = 1;            FieldSizeOfFollowingStructuredMessageUniqueExpectedSize = 2;            PassengerDescriptionExpectedSize = 1;            SourceOfCheckInExpectedSize = 1;            SourceOfBoardingPassIssuanceExpectedSize = 1;            DateOfIssueOfBoardingPassExpectedSize = 4;            DocumentTypeExpectedSize = 1;            AirlineDesignatorOfBoardingPassIssuerExpectedSize = 3;            BaggageTagLicencePlateNumberExpectedSize = 13;            FirstNonConsecutiveBaggageTagLicencePlateNumberExpectedSize = 0; // respective field is unused by default, if it becomes used, this field must receive 13            SecondNonConsecutiveBaggageTagLicencePlateNumberExpectedSize = 0; // respective field is unused by default, if it becomes used, this field must receive 13            /* When fields 31 and 32 are not used, they are not included in the calculation of field 10. [BoardingPass-Implementation-Guide-5th-Edition-June-2016 p. 24] */        }    }    }
