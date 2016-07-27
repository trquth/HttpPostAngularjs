using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpPostAPI.Models
{
    public class UserViewModel
    {
        public Account Account { get; set; }
    }
    public class Account
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}