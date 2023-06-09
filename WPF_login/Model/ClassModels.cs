using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WPF_login.Model
{
    public class Medicine
    {
        public int id { get; set; }
        public int count { get; set; }
        public string price { get; set; }
        public int pharmacyid { get; set; }
    }

    public class RootOrderClass
    {
        public int orderid { get; set; }
        public string adress { get; set; }
        public List<Medicine> medicines { get; set; }
        public int userid { get; set; }
        public string ordertype { get; set; }
        public string date { get; set; }
        public string status { get; set; }
        public string phonenumber { get; set; }
        public string lat { get; set; }
        public string longt { get; set; }
    }

    public class MyTableToWpf
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string author { get; set; }
        public string image1 { get; set; }
    }
    public class updateStockDto
    {
        public int eczaneid { get; set; }
        public int urunid { get; set; }
        public int urunstok { get; set; }
        public int isupdate { get; set; }
    }

    public class Eczaneler
    {
        public int eczaneid { get; set; }
        public string isim { get; set; }
        public IList<StokBilgisi> ilacvestok { get; set; }
    }

    public class StokBilgisi
    {
        public int id { get; set; }
        public int count { get; set; }
    }
    public class EczaneLogin
    {
        public int eczaneid { get; set; }
        public string eczanesifre { get; set; }

    }
    public class UserLoginWpfDTO
    {
        public int id { get; set; }
        public string password { get; set; }
    }
    public class KuryeNavigasyon
    {

        public int kuryeid { get; set; }
        //public int pkeys { get; set; }
        public string userlong { get; set; }
        public string userlat { get; set; }
        public string eczanelong { get; set; }
        public string eczanelat { get; set; }
        public int orderid { get; set; }
        public int eczaneid { get; set; }
        public string teslimdurumu { get; set; }
    }
    public class returnClassModel
    {

        public string status_code { get; set; }

        public string message { get; set; }

        public string response { get; set; }

    }
    public class EczaneKonumlari
    {

        public decimal latitude { get; set; }
        public decimal longitude { get; set; }
        public decimal latitudeDelta { get; set; }
        public decimal longitudeDelta { get; set; }
        public string eczanetelefon { get; set; }
        public string eczaneismi { get; set; }
        public string eczaneadress { get; set; }
        public int eczaneid { get; set; }

    }

}
