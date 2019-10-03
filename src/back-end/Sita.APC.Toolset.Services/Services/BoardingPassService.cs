using System;
using System.Text.RegularExpressions;
using Sita.APC.Toolset.Core.Common;
using Sita.APC.Toolset.Core.Exceptions;
using Sita.APC.Toolset.Domain.Interfaces;
using Sita.APC.Toolset.Services.Interfaces;

namespace Sita.APC.Toolset.Services
{
    public class BoardingPassService : IBoardingPassService
    {
        private IBoardingPassStandard _boardingPassStandard; // readonly will propbably cause a Run Time Exception, but it must be confirmed!
        private readonly IHelper _helper;
        private readonly ILegService _legService;
        private readonly IBagService _bagService;

        public BoardingPassService(
            IHelper helper,
            ILegService legService,
            IBagService bagService,
            IBoardingPassStandard boardingPassStandard
        )
        {
            _boardingPassStandard = boardingPassStandard;
            _helper = helper;
            _legService = legService;
            _bagService = bagService;
        }

        public string GetBarCodeString(IBoardingPass boardingPass)
        {
            var stringOfMandatoryItems =
                    _helper.GetBarCodeGenericField(boardingPass.FormatCode, _boardingPassStandard.FormatCodeExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.NumberOfLegs, _boardingPassStandard.NumberOfLegsExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.PassengerNameInBoardingPass, _boardingPassStandard.PassengerNameExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.ElectronicTicketIndicator, _boardingPassStandard.ElectronicTicketIndicatorExpectedSize);

            var stringOfConditionalItems =
                    _helper.GetBarCodeGenericField(boardingPass.BeginningOfVersionNumber, _boardingPassStandard.BeginningOfVersionNumberExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.VersionNumber, _boardingPassStandard.VersionNumberExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.FieldSizeOfFollowingStructuredMessageUnique, _boardingPassStandard.FieldSizeOfFollowingStructuredMessageUniqueExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.PassengerDescription, _boardingPassStandard.PassengerDescriptionExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.SourceOfCheckIn, _boardingPassStandard.SourceOfCheckInExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.SourceOfBoardingPassIssuance, _boardingPassStandard.SourceOfBoardingPassIssuanceExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.JulianDateOfIssueOfBoardingPass, _boardingPassStandard.DateOfIssueOfBoardingPassExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.DocumentType, _boardingPassStandard.DocumentTypeExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.AirlineDesignatorOfBoardingPassIssuer, _boardingPassStandard.AirlineDesignatorOfBoardingPassIssuerExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.BaggageTagLicencePlateNumber, _boardingPassStandard.BaggageTagLicencePlateNumberExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.FirstNonConsecutiveBaggageTagLicencePlateNumber, _boardingPassStandard.FirstNonConsecutiveBaggageTagLicencePlateNumberExpectedSize) +
                    _helper.GetBarCodeGenericField(boardingPass.SecondNonConsecutiveBaggageTagLicencePlateNumber, _boardingPassStandard.SecondNonConsecutiveBaggageTagLicencePlateNumberExpectedSize);

            string barCodeString = stringOfMandatoryItems + _legService.GetStringOfMandatoryItems(boardingPass.Legs[0]) + stringOfConditionalItems + _legService.GetStringOfConditionalItems(boardingPass.Legs[0]);

            for (var i = 1; i < boardingPass.Legs.Count; i++)
                barCodeString += _legService.GetStringOfMandatoryItems(boardingPass.Legs[i]) + _legService.GetStringOfConditionalItems(boardingPass.Legs[i]);

            return barCodeString;
        }

        public string GetFieldSizeOfFollowingVariableSizeField(IBoardingPass boardingPass)
        {
            var FieldSizeOfFollowingStructuredMessageRepeated = Convert.ToInt32(
                    _legService.GetFieldSizeOfFollowingStructuredMessageRepeated(),
                    16
                );

            return (
                GetIntConditionalUniqueFieldsSize(boardingPass) +
                FieldSizeOfFollowingStructuredMessageRepeated +
                GetForIndividualAirlineUseLenghtUnique(boardingPass)
            ).ToString("X");
        }

