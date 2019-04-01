import ArticleEdit from "./article/Edit";
import ArticleList from "./article/List";
import List from "./List";
import Edit from "./Edit";

export default {
  id: "category",
  name: "分类",
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
          title: "分类",
          component: ArticleList
        }
      }
    }
  }
};
