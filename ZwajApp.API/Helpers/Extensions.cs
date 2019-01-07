
using System;
using Microsoft.AspNetCore.Http;

namespace ZwajApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            // CORS context.Response.Headers["Access-Control-Allow-Origin"] = "*";
            // response.Headers["Application-Error"] = message;
            // response.Headers["Access-Control-Allow-Origin"] = "*";
            // response.Headers["access-control-expose-headers"] = "Application-Error";
            response.Headers.Add("access-control-expose-headers", "Application-Error");
            response.Headers.Add("access-control-allow-origin", "*");
            // response.Headers.Add("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH");
        }
        public static int CalculateAge(this DateTime datetime)
        {
            var age = DateTime.Today.Year - datetime.Year;
            if (datetime.AddYears(age) > DateTime.Today) age--;
            return age;
        }
    }
}