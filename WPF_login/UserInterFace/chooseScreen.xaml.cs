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
//Theme Code ==================>>
using MaterialDesignThemes.Wpf;
using MySqlConnector;
//=============================>>

namespace WPF_login.UserInterFace
{
    /// <summary>
    /// Interaction logic for chooseScreen.xaml
    /// </summary>
    public partial class chooseScreen : Window
    {
        public chooseScreen()
        {
            InitializeComponent();
        }
        //Theme Code ========================>
        public bool IsDarkTheme { get; set; }
        private readonly PaletteHelper paletteHelper = new PaletteHelper();
        //===================================>
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
            DragMove();
        }

        private void buttonGetOrders_Click(object sender, RoutedEventArgs e)
        {
            mainPage mainPage = new mainPage();
            mainPage.Show();
            minimizeApp(sender,e);
        }

        private void buttonAddMedicine_Click(object sender, RoutedEventArgs e)
        {
            urunlerScreen urunlerScreen = new urunlerScreen();
            urunlerScreen.Show();
            minimizeApp(sender, e);
        }
    }
}
