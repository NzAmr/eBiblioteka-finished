using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace eBibliotekaServer.Helpers.Validator
{
    public class ValidatorOptions
    {
        public delegate List<string> ValidatorFunc(string input);
        public delegate List<string> GenericValidatorFunc(string fieldName, string input);

        public static Dictionary<FieldType, ValidatorFunc> FieldOptions = new Dictionary<FieldType, ValidatorFunc>()
        {
            { FieldType.Email, (string input) => {
                List<string> messages = new List<string>();
                const string pattern = @"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+";

                if(!Regex.Match(input, pattern).Success)
                {
                    messages.Add(ValidatorMessages.Email.Invalid);
                }

                return messages;
            }},
            { FieldType.Username, (string input) => {
                List<string> messages = new List<string>();

                if(input.Length < 3)
                {
                    messages.Add(ValidatorMessages.Username.Length);
                }

                return messages;
            }},
            { FieldType.Password, (string input) => {
                List<string> messages = new List<string>();
                const string patternCapital = @".*[A-Z].*";
                const string patternNumber = @".*[A-Z].*";

                if(input.Length < 3)
                {
                    messages.Add(ValidatorMessages.Password.Length);
                }

                if(!Regex.Match(input, patternCapital).Success)
                {
                    messages.Add(ValidatorMessages.Password.CapitalLetter);
                }

                if(!Regex.Match(input, patternNumber).Success)
                {
                    messages.Add(ValidatorMessages.Password.Number);
                }

                return messages;
            }},
            { FieldType.LibraryName, (string input) => {
                List<string> messages = new List<string>();

                if(input.Length < 3)
                {
                    messages.Add(ValidatorMessages.LibraryName.Length);
                }

                return messages;
            }},
            { FieldType.BusinessHoursTime, (string input) => {
                List<string> messages = new List<string>();

                if(input.Length != 4)
                {
                    messages.Add(ValidatorMessages.BusinessHours.Length);

                    return messages;
                }

                int hour = int.Parse(input.Substring(0, 2));
                int minutes = int.Parse(input.Substring(2, 2));


                if(hour > 24 || hour < 0)
                {
                    messages.Add(ValidatorMessages.BusinessHours.Hours);
                }

                if(minutes > 60 || minutes < 0)
                {
                    messages.Add(ValidatorMessages.BusinessHours.Minutes);
                }

                return messages;
            }},
        };

        public static Dictionary<GenericField, GenericValidatorFunc> GenericOptions = new Dictionary<GenericField, GenericValidatorFunc>()
        {
            { GenericField.ShortText, (string fieldName, string input) => {
                List<string> messages = new List<string>();

                if(input.Length > 25)
                {
                    messages.Add(ValidatorMessages.Generic.Length(fieldName, 25));
                }

                return messages;
            }},
            { GenericField.MediumText, (string fieldName, string input) => {
                List<string> messages = new List<string>();

                if(input.Length > 100)
                {
                    messages.Add(ValidatorMessages.Generic.Length(fieldName, 100));
                }

                return messages;
            }},
            { GenericField.NotNegative, (string fieldName, string input) => {
                List<string> messages = new List<string>();

                if(decimal.Parse(input) < 0)
                {
                    messages.Add(ValidatorMessages.Generic.NotNegative(fieldName));
                }

                return messages;
            }},
            { GenericField.NotZero, (string fieldName, string input) => {
                List<string> messages = new List<string>();

                if(decimal.Parse(input) == 0)
                {
                    messages.Add(ValidatorMessages.Generic.NotZero(fieldName));
                }

                return messages;
            }},
        };
    }
}
