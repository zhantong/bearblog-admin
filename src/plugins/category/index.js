import ArticleEdit from "./article/Edit";
import ArticleList from "./article/List";

export default {
  id: "category",
  name: "分类",
  entries: [],
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
