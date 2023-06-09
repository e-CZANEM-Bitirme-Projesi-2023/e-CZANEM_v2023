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
using System.Windows.Shapes;
using System.ComponentModel;
using WPF_login.Model;
using System.Net;
using System.Net.Security;
using RestSharp;
using Newtonsoft.Json;

namespace WPF_login.UserInterFace
{
    /// <summary>
    /// Interaction logic for urunlerScreen.xaml
    /// </summary>
    public partial class urunlerScreen : Window
    {

        public urunlerScreen()
        {
            InitializeComponent();
            //After initialize
            sayilariDoldur();
            worker.DoWork += worker_DoWork;
            worker.RunWorkerCompleted += worker_RunWorkerCompleted;
            if (!worker.IsBusy)
            {
                worker.RunWorkerAsync();
            }

        }
        //------------------------------------GlobalS------------------------------------!
        List<MyTableToWpf> valuesFromDB;
        string baseUrlString = "https://drive.google.com/uc?export=view&id=";
        //-------------------------------------------------------------------------------!


        private void urunIdComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (valuesFromDB.Count > 0)
            {
                MyTableToWpf currItem = valuesFromDB.FirstOrDefault(x => x.id == Convert.ToInt64(urunIdComboBox.SelectedItem.ToString()));
                if (currItem != null) 
                {
                    BitmapImage bitmap = new BitmapImage(new Uri(baseUrlString+ currItem.image1));
                    urlResim.Source = bitmap;
                    ilacAdiText.Text = currItem.name;
                    ureticiFirmaText.Text = currItem.author;
                    urunHakkindaText.Text = currItem.description;
                }
            }
            _stokgetir(User._id, Convert.ToInt32(urunIdComboBox.SelectedItem.ToString()));
        }

        //------------------------------------Cagri Islemleri----------------------------!
        private readonly BackgroundWorker worker = new BackgroundWorker();
        private void worker_DoWork(object sender, DoWorkEventArgs e)
        {
            try
            {
                _getIlaclar();
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
        private async void _getIlaclar()
        {
            var response = await getIlaclar();
            if (response.Count > 0) //eger backendden veri geldi ise
            {
                valuesFromDB = response;
            }
            valuesFromDB.ForEach(currItem =>
            {
                Application.Current.Dispatcher.Invoke((Action)delegate
                {
                    urunIdComboBox.Items.Add(currItem.id);
                });               


            });

        }
        private async Task<List<MyTableToWpf>> getIlaclar()
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
                var request = new RestRequest(EndPoints.getAllMedicines, Method.Get);
              
                // İsteği gönderme ve yanıtı alma
                var response = await client.ExecuteAsync(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<List<MyTableToWpf>>(JsonConvert.DeserializeObject<string>(response.Content));
                return myDeserializedClass;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        private async void _stokgetir(int _ezaneid ,int _urunid)
        {
            updateStockDto tempObject = new updateStockDto { eczaneid = _ezaneid, urunid = _urunid, urunstok = 0, isupdate = 0 };
            var response = await stokGuncelle(tempObject);
            if (response.ilacvestok != null) //eger backendden veri geldi ise
            {
                var count = response.ilacvestok.First(_item => _item.id == _urunid).count;
                stokCombo.SelectedItem = count;
            }
            else
            {
                MessageBox.Show("UYARI","Ürün Stok Bilgisi Getirilemedi !!");
            }          
        }
        private async void _stokguncelle(updateStockDto item)
        {
         
            var response = await stokGuncelle(item);
            if (response.ilacvestok != null) //eger backendden veri geldi ise
            {
                MessageBox.Show("Stok Bilgisi Güncellendi !","UYARI");
            }
            else
            {
                MessageBox.Show("Stok Bilgisi Güncellenemedi !!","UYARI");
            }
        }
        private async Task<Eczaneler> stokGuncelle(updateStockDto item)
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
                var request = new RestRequest(EndPoints.gupdateStockAndGet, Method.Post);
                request.AddHeader("Content-Type", "application/json");
                var body = item;
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                // İsteği gönderme ve yanıtı alma
                var response = await client.ExecuteAsync(request);
                var myDeserializedClass = JsonConvert.DeserializeObject<Eczaneler>(JsonConvert.DeserializeObject<string>(response.Content));
                return myDeserializedClass;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        private void refreshPageButton_Click(object sender, RoutedEventArgs e)
        {
            var _urunid = Convert.ToInt32(urunIdComboBox.SelectedItem.ToString());
            var _urunstok = Convert.ToInt32(stokCombo.SelectedItem.ToString());
            updateStockDto tempObject = new updateStockDto { eczaneid = User._id, urunid = _urunid, urunstok = _urunstok, isupdate = 1 };
            _stokguncelle(tempObject);
        }
        //------------------------------------Cagri Islemleri End----------------------------!
        public async void sayilariDoldur() 
        {
            for (int i = 0; i < 100; i++)
            {
                stokCombo.Items.Add(i);
            }
        }
        //Theme Code ========================>
        public bool IsDarkTheme { get; set; }
        private readonly PaletteHelper paletteHelper = new PaletteHelper();
        //===================================>
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

       
    }
}
