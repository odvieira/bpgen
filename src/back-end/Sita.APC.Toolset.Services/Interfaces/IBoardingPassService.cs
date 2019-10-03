using Sita.APC.Toolset.Domain.Interfaces;namespace Sita.APC.Toolset.Services.Interfaces{    public interface IBoardingPassService    {                string GetBarCodeString(IBoardingPass boardingPass);                int GetIntConditionalUniqueFieldsSize(IBoardingPass boardingPass);                string GetFieldSizeOfFollowingVariableSizeField(IBoardingPass boardingPass);                int GetForIndividualAirlineUseLenghtUnique(IBoardingPass boardingPass);                string GetBarCodePassengerName(IBoardingPass boardingPass);                string GetHexFieldSizeOfFollowingStructuredMessageUnique();                string GetJulianDate(IBoardingPass boardingPass);                void ValidateBoardingPass(IBoardingPass boardingPass);                void ValidateBoardingPassItems(IBoardingPass boardingPass);        void ValidateBoardingPassLegs(IBoardingPass boardingPass);    }}
