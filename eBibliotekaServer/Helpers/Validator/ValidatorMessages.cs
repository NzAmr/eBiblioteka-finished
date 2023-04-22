using System;

namespace eBibliotekaServer.Helpers.Validator
{
    public class ValidatorMessages
    {
        public class Email
        {
            public static string Invalid = "E-mail adresa nije validna!";
        }
        public class Username
        {
            public static string Length = "Korisničko ime mora sadržavati najmanje tri karaktera!";
            public static string Taken = "Korisničko ime je zauzeto!";
        }
        public class Password
        {
            public static string Length = "Lozinka mora sadržavati najmanje tri karaktera!";
            public static string CapitalLetter = "Lozinka mora sadržavati najmanje jedno veliko slovo!";
            public static string Number = "Lozinka mora sadržavati najmanje jedan broj!";
        }
        public class LibraryName
        {
            public static string Length = "Ime biblioteke mora sadržavati najmanje tri karaktera!";
        }

        public class BusinessHours
        {
            public static string Length = "Radno vrijeme mora biti u formatu HHMM!";
            public static string Hours = "Sati ne mogu biti manji od 0 ni veći od 24!";
            public static string Minutes = "Minute ne mogu biti manji od 0 ni veći od 60!";
            public static string NonSequential = "Radno vrijeme ne može završavati prije nego što počne!";
        }


        public class Generic
        {
            public static Func<string, int, string> Length = (string fieldName, int length) => $"Polje {fieldName} ne smije sadržavati više od {length} karaktera!";
            public static Func<string, string> NotNegative = (string fieldName) => $"Polje {fieldName} ne smije imati negativnu vrijednost!";
            public static Func<string, string> NotZero = (string fieldName) => $"Polje {fieldName} ne smije imati vrijednost 0!";
        }
    }
}
