using eBibliotekaServer.AuthModule.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace eBibliotekaServer.Helpers
{
    public class AuthHelper
    {
        public static byte[] _hashKey = Encoding.UTF8.GetBytes("TestniKljuc123");
        public static byte[] _salt = Encoding.UTF8.GetBytes("TestniSalt123");

        public AuthHelper()
        {
        }

        public static byte[] GenerateSaltedHash(byte[] plainText)
        {
            HashAlgorithm algorithm = new HMACSHA256(_hashKey);

            byte[] plainTextWithSaltBytes =
              new byte[plainText.Length + _salt.Length];

            for (int i = 0; i < plainText.Length; i++)
            {
                plainTextWithSaltBytes[i] = plainText[i];
            }
            for (int i = 0; i < _salt.Length; i++)
            {
                plainTextWithSaltBytes[plainText.Length + i] = _salt[i];
            }

            return algorithm.ComputeHash(plainTextWithSaltBytes);
        }

        public static bool ConfirmPassword(byte[] plainText, byte[] targetPassword)
        {
            byte[] passwordHash = GenerateSaltedHash(plainText);

            return targetPassword.SequenceEqual(passwordHash);
        }

        public static int GetAccountIdFromToken(string token)
        {
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var id = jwt.Claims.Where(claim => claim.Type == ClaimTypes.Name).First().Value;

            return int.Parse(id);
        }
        
        public static int GetAccountIdFromRequest(HttpRequest request)
        {
            try
            {
                string token = request.Headers["authorization"].First().Remove(0, 7);
                return GetAccountIdFromToken(token);
            }
            catch (InvalidOperationException ex)
            {
                return -1; // korisnik nije logiran
            }
        }

        public static AccountType GetAccountType(string token)
        {
            try
            {
                var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
                var role = jwt.Claims.Where(claim => claim.Type == ClaimTypes.Role).First().Value;

                if (role == "User")
                {
                    return AccountType.User;
                }
                else
                {
                    return AccountType.Library;
                }
            }
            catch (Exception ex)
            {
                return AccountType.Unauthorized;
            }
        }

        public static AccountType GetAccountTypeFromRequest(HttpRequest request)
        {
            try
            {
                string token = request.Headers["authorization"].First().Remove(0, 7);

                var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
                var role = jwt.Claims.Where(claim => claim.Type == ClaimTypes.Role).First().Value;

                if (role == "User")
                {
                    return AccountType.User;
                }
                else
                {
                    return AccountType.Library;
                }
            }
            catch (Exception ex)
            {
                return AccountType.Unauthorized;
            }
        }
    }
}

