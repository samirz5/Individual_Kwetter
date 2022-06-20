using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Collections.Generic;

namespace Tweet_Purifier
{
    public static class PurifyTweet
    {
        [FunctionName("PurifyTweet")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Purifying tweet of swear words");

            string description = req.Query["tweet"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);


            description ??= data?.Description;

            string cleandString = FilterTweet(description);


            return new OkObjectResult(cleandString);
        }

        private static List<string> FilteredWords()
        {
            List<string> Filter = new List<string>();
            Filter.Add("fuck");
            Filter.Add("shit");
            // Add more here!
            return Filter;
        }

        private static string FilterTweet(string input)
        {
            foreach (string fWord in FilteredWords())
            {
                //  Replace the word with *'s (but keep it the same length)
                string strReplace = "";
                for (int i = 0; i <= fWord.Length; i++)
                {
                    strReplace += "*";
                }
                input = Regex.Replace(input.ToString(), fWord, strReplace, RegexOptions.IgnoreCase);
            }
            return input.ToString();
        }
    }
}
