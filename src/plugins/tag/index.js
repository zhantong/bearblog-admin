import ArticleEdit from "./article/Edit";

export default {
  id: "tag",
  name: "标签",
  entries: [],
  attach: {
    article: {
      edit: {
        component: ArticleEdit
      }
    }
  }
};
