class NewsController{
    // [GET] /news
    index(req, res){
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res){
        res.send('NEW DETAIL !!!')
    }
}

module.exports = new NewsController;
// Tạo ra một đối tượng của NewsController và xuất ra ngoài