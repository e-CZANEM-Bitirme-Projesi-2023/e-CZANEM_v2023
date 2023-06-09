using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPF_login.Model
{
    public static class EndPoints
    {
        public static string getAllOrders = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getOrders";
        public static string getAllMedicines = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllProductsWpf";
        public static string gupdateStockAndGet = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/updateAndGetStock";
        public static string loginEndPointLive = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/postLoginPharmacy";
        public static string getIsimFromId = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getUserNameFromUserId";
        public static string getIlacIsimFromId = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getMedicineNameFromId";
        public static string postKuryeCagir = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/addNewKurye";
        public static string getEczaneBilgileri = "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllocationWithId";





        //public static string loginEndPointLive = "https://localhost:7091/api/postLoginPharmacy";




    }
}
