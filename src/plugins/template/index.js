import ArticleEdit from "./article/Edit";

export default {
  id: "template",
  name: "模板",
  entries: [],
  attach: {
    article: {
      edit: {
        component: ArticleEdit
      }
    }
  }
};
