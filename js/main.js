// Listen for form submit
document.querySelector("#myForm").addEventListener('submit', saveBookmark);

function saveBookmark(e){
    
    // get form values
    let siteName = document.getElementById("siteName").value;
    let siteUrl = document.getElementById("siteUrl").value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Local Storage
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        let bookmarks = [];
        
        // Add to array
        bookmarks.push(bookmark);

        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // add bookmark to array
        bookmarks.push(bookmark);

        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form after submission
    document.getElementById('myForm').reset()

    // Re-fetch bookmarks
    fetchBookmarks();

    // prevent form from submiting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through bookmarks
    for(let i = 0; i < bookmarks.length; i++)
    {
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks

function fetchBookmarks(){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    let bookmarksResults = document.querySelector("#bookmarksResults");

    // build output
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += `<div class="well"
                                            <h3>${name}
                                                <a class="btn btn-secondary" target="_blank" href="${url}">Visit</a>
                                                <a onclick="deleteBookmark(\'${url}')" class="btn btn-danger" href="#">Delete</a>
                                            </h3>
                                        </div>
        `;
    }
}


// validate form

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl)
    {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Please use a valid URL");
        return false;
    }

    return true;
}