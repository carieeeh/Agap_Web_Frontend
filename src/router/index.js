import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "vuefire";
import LoginView from "@/views/Layout/Public/LoginView.vue";
import JsonToExcel from "@/views/Layout/Public/JsonToExcel.vue";

import DashboardView from "@/views/Layout/Private/Dashboard/DashboardView.vue";
import LineChart from "@/views/Layout/Private/Dashboard/LineChart.vue";
import DetailedTable from "@/views/Layout/Private/Dashboard/DetailedTable.vue";

import InteractiveMap from "@/views/Layout/Private/InteractiveMap/InteractiveMap.vue";
import HeatMap from "@/views/Layout/Private/HeatMap/HeatMapView.vue";
import AccountsView from "@/views/Layout/Private/ManageAccounts/AccountsView.vue";
import StationsView from "@/views/Layout/Private/ManageStations/StationsView.vue";
import PrivateView from "@/views/Layout/Private/PrivateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AGAP | Login",
      component: LoginView,
      meta: {
        middleware: "guest",
      },
    },
    {
      path: "/export",
      name: "AGAP | Export",
      component: JsonToExcel,
      meta: {
        middleware: "guest",
      },
    },
    {
      path: "/app",
      name: "AGAP",
      component: PrivateView,
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "/app/dashboard",
          name: "AGAP | Dashboard",
          component: DashboardView,
          children: [
            {
              path: "/app/dashboard",
              name: "AGAP | Dashboard >> Line Chart",
              component: LineChart,
            },
            {
              path: "/app/dashboard/detailed-table",
              name: "AGAP | Dashboard >> Detailed Table",
              component: DetailedTable,
            },
          ],
        },
        {
          path: "/app/accounts",
          name: "AGAP | Accounts",
          component: AccountsView,
        },
        {
          path: "/app/stations",
          name: "AGAP | Stations",
          component: StationsView,
        },
        {
          path: "/app/interactive-map",
          name: "AGAP | Interactive Map",
          component: InteractiveMap,
        },
        {
          path: "/app/heatmap",
          name: "AGAP | Heatmap",
          component: HeatMap,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  if (to.meta.middleware == "guest") {
    if (user) {
      next({ path: "/app/dashboard" });
    }
    next();
  } else if (to.meta.middleware == "auth") {
    if (!user) {
      next({ path: "/" });
    }
    next();
  }
});

export default router;
