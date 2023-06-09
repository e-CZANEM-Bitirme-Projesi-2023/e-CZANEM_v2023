//Theme Code ==================>>
using MaterialDesignThemes.Wpf;
using MySqlConnector;
//=============================>>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;
using WPF_login.Model;
using Newtonsoft.Json;
using RestSharp;
using RestSharp.Authenticators;
using System.Threading;
using System.Diagnostics;
using System.ComponentModel;
using System.Drawing;
using WPF_login.UserInterFace;
using System.Net;
using System.Net.Security;

namespace WPF_login
{
    /// <summary>
    /// Interaction logic for isTanimiSayfasi.xaml
    /// </summary>
    public partial class isTanimiSayfasi : Window
    {

       
        public bool IsDarkTheme { get; set; }
        private readonly PaletteHelper paletteHelper = new PaletteHelper();
        RootOrderClass valuesBackup;
        public isTanimiSayfasi(RootOrderClass values, string username)
        {
            InitializeComponent();
            valuesBackup = values;
            Random random = new Random();
            orderIdTopLabel.Text = String.Format("Sipariş Numarası: {0}, İsim: {1}", values.orderid, username);
            adressLabel.Text = String.Format("Adres Bilgisi: {0}", values.adress);
            telefonNumarası.Text = String.Format("Telefon Numarası: {0}", values.phonenumber.ToString());
            status.Text = String.Format("Sıpariş Durumu: {0}", values.status.ToString()); 

            //urunlerin basilacagi yer..
            if (values.medicines.Count>0)
            {
                foreach (var item in values.medicines)
                {
                    string ilacismi = getIsim(item.id);
                    var myCardTemplate = new WPF_login.orderedCardTemplate(item, random, ilacismi);
                    stackPanelOrders.Dispatcher.BeginInvoke(new Action(() => { stackPanelOrders.Children.Add(myCardTemplate); }));
                }
            }
        }

        private  string getIsim(int id)
        {
            string url = EndPoints.getIlacIsimFromId;
            int userid = User._id;


            try
            {
                var client = new RestClient();

                // İstek oluşturma
                var request = new RestRequest(url, Method.Get);

                // Endpoint'e id parametresini eklemek için               
                request.AddParameter("id", id);
                // İsteği gönderme ve yanıtı alma
                var response = client.Execute(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<string>(response.Content);
                return myDeserializedClass;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }
        private async Task<returnClassModel> kuryeCagir(KuryeNavigasyon item)
        {

            ServicePointManager.ServerCertificateValidationCallback = new
            RemoteCertificateValidationCallback
            (
               delegate { return true; }
            );


            try
            {
                var client = new RestClient();

                // İstek oluşturma
                var request = new RestRequest(EndPoints.postKuryeCagir, Method.Post);
                request.AddHeader("Content-Type", "application/json");
                var body = item;
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                // İsteği gönderme ve yanıtı alma
                var response = await client.ExecuteAsync(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<returnClassModel>(JsonConvert.DeserializeObject<string>(response.Content));
                return myDeserializedClass;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        private void toggleTheme(object sender, RoutedEventArgs e)
        {
            //Theme Code ========================>
            ITheme theme = paletteHelper.GetTheme();
            if (IsDarkTheme = theme.GetBaseTheme() == BaseTheme.Dark)
            {
                IsDarkTheme = false;
                theme.SetBaseTheme(Theme.Light);
            }
            else
            {
                IsDarkTheme = true;
                theme.SetBaseTheme(Theme.Dark);
            }

            paletteHelper.SetTheme(theme);
            //===================================>
        }

        private void exitApp(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }


        private void minimizeApp(object sender, RoutedEventArgs e)
        {
            WindowState = System.Windows.WindowState.Minimized;
        }

       
        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseLeftButtonDown(e);

            // Begin dragging the window
            this.DragMove();
        }
        private void backButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
            //foreach (Window window in Application.Current.Windows)
            //{
            //    if (window.Name == "mainPage2")
            //    {
            //        window.Top = this.Top;
            //        window.Left = this.Left;
            //        //window.WindowStartupLocation = this.WindowStartupLocation;
            //        window.Show();
            //    }
            //}
        }

        private async void butonCagir_Click(object sender, RoutedEventArgs e)
        {
            KuryeNavigasyon kuryeNavigasyon = new KuryeNavigasyon();
            kuryeNavigasyon.kuryeid         = 384566;
            kuryeNavigasyon.userlong        = valuesBackup.longt;
            kuryeNavigasyon.userlat         = valuesBackup.lat;
            kuryeNavigasyon.eczanelong      = User._eczanelong;
            kuryeNavigasyon.eczanelat       = User._eczanelat;   
            kuryeNavigasyon.orderid         = valuesBackup.orderid;
            kuryeNavigasyon.eczaneid        = User._id;
            kuryeNavigasyon.teslimdurumu = "false";
            // gonderilecek veriler dolduruldu

            var result = await kuryeCagir(kuryeNavigasyon);
            if (result != null && result.status_code == "200") 
            {
                MessageBox.Show("Kurye Çağırıldı", "UYARI");
                butonCagir.Content = "Kurye Çağırıldı";
                butonCagir.IsEnabled = false;
            }
            else
            {
                MessageBox.Show("Kurye Çağırılamadı Tekrar Deneyiz...", "UYARI");
            }

           
        }
    }
}
