using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Controllers
{
    public class BaseController : Controller
    {
        public async Task<(string responseString, TResponse responseObject)> SendAsync<TResponse>(string baseUrl, string httpMethod, object requestDto)
        {
            //if (string.IsNullOrEmpty(HttpContext.Session.GetString(CustomSessionNames.Token)))
            //    throw new Exception("Un Authorization!");

            //var validDate = Convert.ToDateTime(HttpContext.Session.GetString(CustomSessionNames.TokenValidUntil));
            //if (DateTime.Now > validDate)
            //    throw new Exception("Token Expired.");

            //var tkn = HttpContext.Session.GetString(CustomSessionNames.Token);
            //var usr = HttpContext.Session.GetString(CustomSessionNames.UserId);

            var client = new JsonServiceClient(baseUrl);
            //client.AddHeader(CustomSessionNames.Authorization, tkn);
            //client.AddHeader(CustomSessionNames.UserId, usr);

            TResponse response;
            if (httpMethod.ToUpper() == "POST")
                response = await client.PostAsync<TResponse>(requestDto);
            else if (httpMethod.ToUpper() == "GET")
                response = await client.GetAsync<TResponse>(requestDto);
            else
                throw new Exception("httpMethod null.");

            var responseString = System.Text.Json.JsonSerializer.Serialize(response, new System.Text.Json.JsonSerializerOptions
            {
                PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
            });

            //SetViewBag(userId);

            return (responseString, response);
        }
    }
}
