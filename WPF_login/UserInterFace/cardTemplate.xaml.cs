using Newtonsoft.Json;
using RestSharp;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using WPF_login.Model;

namespace WPF_login
{
    /// <summary>
    /// Interaction logic for cardTemplate.xaml
    /// </summary>
    public partial class cardTemplate : UserControl
    {

        RootOrderClass backupValues;
        public cardTemplate(RootOrderClass values)
        {
            InitializeComponent();
            backupValues = values;
            getIsim(values.userid); //values.userid.ToString(); //todo user tablosundan isim cekecek..
            userNameLabel.Text = "Sıpariş Numarası: " + values.orderid.ToString();
            labelDate.Text = values.date.ToString();
        }
        //  WPF_login.mainPage oldPage;   
        string username;
        private void nameOnTheCard_MouseDown(object sender, MouseButtonEventArgs e)
        {
            
        }

        private async void getIsim(int id) 
        {
            string url = EndPoints.getIsimFromId;
            int userid = User._id;


            try
            {
                var client = new RestClient();

                // İstek oluşturma
                var request = new RestRequest(url, Method.Get);

                // Endpoint'e id parametresini eklemek için
                int userId = id; // id değerini isteğinize göre değiştirin
                request.AddParameter("userId", userId);
                // İsteği gönderme ve yanıtı alma
                var response = await client.ExecuteAsync(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<string>(response.Content);
                username = myDeserializedClass;
                Application.Current.Dispatcher.Invoke((Action)delegate
                {
                    loginBtn.Content = myDeserializedClass;
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        private void doLogin(object sender, RoutedEventArgs e) //isim degisecek
        {
            var newPage = new isTanimiSayfasi(backupValues,username);
            newPage.Show();
        }
    }
}
