import ArticleEdit from "./article/Edit";
import ArticleList from "./article/List";

export default {
  id: "tag",
  name: "标签",
  entries: [],
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