        public int GetForIndividualAirlineUseLenghtUnique(IBoardingPass boardingPass)
        {
            var FieldSizeOfFollowingStructuredMessageRepeated = Convert.ToInt32(
                    _legService.GetFieldSizeOfFollowingStructuredMessageRepeated(),
                    16
                );

            if (
                boardingPass.Legs[0].ForIndividualAirlineUse.Length >
                    256 -
                    FieldSizeOfFollowingStructuredMessageRepeated -
                    GetIntConditionalUniqueFieldsSize(boardingPass)
            )
                throw new InvalidFieldException("ForIndividualAirlineUse exceeds the space limit");

            return boardingPass.Legs[0].ForIndividualAirlineUse.Length;
        }

        public string GetBarCodePassengerName(IBoardingPass boardingPass)
        {
            var firstName = boardingPass.PassengerFirstName.ToUpper();
            var lastName = boardingPass.PassengerLastName.ToUpper();

            string barCodeStringName;

            if (
                firstName.Length + lastName.Length >=
                _boardingPassStandard.PassengerNameExpectedSize - _boardingPassStandard.ReservedSpaces - 1 //1 for FirstName 1st letter
            )
            {
                if (
                    lastName.Length <=
                    _boardingPassStandard.PassengerNameExpectedSize - _boardingPassStandard.ReservedSpaces - 1 //1 for FirstName 1st letter
                )
                {
                    barCodeStringName =
                        string.Format(
                            "{0}/{1}",
                            lastName,
                            firstName.Substring(
                                0,
                                _boardingPassStandard.PassengerNameExpectedSize - 1 -//1 for FirstName 1st letter
                                lastName.Length -
                                _boardingPassStandard.ReservedSpaces
                            )
                        );
                }
                else
                {
                    barCodeStringName =
                        string.Format(
                            "{0}/{1}",
                            lastName.Substring(
                                0,
                                _boardingPassStandard.PassengerNameExpectedSize - 1 - //1 for FirstName 1st letter
                                _boardingPassStandard.ReservedSpaces
                            ),
                            firstName.Substring(
                                0,
                                1
                            )
                        );
                }
            }
            else
            {
                barCodeStringName =
                    string.Format(
                        "{0}/{1}{2}",
                        lastName,
                        firstName,
                        new string(
                            ' ',
                            _boardingPassStandard.PassengerNameExpectedSize -
                            _boardingPassStandard.ReservedSpaces -
                            lastName.Length -
                            firstName.Length
                        )
                    );

            }

            return barCodeStringName;
        }

        public string GetHexFieldSizeOfFollowingStructuredMessageUnique()
        {
            return (
                _boardingPassStandard.PassengerDescriptionExpectedSize +
                _boardingPassStandard.SourceOfCheckInExpectedSize +
                _boardingPassStandard.SourceOfBoardingPassIssuanceExpectedSize +
                _boardingPassStandard.DateOfIssueOfBoardingPassExpectedSize +
                _boardingPassStandard.DocumentTypeExpectedSize +
                _boardingPassStandard.AirlineDesignatorOfBoardingPassIssuerExpectedSize +
                _boardingPassStandard.BaggageTagLicencePlateNumberExpectedSize +
                _boardingPassStandard.FirstNonConsecutiveBaggageTagLicencePlateNumberExpectedSize +
                _boardingPassStandard.SecondNonConsecutiveBaggageTagLicencePlateNumberExpectedSize
            ).ToString("X");
        }

        public int GetIntConditionalUniqueFieldsSize(IBoardingPass boardingPass)
        {
            return _boardingPassStandard.BeginningOfVersionNumberExpectedSize +
                                        _boardingPassStandard.VersionNumberExpectedSize +
                                        Convert.ToInt32(
                                            boardingPass.FieldSizeOfFollowingStructuredMessageUnique,
                                            16
                                        );
        }

        public string GetJulianDate(IBoardingPass boardingPass)
        {
            return _helper.DateStringToJulianDate(boardingPass.DateOfIssueOfBoardingPass);
        }

        public void ValidateBoardingPass(IBoardingPass boardingPass)
        {
            try
            {
                ValidateBoardingPassItems(boardingPass);
                ValidateBoardingPassLegs(boardingPass);
                ValidateBoardingPassBaggages(boardingPass);
            }
            catch (InvalidFieldException e)
            {
                throw new InvalidFieldException(
                        string.Format(
                            "Bar Coded Boarding Pass has an invalid field: {0}.",
                            e.Message // It concatenates the nameof([field]) with the default message
                        )
                    );
            }
        }

