import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "Orders-component",
    title: "Orders",
    translate: "Orders",
    type: "collapse",
    url: "/orders",
    icon: "heroicons-solid:search",
    children: [
      {
        id: "export-component",
        title: "Export Orders",
        type: "item",
        url: "/export-orders",
        icon: "material-solid:import_export",
      },
    ],
  },
  {
    id: "Customers-component",
    title: "Customers",
    translate: "Customers",
    type: "item",
    url: "/customers",
    icon: "heroicons-solid:users",
  },
  {
    id: "Reports-component",
    title: "Reports",
    translate: "Reports",
    type: "item",
    url: "/",
    icon: "heroicons-solid:document-text",
  },
  // {
  //   id: "Shipment-component",
  //   title: "Shipment Tracking",
  //   type: "item",
  //   url: "/shipment",
  //   icon: "heroicons-solid:shield-check",
  // },
  {
    id: "products",
    title: "Products",
    translate: "Products",
    type: "collapse",
    // url: '/products',
    icon: "heroicons-solid:document-text",
    children: [
      {
        id: "products.all",
        title: "All Products",
        type: "item",
        icon: "heroicons-outline:clipboard-list",
        url: "/products",
      },

      {
        id: "products.add",
        title: "Add Products",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/add-product",
        // children: [
        //   {
        //     id: 'products.simple',
        //     title: 'Simple Product',
        //     type: 'item',
        //     icon: 'heroicons-solid:tag',
        //     url: '/add-product',
        //   },
        //   {
        //     id: 'products.variation',
        //     title: 'Variation Product',
        //     type: 'item',
        //     icon: 'heroicons-solid:scale',
        //     url: '/add-variation-product',
        //   },
        //   {
        //     id: 'products.add.variation',
        //     title: 'Add Attributes',
        //     type: 'item',
        //     icon: 'heroicons-solid:scale',
        //     url: '/add-product-variation',
        //   },
        // ],
      },
      {
        id: "products.deleted",
        title: "Deleted Products",
        type: "item",
        icon: "heroicons-outline:clipboard-list",
        url: "/deleted-products",
      },
    ],
  },
  // {
  //   id: 'Analytics-component',
  //   title: 'Analytics',
  //   translate: 'Analytics',
  //   type: 'item',
  //   url: '/analytics',
  //   icon: 'heroicons-solid:document-text',
  // },
  {
    id: "Settings-component",
    title: "Settings",
    translate: "Settings",
    type: "collapse",
    url: "/",
    icon: "feather:settings",
    children: [
      // {
      //   id: "Shipping-component",
      //   title: "Shipping Zone",
      //   type: "item",
      //   url: "/shipping-zone",
      // },
      // {
      //   id: "Accounts-component",
      //   title: "Accounts",
      //   translate: "Accounts",
      //   type: "item",
      //   url: "/accounts",
      // },
      // {
      //   id: "inventory",
      //   title: "Inventory",
      //   translate: "Inventory",
      //   type: "item",
      //   url: "/inventory",
      // },
      {
        id: "website-control",
        title: "Website Controls",
        // translate: 'Website-Controls',
        type: "item",
        url: "/website-controls",
      },
    ],
  },
  {
    id: "Categories-component",
    title: "Categories",
    translate: "Categories",
    type: "item",
    url: "/categories",
    icon: "heroicons-solid:document-text",
  },
  {
    id: "Brands-component",
    title: "Brands",
    translate: "Brands",
    type: "item",
    url: "/brands",
    icon: "heroicons-solid:document-text",
  },
];

export default navigationConfig;
