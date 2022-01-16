using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using POS.Controllers;
using POS.Models;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Warmang.Controllers
{
    public class TransaksiController : BaseController
    {
        public IActionResult Transaksi()
        {
            return View();
        }

        private readonly ILogger<TransaksiController> _logger;
        private readonly IConfiguration _config;
        public TransaksiController(IConfiguration config, ILogger<TransaksiController> logger)
        {
            _config = config;
            _logger = logger;
        }

        [HttpPost("[controller]/GetDataInboxTransaksiAsync")]
        public async Task<string> GetDataInboxTransaksiAsync([FromBody] LMInboxTransaksi param)
        {
            try
            {
                string uri = "http://182.16.172.125:8811/api";

                LMInboxTransaksi request = new LMInboxTransaksi()
                {
                    USER_ID = param.USER_ID
                };

                var response = await SendAsync<LMInboxTransaksi>(uri, "POST", param);
               
                return response.responseString;
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetDataInboxTransaksiAsync (Error) ex: {ex}");
                return new LMInboxTransaksiRespone().SerializeToString();
            }
        }
    }
}