        public void ValidateBoardingPassItems(IBoardingPass boardingPass)
        {            
            if ( !Regex.IsMatch(boardingPass.Project, @"[A-Z]{3}") )
                throw new InvalidFieldException(nameof(boardingPass.Project));
            /*
                Mandatory items - Inherent to Boarding Pass
            */
            if (boardingPass.FormatCode != "M" && boardingPass.FormatCode != "m")
                throw new InvalidFieldException(nameof(boardingPass.FormatCode));

            if (
                string.IsNullOrEmpty(boardingPass.NumberOfLegs) ||
                !Regex.IsMatch(boardingPass.NumberOfLegs, @"^[1-4]$")
            )
                throw new InvalidFieldException(nameof(boardingPass.NumberOfLegs));

            if (boardingPass.ElectronicTicketIndicator != "E" && boardingPass.ElectronicTicketIndicator != "e")
                throw new InvalidFieldException(nameof(boardingPass.ElectronicTicketIndicator));

            /*
                Conditional items
            */
            if (boardingPass.BeginningOfVersionNumber != ">")
                throw new InvalidFieldException(nameof(boardingPass.BeginningOfVersionNumber));

            if (boardingPass.VersionNumber != "6")
                throw new InvalidFieldException(nameof(boardingPass.VersionNumber));

            if (
                string.IsNullOrEmpty(boardingPass.PassengerDescription) ||
                boardingPass.PassengerDescription.Length > _boardingPassStandard.PassengerDescriptionExpectedSize
            )
                throw new InvalidFieldException(nameof(boardingPass.PassengerDescription));

            if (
                string.IsNullOrEmpty(boardingPass.SourceOfCheckIn) ||
                !Regex.IsMatch(boardingPass.SourceOfCheckIn, @"^[WKRMOTV]$", RegexOptions.IgnoreCase)
            )
                throw new InvalidFieldException(nameof(boardingPass.SourceOfCheckIn));

            if (string.IsNullOrEmpty(boardingPass.SourceOfBoardingPassIssuance))
                boardingPass.SourceOfBoardingPassIssuance = " ";
            else if (!Regex.IsMatch(boardingPass.SourceOfCheckIn, @"^[WKXRMOTV]$", RegexOptions.IgnoreCase))
                throw new InvalidFieldException(nameof(boardingPass.SourceOfBoardingPassIssuance));

            if (
                string.IsNullOrEmpty(boardingPass.DateOfIssueOfBoardingPass) ||
                !Regex.IsMatch(boardingPass.DateOfIssueOfBoardingPass, @"^([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))$")
            )
                throw new InvalidFieldException(nameof(boardingPass.DateOfIssueOfBoardingPass));

            if (
                string.IsNullOrEmpty(boardingPass.DocumentType) || // Allows anything but only @"/^[BI]$/i" has a meaning
               boardingPass.DocumentType.Length > _boardingPassStandard.DocumentTypeExpectedSize
            )
                throw new InvalidFieldException(nameof(boardingPass.DocumentType));

            if (
                string.IsNullOrEmpty(boardingPass.AirlineDesignatorOfBoardingPassIssuer) ||
                boardingPass.AirlineDesignatorOfBoardingPassIssuer.Length > _boardingPassStandard.AirlineDesignatorOfBoardingPassIssuerExpectedSize
            )
                throw new InvalidFieldException(nameof(boardingPass.AirlineDesignatorOfBoardingPassIssuer));

            /*
                Passenger Names tests
                    Tests to check if name is acceptable
            */
            if (string.IsNullOrEmpty(boardingPass.PassengerFirstName))
                throw new InvalidFieldException("FirstName is missing");

            if (string.IsNullOrEmpty(boardingPass.PassengerLastName))
                throw new InvalidFieldException("LastName is missing");
        }
    
