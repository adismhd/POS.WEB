using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Warmang.Controllers
{
    public class TransaksiController : Controller
    {
        public IActionResult Transaksi()
        {
            return View();
        }
    }
}
