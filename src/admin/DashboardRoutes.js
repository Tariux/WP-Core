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
      slug: "dashboard" || "Dashboard",
      icon: "map",
      component: Landing,
      // description: util.lang['dashboard_page_desc']
    },
    {
      title: util.lang["settings"] || "Settings",
      slug: "settings",
      icon: "map",
      component: Settings,
    },
    {
      title: util.lang["pages"] || "Pages",
      slug: "pages",
      icon: "map",
      component: ListPages,
    },
    {
      title: util.lang["create_page"] || "Create Page",
      slug: "create_page",
      icon: "map",
      component: CreatePage,
    },
    {
      title: util.lang["read_page"] || "Read Page",
      slug: "read_page",
      icon: "map",
      component: ReadPage,
    },
    {
      title: util.lang["update_page"] || "Update Page",
      slug: "update_page",
      icon: "map",
      component: UpdatePage,
    },
    {
      title: util.lang["delete_page"] || "Delete Page",
      slug: "delete_page",
      icon: "map",
      component: DeletePage,
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
