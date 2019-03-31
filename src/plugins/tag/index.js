import ArticleEdit from "./article/Edit";
import ArticleList from "./article/List";
import List from "./List";
import Edit from "./Edit";

export default {
  id: "tag",
  name: "标签",
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
  ],
  attach: {
    article: {
      edit: {
        component: ArticleEdit
      },
      list: {
        column: {
          title: "标签",
          component: ArticleList
        }
      }
    }
  }
};
