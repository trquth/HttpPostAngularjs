using HttpPostAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HttpPostAPI.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Login(UserViewModel model)
        {
            if (model == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
