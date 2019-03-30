import List from "./List";
import Edit from "./Edit";

export default {
  id: "article",
  name: "文章",
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
