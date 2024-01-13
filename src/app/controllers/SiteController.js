class SiteController {
    // [GET] /news
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
// Tạo ra một đối tượng của NewsController và xuất ra ngoài
