using Sita.APC.Toolset.Domain.Interfaces;namespace Sita.APC.Toolset.Services.Interfaces{    public interface ILegService    {        string GetFieldSizeOfFollowingStructuredMessageRepeated();                int GetForIndividualAirlineUseLenghtRepeated(ILeg leg);                string GetFieldSizeOfFollowingVariableSizeField(ILeg leg);                string GetStringOfMandatoryItems(ILeg leg);                string GetStringOfConditionalItems(ILeg leg);

        bool ValidateLeg(ILeg leg);    }}
