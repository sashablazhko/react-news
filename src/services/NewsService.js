import Api from "./Api";

export default {
  getAllNews() {
    return Api().get("/feeds");
  },
  createNews(title, content) {
    const item = { title, content };
    return Api().post("/feeds", { item });
  },
  getNewsItem(newsId) {
    return Api().get(`/feeds/${newsId}`);
  },
  updateNewsItem(newsId, title, content) {
    const id = newsId;
    const feed = { title, content };
    return Api().put(`/feeds/${newsId}`, { id, feed });
  },
  deleteNewsItem(newsId) {
    return Api().delete(`/feeds/${newsId}`, { id: newsId });
  },
};
