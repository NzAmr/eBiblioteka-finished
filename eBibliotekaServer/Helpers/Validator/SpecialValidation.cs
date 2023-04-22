using System.Collections.Generic;

namespace eBibliotekaServer.Helpers.Validator
{
    public class SpecialValidation
    {
        public static List<string> ValidateSequentialTime(string time1 ,string time2)
        {
            // Provjeravanje da li se time2 izvršava poslije time1
            // Format za vrijeme je HHMM

            List<string> messages = new List<string>();

            if (int.Parse(time1) > int.Parse(time2))
            {
                messages.Add(ValidatorMessages.BusinessHours.NonSequential);
            }

            return messages;
        }
    }
}
