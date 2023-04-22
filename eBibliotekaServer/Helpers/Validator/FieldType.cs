namespace eBibliotekaServer.Helpers.Validator
{
    public enum FieldType
    {
        Email,
        Username,
        Password,
        FirstName,
        LastName,
        LibraryName,
        BusinessHoursTime
    }

    public enum GenericField
    {
        ShortText,
        MediumText,
        NotNegative,
        NotZero,
    }
}
