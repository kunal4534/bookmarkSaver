const bookmarkName = document.querySelector("#Bookmark-name");
const bookmarkLink = document.querySelector("#Bookmark-link");
const submitBtn = document.querySelector("#button");
const removeBtn  = document.querySelector(".buttonStyle");
const bookmarkList = document.querySelector("#bookmark-list");



submitBtn.addEventListener("click",checkInput);

function checkInput(e){
   e.preventDefault();
   const name = bookmarkName.value.trim();
   const link = bookmarkLink.value.trim();

   if(name == "" || link == ""){
    alert("please fill both fileds....");
   }else{
     if((!name.startsWith("http://")) && (!link.startsWith("https://"))){
        alert("please enter a valid URL with http:// or https://");
        bookmarkLink.value = "";
        bookmarkName.value = "";
        
     }else{
     
         addBookmarkToStorage(name,link);
         addBookmarkToUi();
         bookmarkLink.value = ""; //reset input values
         bookmarkName.value = "";
       }
   }
}
function getBookmark(){
    const bookmarks = localStorage.getItem("bookmarkKey");
    return bookmarks ? JSON.parse(bookmarks) : [];

}
function addBookmarkToStorage(name,link){
    const bookmarks = getBookmark();

    bookmarks.push({
        id:Date.now(),
        name,
        link
    });
    localStorage.setItem("bookmarkKey",JSON.stringify(bookmarks));
    console.log(bookmarks);
}

function addBookmarkToUi(){
    bookmarkList.innerHTML = "";
    const bookmarkArray = getBookmark();
    const sortedBookmark = bookmarkArray.reverse();
    
    sortedBookmark.forEach((bookmarkObj)=>{
        const li = createList(bookmarkObj);
        bookmarkList.appendChild(li);

    });

}
function createList(bookmarkObj){
    const li = document.createElement("li");
    li.classList.add("liStyle","flex");
    bookmarkList.classList.add("saved-bookmarks");
    li.innerHTML=`
            <a href="${bookmarkObj.link}" class="listLinks" target="_blank">${bookmarkObj.name}</a>
            <button class="buttonStyle" onClick="removeBookmarkList(${bookmarkObj.id})">Remove</button>
    `
    return li;

}
function removeBookmarkList(buttonId){
       let getBookmarkData = getBookmark();
       getBookmarkData = getBookmarkData.filter(bookMarkObj => bookMarkObj.id !== buttonId);
       localStorage.setItem("bookmarkKey",JSON.stringify(getBookmarkData));
       addBookmarkToUi();
       console.log(bookmarkList.children.length);


       if(bookmarkList.offsetHeight <= 10){
         bookmarkList.classList.remove("saved-bookmarks");
        }
       
       

}
addBookmarkToUi();








