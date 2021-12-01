using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS.Models
{
    public class TabNavigationModel
    {
        public string TabType { get; set; }
        public TabNavigation[] Data { get; set; }
        public int ResponseCode { get; set; }
        public string ResponseMsg { get; set; }
    }

    public class TabNavigation
    {
        public string TabId { get; set; }
        public string TabName { get; set; }
        public string TabUrl { get; set; }
        public string IsReadOnly { get; set; }
        public string TabChildId { get; set; }
        public TabNavigation[] TabChild { get; set; }
    }

    public class MenuNavigationModel
    {
        public int responseCode { get; set; }
        public string responseMsg { get; set; }
        public List<MenuModel> data { get; set; }
    }

    public class MenuModel
    {
        public string menuId { get; set; }
        public string menuName { get; set; }
        public string menuModuleId { get; set; }
        public string menuParentId { get; set; }
        public int menuType { get; set; }
        public int menuOrder { get; set; }
        public string menuIcon { get; set; }
        public string menuPath { get; set; }
        public List<MenuModel> menuChilds { get; set; }
        public Dictionary<string, string> meta { get; set; }
    }
}
