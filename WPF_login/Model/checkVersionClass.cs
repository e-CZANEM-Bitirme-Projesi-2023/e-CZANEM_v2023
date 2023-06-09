using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPF_login.Model
{

    public class ResponseCheckVersion
    {
        public string newVersionUrl { get; set; }
        public bool check { get; set; }
    }

    public class RootCheckVersion
    {
        public string status { get; set; }
        public ResponseCheckVersion response { get; set; }
    }

    public class checkVersionPost
    {
        public string version { get; set; }
    }


}
