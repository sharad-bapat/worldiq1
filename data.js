getLatestData()
function getLatestData() {
    if (!getLocalStorage("LastestNews")) {
        fetch("https://worldiq-default-rtdb.asia-southeast1.firebasedatabase.app/news.json?")
            .then(response => response.json())
            .then(data => { setLocalStorage("LastestNews", data, 30 * 60000); })
            .then(() => console.log("LastestNews Saved"))
            .catch(err => console.log(err));
    }
}

getMostReadNews()
function getMostReadNews() {
    if (!getLocalStorage("MostReadNews")) {
        fetch("https://worldiq-top-feed.t1m3.workers.dev/?format=json")
            .then(response => response.json())
            .then(data => setLocalStorage("MostReadNews", data, 30 * 60000))
            .then(() => console.log("MostReadData Saved"))
            .catch(err => console.log(err));
    }
}

getMostReadWikiArticles()
function getMostReadWikiArticles() {
    if (!getLocalStorage("MostReadWikiArticles")) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setLocalStorage("MostReadWikiArticles", data.mostread.articles, 30 * 60000))
            .then(() => console.log("MostReadWikiArticles Saved"))
            .catch(err => console.log(err));
    }
}