        public void ValidateBoardingPassLegs(IBoardingPass boardingPass)
        {
            if (boardingPass.Legs == null || boardingPass.Legs.Count > 4)
                throw new InvalidFieldException(nameof(boardingPass.Legs));

            try
            {
                _legService.ValidateLeg(boardingPass.Legs[0]);
            }
            catch(Exception)
            {

                throw new InvalidFieldException(nameof(boardingPass.Legs));
            }

            /*
             * ATTENTION: RULES AND PARAMETERS CHANGE WHEN
             * YOU'RE DEALING WITH THE FIRST LEG.
             * For 1st leg it's included the Unique Fields
            */

            boardingPass.Legs[0].FieldSizeOfFollowingStructuredMessageRepeated =
                _legService.GetFieldSizeOfFollowingStructuredMessageRepeated();

            boardingPass.Legs[0].FieldSizeOfFollowingVariableSizeField = GetFieldSizeOfFollowingVariableSizeField(boardingPass);

            for (var i = 1; i < boardingPass.Legs.Count; i++)
            {
                _legService.ValidateLeg(boardingPass.Legs[i]);

                boardingPass.Legs[i].FieldSizeOfFollowingStructuredMessageRepeated = _legService.GetFieldSizeOfFollowingStructuredMessageRepeated();

                boardingPass.Legs[i].FieldSizeOfFollowingVariableSizeField =
                    _legService.GetFieldSizeOfFollowingVariableSizeField(boardingPass.Legs[i]);
            }
        }
    
        public void ValidateBoardingPassBaggages(IBoardingPass boardingPass)
        {
            boardingPass.BaggageTagLicencePlateNumber = "";
            boardingPass.FirstNonConsecutiveBaggageTagLicencePlateNumber = "";
            boardingPass.SecondNonConsecutiveBaggageTagLicencePlateNumber = "";
            
            if (boardingPass.Bags.Count == 0)
                return;
                // throw new InvalidFieldException(nameof(boardingPass.Bags) + ": There's no bags in this Boarding Pass");

            for (int i = 0; i < boardingPass.Bags.Count; i++)
            {
                if (string.IsNullOrEmpty(boardingPass.Bags[i].BagTag))
                    _bagService.CreateBag(boardingPass.Bags[i], boardingPass.Bags[i].BagTag);
                else
                    _bagService.CreateBag(boardingPass.Bags[i]);
            }

            boardingPass.Bags.Sort
            (
                (a, b) =>
                {
                    return _bagService.GetUIntTagNumber(a).CompareTo(_bagService.GetUIntTagNumber(b));
                }
            );

            for (int i = 0, j = 0, baggageCounter = 0; i < boardingPass.Bags.Count; i++)
            {
                for (
                    j = i + 1;

                    j < boardingPass.Bags.Count &&
                        _bagService.GetUIntTagNumber(boardingPass.Bags[j]) - _bagService.GetUIntTagNumber(boardingPass.Bags[j - 1]) == 1 &&
                        baggageCounter < 999;

                    j++
                )
                    baggageCounter++;

                if (boardingPass.BaggageTagLicencePlateNumber == "")
                {
                    boardingPass.Bags[i].ConsecutiveBags = _bagService.GetConsecutiveBags(baggageCounter);
                    boardingPass.BaggageTagLicencePlateNumber = _bagService.GetBaggageTagLicencePlateNumber(boardingPass.Bags[i], baggageCounter);
                }
                else if (boardingPass.FirstNonConsecutiveBaggageTagLicencePlateNumber == "")
                {
                    _boardingPassStandard.FirstNonConsecutiveBaggageTagLicencePlateNumberExpectedSize = 13;
                    boardingPass.Bags[i].ConsecutiveBags = _bagService.GetConsecutiveBags(baggageCounter);
                    boardingPass.FirstNonConsecutiveBaggageTagLicencePlateNumber = _bagService.GetBaggageTagLicencePlateNumber(boardingPass.Bags[i], baggageCounter);
                }
                else if (boardingPass.SecondNonConsecutiveBaggageTagLicencePlateNumber == "")
                {
                    _boardingPassStandard.SecondNonConsecutiveBaggageTagLicencePlateNumberExpectedSize = 13;
                    boardingPass.Bags[i].ConsecutiveBags = _bagService.GetConsecutiveBags(baggageCounter);
                    boardingPass.SecondNonConsecutiveBaggageTagLicencePlateNumber = _bagService.GetBaggageTagLicencePlateNumber(boardingPass.Bags[i], baggageCounter);
                }
                else
                    throw new InvalidFieldException(nameof(boardingPass.Bags) + ": Too many bag groups (Max: 3)");

                i = j - 1;
                baggageCounter = 0;
            }
        }

    }

}
