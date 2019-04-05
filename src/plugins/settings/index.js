import List from "./List";

export default {
  id: "settings",
  name: "设置",
  entries: [
    {
      slug: "settings",
      name: "通用",
      main: {
        component: List,
        params: {
          settingsCategory: "settings"
        }
      }
    }
  ]
};
