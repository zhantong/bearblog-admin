import List from "./List";
import Edit from "./Edit";

export default {
  id: "page",
  name: "页面",
  entries: [
    {
      slug: "list",
      name: "列表",
      main: List
    },
    {
      slug: "edit",
      name: "编辑",
      main: Edit
    }
  ]
};
