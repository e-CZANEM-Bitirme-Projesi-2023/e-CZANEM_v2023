﻿#pragma checksum "..\..\..\UserInterFace\urunlerScreen.xaml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "D6CAF5512B3EE0611BDBB50E76BC925711F11BF134C3F8C1C79992B541AD9F08"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using MaterialDesignThemes.Wpf;
using MaterialDesignThemes.Wpf.Converters;
using MaterialDesignThemes.Wpf.Transitions;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;
using WPF_login;


namespace WPF_login.UserInterFace {
    
    
    /// <summary>
    /// urunlerScreen
    /// </summary>
    public partial class urunlerScreen : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 23 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal MaterialDesignThemes.Wpf.DialogHost DialogHost;
        
        #line default
        #line hidden
        
        
        #line 61 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Primitives.ToggleButton themeToggle;
        
        #line default
        #line hidden
        
        
        #line 69 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button Btn_Exit;
        
        #line default
        #line hidden
        
        
        #line 85 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image urlResim;
        
        #line default
        #line hidden
        
        
        #line 99 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.ComboBox urunIdComboBox;
        
        #line default
        #line hidden
        
        
        #line 108 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.ComboBox stokCombo;
        
        #line default
        #line hidden
        
        
        #line 116 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Button refreshPageButton;
        
        #line default
        #line hidden
        
        
        #line 146 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock ilacAdiText;
        
        #line default
        #line hidden
        
        
        #line 157 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock ureticiFirmaText;
        
        #line default
        #line hidden
        
        
        #line 165 "..\..\..\UserInterFace\urunlerScreen.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.TextBlock urunHakkindaText;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/e-CZANEM WPF;component/userinterface/urunlerscreen.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\UserInterFace\urunlerScreen.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.DialogHost = ((MaterialDesignThemes.Wpf.DialogHost)(target));
            return;
            case 2:
            this.themeToggle = ((System.Windows.Controls.Primitives.ToggleButton)(target));
            
            #line 63 "..\..\..\UserInterFace\urunlerScreen.xaml"
            this.themeToggle.Click += new System.Windows.RoutedEventHandler(this.toggleTheme);
            
            #line default
            #line hidden
            return;
            case 3:
            
            #line 68 "..\..\..\UserInterFace\urunlerScreen.xaml"
            ((System.Windows.Controls.Button)(target)).Click += new System.Windows.RoutedEventHandler(this.minimizeApp);
            
            #line default
            #line hidden
            return;
            case 4:
            this.Btn_Exit = ((System.Windows.Controls.Button)(target));
            
            #line 72 "..\..\..\UserInterFace\urunlerScreen.xaml"
            this.Btn_Exit.Click += new System.Windows.RoutedEventHandler(this.exitApp);
            
            #line default
            #line hidden
            return;
            case 5:
            this.urlResim = ((System.Windows.Controls.Image)(target));
            return;
            case 6:
            this.urunIdComboBox = ((System.Windows.Controls.ComboBox)(target));
            
            #line 104 "..\..\..\UserInterFace\urunlerScreen.xaml"
            this.urunIdComboBox.SelectionChanged += new System.Windows.Controls.SelectionChangedEventHandler(this.urunIdComboBox_SelectionChanged);
            
            #line default
            #line hidden
            return;
            case 7:
            this.stokCombo = ((System.Windows.Controls.ComboBox)(target));
            return;
            case 8:
            this.refreshPageButton = ((System.Windows.Controls.Button)(target));
            
            #line 126 "..\..\..\UserInterFace\urunlerScreen.xaml"
            this.refreshPageButton.Click += new System.Windows.RoutedEventHandler(this.refreshPageButton_Click);
            
            #line default
            #line hidden
            return;
            case 9:
            this.ilacAdiText = ((System.Windows.Controls.TextBlock)(target));
            return;
            case 10:
            this.ureticiFirmaText = ((System.Windows.Controls.TextBlock)(target));
            return;
            case 11:
            this.urunHakkindaText = ((System.Windows.Controls.TextBlock)(target));
            return;
            }
            this._contentLoaded = true;
        }
    }
}

