using System;
using System.Collections.Generic;
using System.Globalization;
using System.Windows.Controls;
using System.Windows.Input;
using WPF_login.Model;
using System.Windows.Media;
using static System.Net.Mime.MediaTypeNames;
using RestSharp;
using Newtonsoft.Json;

namespace WPF_login
{
    /// <summary>
    /// Interaction logic for cardTemplate.xaml
    /// </summary>
    public partial class orderedCardTemplate : UserControl
    {
        List<string> stringList = new List<string>()
        {
            "#F3A08E",
            "#87D77B",
            "#A7E0EC",
            "#FCD0F8",
            "#91AB93",
            "#EBF39B",
            "#9BA6F3",
            "#888FBD",
            "#766697",
        };

        public orderedCardTemplate(Medicine medicine, Random random, string ilacismi)
        {
            InitializeComponent();
            BrushConverter brushConverter = new BrushConverter();
            int index = random.Next(stringList.Count);
            string randomColor = stringList[index];
            string randomString = randomColor;
            Brush brush = (Brush)brushConverter.ConvertFromString(randomString);
            card2.Background = brush;
            urunAdiveKoduLabel.Content = String.Format("İlaç İsmi: {0}, İlaç Barkodu: {1}", ilacismi, medicine.id);
            adetLabel.Text = String.Format("Adet: {0}", medicine.count);
            toplamFiyatLabel.Text = String.Format("Toplam: {0} TL", (float)(medicine.count * double.Parse(medicine.price, CultureInfo.InvariantCulture)));
        }
        //  WPF_login.mainPage oldPage;   
        private void nameOnTheCard_MouseDown(object sender, MouseButtonEventArgs e)
        {
            
        }

    }
}
