using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MaterialDesignThemes.Wpf;
using MySqlConnector;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Configuration;
using System.IO;
using Microsoft.SqlServer.Management.Sdk.Sfc;
using System.Xml;
using System.Net;
using System.Diagnostics;
using XmlTextReader = System.Xml.XmlTextReader;
using System.Xml.Linq;
using WPF_login.Model;
using RestSharp;
using Newtonsoft.Json;
using System.Reflection;
using System.ComponentModel;

namespace WPF_login.UserInterFace
{
    /// <summary>
    /// Interaction logic for versionTest.xaml
    /// </summary>
    public partial class versionTest : Window
    {
        private string MSIFilePath = System.IO.Path.Combine(Environment.CurrentDirectory, "updateVersion.msi");
        private string MSIFilePath2 = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "Activate", "deneme.msi");
        private string versionCurrent = ConfigurationManager.AppSettings["VersionCurrent"].ToString();
        private string CmdFilePath = System.IO.Path.Combine(Environment.CurrentDirectory, "Install.cmd");
        StringBuilder StringBuilder = new StringBuilder();
        public versionTest()
        {
            InitializeComponent();
            Console.WriteLine("Software Started");
            if (Process.GetProcessesByName(Assembly.GetEntryAssembly().GetName().Name).Length > 1)
            {
                MessageBox.Show("Already Running!");
                Application.Current.Shutdown();
            }
            labelVersion.Content = versionCurrent;
            checkVersion();

        }
        //Theme Code ========================>
        public bool IsDarkTheme { get; set; }
        private readonly PaletteHelper paletteHelper = new PaletteHelper();
        //===================================>
        public async void checkVersion()
        {
            ButtonProgressAssist.SetIsIndeterminate(loadingButton, false);
            var result = await checkVersion("https://duolance.bubbleapps.io/version-test/api/1.1/wf/version-check", versionCurrent);
            if (result.response.check)
            {
                MessageBoxResult resultDialog = MessageBox.Show("A new update is available, press OK and wait for it to download.", "Update", MessageBoxButton.YesNo, MessageBoxImage.Question);
                if (resultDialog == MessageBoxResult.Yes)
                {
                    // Do this
                    ButtonProgressAssist.SetIsIndeterminate(loadingButton, true);
                    if (System.IO.File.Exists(MSIFilePath))
                    {
                        System.IO.File.Delete(MSIFilePath);
                    }

                    //download new msi.
                    try
                    {
                        var client = new WebClient();
                        client.DownloadFileAsync(new Uri(result.response.newVersionUrl), MSIFilePath);
                        StringBuilder.AppendLine("Downloading...");
                        statusLabel.Content = StringBuilder.ToString();
                        client.DownloadFileCompleted += new AsyncCompletedEventHandler(Completed);

                    }
                    catch (Exception ex)
                    {

                        MessageBox.Show(ex.ToString());
                    }

                }
                else
                {
                    Application.Current.Shutdown();
                }
            }
            else
            {
                MainWindow mainWindow = new MainWindow();
                this.Close();
                mainWindow.Show();
            }
        }

        public void Completed(object o, AsyncCompletedEventArgs args)
        {
            Console.WriteLine("Download Completed ");

            StringBuilder.AppendLine("Download Completed");
            statusLabel.Content = StringBuilder.ToString();
            //check if file exists.
            if (System.IO.File.Exists(CmdFilePath))
                System.IO.File.Delete(CmdFilePath);

            //create new file.
            var fi = new FileInfo(CmdFilePath);
            var fileStream = fi.Create();
            fileStream.Close();
            //write commands to file.
            using (TextWriter writer = new StreamWriter(CmdFilePath))
            {
                writer.WriteLine(@"msiexec /i updateVersion.msi");
            }
            var p = new Process();
            statusLabel.Content = statusLabel.Content.ToString() + "\nInstalling...";
            p.StartInfo = new ProcessStartInfo("cmd.exe", "/c Install.cmd");
            p.StartInfo.CreateNoWindow = true;
            p.Start();
            p.WaitForExit();
            statusLabel.Content = statusLabel.Content.ToString() + "\nInstalled.";
            //System.Diagnostics.Process.Start(Application.ResourceAssembly.Location);
            //Task.Delay(4000);
            Application.Current.Shutdown();
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
        private async Task<RootCheckVersion> checkVersion(string url, string currVersion)
        {
            var client = new RestClient();
            var request = new RestRequest(url, Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var body = new checkVersionPost { version = currVersion };
            request.AddParameter("application/json", body, ParameterType.RequestBody);
            var response = await client.ExecuteAsync(request);
            Console.WriteLine(response.StatusCode.ToString() + "       " + response.Content.ToString());
            RootCheckVersion responseDeseialized = JsonConvert.DeserializeObject<RootCheckVersion>(response.Content.ToString());
            return responseDeseialized;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {

            if (System.IO.File.Exists(MSIFilePath))
            {
                System.IO.File.Delete(MSIFilePath);
            }

            //download new msi.
            try
            {
                using (var client = new WebClient())
                {
                    client.DownloadFile("http://squezzoo.atwebpages.com/TrackerSetup.msi", MSIFilePath2);
                }
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.ToString());
            }
            //check if file exists.
            if (System.IO.File.Exists(CmdFilePath))
                System.IO.File.Delete(CmdFilePath);

            //create new file.
            var fi = new FileInfo(CmdFilePath);
            var fileStream = fi.Create();
            fileStream.Close();
            //write commands to file.
            using (TextWriter writer = new StreamWriter(CmdFilePath))
            {
                writer.WriteLine(@"msiexec /i updateVersion.msi");
            }
            var p = new Process();
            p.StartInfo = new ProcessStartInfo("cmd.exe", "/c Install.cmd");
            p.StartInfo.CreateNoWindow = true;
            p.Start();
            p.WaitForExit();
            MessageBox.Show("7");
            System.Diagnostics.Process.Start(Application.ResourceAssembly.Location);
            Application.Current.Shutdown();
        }

        private void loadingButton_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}



