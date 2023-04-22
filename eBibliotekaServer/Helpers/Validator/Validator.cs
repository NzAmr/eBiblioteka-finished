using eBibliotekaServer.AuthModule.ViewModels;
using eBibliotekaServer.LibraryModule.Models;
using eBibliotekaServer.LibraryModule.ViewModels;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using static eBibliotekaServer.Helpers.Validator.ValidatorOptions;

namespace eBibliotekaServer.Helpers.Validator
{
    public class Validator
    {
        public static Dictionary<FieldType, ValidatorFunc> Options = ValidatorOptions.FieldOptions;
        public static Dictionary<GenericField, GenericValidatorFunc> GenericOptions = ValidatorOptions.GenericOptions;

        public static List<string> ValidateField(FieldType fieldType, string input) {
            return Options[fieldType](input);
        }

        public static List<string> ValidateGenericField(GenericField genericField, string fieldName, string input)
        {
            return GenericOptions[genericField](fieldName, input);
        }

        public static List<string> ValidateUserRegistration(UserRegisterVM data)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateField(FieldType.Email, data.Email));
            errors.AddRange(ValidateField(FieldType.Username, data.Username));
            errors.AddRange(ValidateField(FieldType.Password, data.Password));

            return errors;
        }

        public static List<string> ValidateLibrarianRegistration(LibrarianRegisterVM data)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateField(FieldType.Email, data.Email));
            errors.AddRange(ValidateField(FieldType.Username, data.Username));
            errors.AddRange(ValidateField(FieldType.Password, data.Password));
            errors.AddRange(ValidateField(FieldType.LibraryName, data.LibraryName));

            return errors;
        }

        public static List<string> ValidateAccountUpdate(AccountUpdateVM data)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateField(FieldType.Email, data.Email));
            errors.AddRange(ValidateField(FieldType.Username, data.Username));

            return errors;
        }

        public static List<string> ValidateMembershipOffer(MembershipOffer data)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateGenericField(GenericField.ShortText, "Naslov", data.Title));
            errors.AddRange(ValidateGenericField(GenericField.MediumText, "Opis", data.Title));

            errors.AddRange(ValidateGenericField(GenericField.NotZero, "Broj knjiga", data.NoOfBooks.ToString()));
            errors.AddRange(ValidateGenericField(GenericField.NotNegative, "Broj knjiga", data.NoOfBooks.ToString()));

            errors.AddRange(ValidateGenericField(GenericField.NotZero, "Cijena", data.Price.ToString()));
            errors.AddRange(ValidateGenericField(GenericField.NotNegative, "Cijena", data.Price.ToString()));

            errors.AddRange(ValidateGenericField(GenericField.NotZero, "Trajanje ", data.NoOfBooks.ToString()));
            errors.AddRange(ValidateGenericField(GenericField.NotNegative, "Trajanje ", data.NoOfBooks.ToString()));

            return errors;
        }

        public static List<string> ValidateBusinessHours(BusinessHoursCreateVM data)
        {
            List<string> errors = new List<string>();

            errors.AddRange(ValidateField(FieldType.BusinessHoursTime, data.TimeFrom));
            errors.AddRange(ValidateField(FieldType.BusinessHoursTime, data.TimeTo));

            if (errors.Count == 0)
            {
                errors.AddRange(SpecialValidation.ValidateSequentialTime(data.TimeFrom, data.TimeTo));
            }

            return errors;
        }
    }
}
