import { Accounts } from "./Accounts";
import { Inventory } from "./Inventory";
import { Settings } from "./Settings";
import { ShippingZone } from "./ShippingZone";
import { WebsiteControls } from "./WebsiteControls";

const SettingsConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/inventory",
      element: <Inventory />,
    },
    {
      path: "/accounts",
      element: <Accounts />,
    },
    {
      path: "/shipping-zone",
      element: <ShippingZone />,
    },
    {
      path: "/website-controls",
      element: <WebsiteControls />,
    },
  ],
};

export default SettingsConfig;
