import ArticleEdit from "./article/Edit";

export default {
  id: "category",
  name: "分类",
  entries: [],
  attach: {
    article: {
      edit: {
        component: ArticleEdit
      }
    }
  }
};
