using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatAppSignalR.Models
{
    public class Message
    {
        public string clientid { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }
}