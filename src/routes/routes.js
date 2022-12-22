import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Map from "@/components/Map/Map.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        // component: Dashboard,
        component: Map,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
      // {
      //   path: "notifications",
      //   name: "Notifications",
      //   component: Notifications,
      // },
    ],
  },
];

export default routes;
