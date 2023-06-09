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
using RestSharp;
using RestSharp.Authenticators;
using WPF_login.Model;
using Newtonsoft.Json;
using System.Configuration;
using WPF_login.UserInterFace;

namespace WPF_login
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
            labelVersion.Content = String.Format("Version {0}", ConfigurationManager.AppSettings["VersionCurrent"].ToString());
        }

        //Theme Code ========================>
        public bool IsDarkTheme { get; set; }
        private readonly PaletteHelper paletteHelper = new PaletteHelper();
        //===================================>

        public string dUsername { get; set; }

        protected string dPassword { private get; set; }

        private void OnPasswordChanged(object sender, RoutedEventArgs e)
        {
            if (this.DataContext != null)
            { ((dynamic)this.DataContext).dPassword = ((PasswordBox)sender).Password; }
        }

        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseLeftButtonDown(e);
            DragMove();
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

        private async Task<List<EczaneLogin>> postLogin(string url, int id, string password)
        {
            var client = new RestClient();
            var request = new RestRequest(url, Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var body = new UserLoginWpfDTO { id = id, password = password };
            request.AddParameter("application/json", body, ParameterType.RequestBody);
            var response = await client.ExecuteAsync(request);
            Console.WriteLine(response.StatusCode.ToString() + "       " + response.Content.ToString());
            List<EczaneLogin> myDeserializedClass = JsonConvert.DeserializeObject<List<EczaneLogin>>(JsonConvert.DeserializeObject<string>(response.Content.ToString()));
            return myDeserializedClass;
        }

        private async void doLogin(object sender, RoutedEventArgs e) //buraya popup eklenecek
        {




            string url = EndPoints.loginEndPointLive;
            int id = -1;
            string password = "";

            try
            {
                id = Convert.ToInt32(txtUsernameLogin.Text.Trim());
                password = txtPasswordLogin.Password.ToString().Trim();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Kullanıcı Adı Ve Şifreyi Doğru Girdiğinizden Emin Olunuz !");               
            }
            if (id != -1)
            {
                var request = await postLogin(url, id, password);
                if (request.Count > 0)
                {
                    //diger bilgiler icin istek gelen ile global degiskenleri doldur...

                    User._id = request[0].eczaneid;
                    var result = await getEczaneBilgileri();
                    User._eczaneadi = result.eczaneismi;
                    User._eczanelat = result.latitude.ToString();
                    User._eczanelong = result.longitude.ToString();
                    
                    var chooseScreen = new chooseScreen();
                    this.Hide();
                    chooseScreen.Show();
                }
                else
                {
                    MessageBox.Show("Kullanıcı Bulunamadı");
                }
            }           

        }
        private async Task<EczaneKonumlari> getEczaneBilgileri()
        {
            string url = EndPoints.getEczaneBilgileri;

            try
            {
                var client = new RestClient();

                // İstek oluşturma
                var request = new RestRequest(url, Method.Get);

                // Endpoint'e id parametresini eklemek için               
                request.AddParameter("eczaneid", User._id);
                // İsteği gönderme ve yanıtı alma
                var response = await client.ExecuteAsync(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<EczaneKonumlari>(JsonConvert.DeserializeObject<string>(response.Content));
                return myDeserializedClass;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }


        private void Window_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                doLogin(sender,e);
                // Do something
            }
        }
    }
}
