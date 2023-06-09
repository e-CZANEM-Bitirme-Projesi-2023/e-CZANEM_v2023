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
using WPF_login.Model;
using Newtonsoft.Json;
using RestSharp;
using RestSharp.Authenticators;
using System.Threading;
using System.ComponentModel;
using System.Net;
using System.Net.Security;

namespace WPF_login
{
    /// <summary>
    /// Interaction logic for Window1.xaml
    /// </summary>
    public partial class mainPage : Window
    {
        public mainPage()
        {
            InitializeComponent();
            DataContext = this;
            //Console.WriteLine(User._id + " -UserId");
            worker.DoWork += worker_DoWork;
            worker.RunWorkerCompleted += worker_RunWorkerCompleted;
            if (!worker.IsBusy)
            {
                addToPanel.Children.Clear();
                worker.RunWorkerAsync();
            }


        }
        private readonly BackgroundWorker worker = new BackgroundWorker();

        private void worker_DoWork(object sender, DoWorkEventArgs e)
        {
            try
            {
                _getOrders();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private void worker_RunWorkerCompleted(object sender,
                                                   RunWorkerCompletedEventArgs e)
        {
            //update ui once worker complete his work
        }
        private async void _getOrders()
        {
            string url = EndPoints.getAllOrders;
            int userid = User._id;
            var response = await getOrders(userid);
            Console.WriteLine();
            if (response.Count > 0 && response != null)
            {
                foreach (var currItem in response)
                {
                    Application.Current.Dispatcher.Invoke((Action)delegate
                    {
                        generateCardTemplate(currItem);
                    });
                }

            }

        }
        private void minimizeApp(object sender, RoutedEventArgs e)
        {
            WindowState = System.Windows.WindowState.Minimized;
        }

        private async Task<List<RootOrderClass>> getOrders(int _pharmacyid)
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
                var request = new RestRequest(EndPoints.getAllOrders, Method.Get);

                // Endpoint'e id parametresini eklemek için
                int pharmacyid = _pharmacyid; // id değerini isteğinize göre değiştirin
                request.AddParameter("pharmacyid", pharmacyid);
                // İsteği gönderme ve yanıtı alma
                var response = await client.ExecuteAsync(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<List<RootOrderClass>>(JsonConvert.DeserializeObject<string>(response.Content));
                return myDeserializedClass;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
       

        private void generateCardTemplate(RootOrderClass values)
        {
            var myCardTemplate = new WPF_login.cardTemplate(values);
            addToPanel.Dispatcher.BeginInvoke(new Action(() => { addToPanel.Children.Add(myCardTemplate); }));
        }

        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseLeftButtonDown(e);
            DragMove();
        }
        public bool IsDarkTheme { get; set; }
        private readonly PaletteHelper paletteHelper = new PaletteHelper();
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

        private void refreshPageFunc(object sender, RoutedEventArgs e)
        {
            if (!worker.IsBusy)
            {
                addToPanel.Children.Clear();
                worker.RunWorkerAsync();
            }
        }

        private void mainPage2_IsVisibleChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            if ((bool)e.NewValue)
            {
                addToPanel.Children.Clear();
                worker.RunWorkerAsync();
            }
            else
            {
                Console.WriteLine("arkaya gecti");
            }
        }
    }
}
