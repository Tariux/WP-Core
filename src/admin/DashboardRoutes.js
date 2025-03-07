// Page Components
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import ListPages from "./pages/page/ListPages";
import CreatePage from "./pages/page/CreatePage";
import UpdatePage from "./pages/page/UpdatePage";
import ReadPage from "./pages/page/ReadPage";
import DeletePage from "./pages/page/DeletePage";
import DebugPage from "./pages/DebugPage";

const DashboardRoutes = (util) => {
  
  return [
    {
      title: util.lang["dashboard"],
      slug: "dashboard",
      icon: "home",
      component: Landing,
      // description: util.lang['dashboard_page_desc']
    },
    {
      title: util.lang["settings"] || "Settings",
      slug: "settings",
      icon: "settings",
      component: Settings,
    },
    {
      title: util.lang["pages"] || "Pages",
      icon: "map",
      submenu: [
        {
          title: util.lang["create_page"] || "Create Page",
          slug: "create_page",
          component: CreatePage,
        },
        {
          title: util.lang["pages"] || "Pages",
          slug: "list_pages",
          component: ListPages,
        },
        {
          title: util.lang["read_page"] || "Read Page",
          slug: "read_page",
          component: ReadPage,
        },
        {
          title: util.lang["update_page"] || "Update Page",
          slug: "update_page",
          component: UpdatePage,
        },
        {
          title: util.lang["delete_page"] || "Delete Page",
          slug: "delete_page",
          component: DeletePage,
        },
      ]
    },
    {
      title: util.lang["debug_page"] || "Debug",
      slug: "debug_page",
      icon: "map",
      component: DebugPage,
    },
  ];
}

export default DashboardRoutes;
