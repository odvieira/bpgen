using Sita.APC.Toolset.Core.Exceptions;
using System;

namespace Sita.APC.Toolset.Core.Common
{
    public class Helper : IHelper
    {
        public string DateStringToJulianDate(string date) // Only allows YYYY/MM/DD for now
        {
            var dateAttrList = date.Split('/');
            var julianYear = dateAttrList[0][3];
            var beginningOfTheYear = new DateTime(int.Parse(dateAttrList[0]), 1, 1);
            var givenDate = DateTime.Parse(date);

            return julianYear + (givenDate.Subtract(beginningOfTheYear).TotalDays + 1).ToString("000");
        }

        public string GetBarCodeGenericField(string field, int expectedSize)
        {
            if (string.IsNullOrEmpty(field))
            {
                if (expectedSize == 0)
                    return "";
                else
                    field = "";
            }

            field = field.ToUpper();

            if (field.Length > expectedSize)
                throw new InvalidFieldException(
                    string.Format(
                        "Unexpected situation: lengthOf({0}) is bigger than expected",
                        field
                    )
                );
            else if (field.Length < expectedSize)
                return string.Concat(
                    field,
                    new string(
                        ' ',
                        expectedSize -
                        field.Length
                    )
                );
            else
                return field;
        }

    }

}
