let currentIndex = 0
let items = [];
const preloader = document.querySelector('.preloader');
// Show the preloader before the fetch call
preloader.style.display = 'block';

var container = document.getElementById("main");
container.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});
container.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;

    // calculate swipe direction
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    // check which direction has greater distance and use that as the swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            console.log('swipe right');
            if (currentIndex > 0) {
                currentIndex--;
                showItem(currentIndex);
            }
            else {
                showItem(items.length - 1)
            }

        } else {
            console.log('swipe left');
            if (currentIndex < items.length - 1) {
                currentIndex++;
                showItem(currentIndex);
            } else {
                showItem(0);
            }
        }
    }

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0) {
            console.log('swipe up');

        } else {
            console.log('swipe down');
            openModal(items[currentIndex]);
        }
    }

});

function showItem(index) {
    try {
        var container1 = document.getElementById("newsItem");
        const item = items[index];
        console.log(item)
        let htmlcontent = "";
        let imgSrc = item.originalimage ? item.originalimage.source : ".";
        htmlcontent += `
        <div class="card bg-dark bg-img">
            <div class="d-flex align-items-center">
                <div class="container">
                    <div class="row g-0">
                        <p class="text-white mb-4">worldiq.app</p>
                        <div class="col-12"><img src="${imgSrc}" class="img-fluid rounded-start" alt="..." style="width:90vw;height:35vh; object-fit:cover" onerror="removeImage(this)"> </div>
                        <h2 class="text-white lead">${item.titles.normalized}</h2> 
                        <p class="text-white mb-0 mt-2">${item.description ? item.description : ""}</p> 
                        <p class="text-white mb-0 mt-2">${item.extract.slice(0,100)}[...]</p>
                        <p class="text-white mb-0 mt-4"><a href="${item.content_urls.mobile.page}" target="_blank" class="text-warning">Read Details ></a></p>  
                        <p class="text-white mb-0 mt-4">
                        <span style="padding: 5px;" onclick="toggleClass(this)">
                            <i class="bi bi-hand-thumbs-up me-3 fz-24"></i>
                        </span>
                        <span style="padding: 5px;" onclick="toggleClass(this)">
                            <i class="bi bi-hand-thumbs-down me-3 fz-24"></i>
                        </span>              
                      </p>
                    </div>
                </div>
            </div>
        </div>
        `;
        container1.innerHTML = htmlcontent;

    } catch (err) {
        console.log(err.stack);
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
            .then(data => {items= data; showItem(0);  setLocalStorage("MostReadWikiArticles", data.mostread.articles, 30 * 60000)})
            .then(() => console.log("MostReadWikiArticles Saved"))
            .catch(err => console.log(err));
    }
    else{
        items = getLocalStorage("MostReadWikiArticles")
        showItem(0)
    }
}


function leftArrowClick() {
    if (currentIndex > 0) {
        currentIndex--;
        showItem(currentIndex);
    } else {
        showItem(items.length - 1)
    }
}
function rightArrowClick() {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        showItem(currentIndex);
    } else {
        showItem(0);
    }
}

function removeImage(imgElement) {
    imgElement.remove();
}

function toggleMenuContainer() {
    var menuContainer = document.querySelector('.menu-container');
    menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
}