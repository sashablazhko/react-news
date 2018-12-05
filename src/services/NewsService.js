import Api from "./Api";

export default {
  getAllNews() {
    return Api().get("/feeds");
  },
  createNews(title, content, token = null) {
    return Api(token).post("/feeds", { title, content });
  },
  getNewsItem(newsId) {
    return Api().get(`/feeds/${newsId}`);
  },
  updateNewsItem(title, content, id, token = null) {
    return Api(token).put(`/feeds/${id}`, { title, content });
  },
  deleteNewsItem(id, token = null) {
    return Api(token).delete(`/feeds/${id}`);
  },
};
