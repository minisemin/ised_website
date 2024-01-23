"use strict";

(function() {

  window.addEventListener("load", init);

  /** When page is fully loaded */
  function init() {

    let current_page = window.location.href.split("/")[5]; // 5 for local, 4 for server
    console.log("current page: " + current_page);

    setBackBtns(current_page);

    // Get the list of posts and set the previous/next post
    getPostsList().then(posts => {
      console.log("get posts from init()" + posts); // obj obj obj
      let index = findCurrentIndex(posts);
      setPrevNext(posts, index, current_page);
    });
  }

  /**
   * Set the back arrow buttons to go back to the news_events page
   */
  function setBackBtns(current_page) {
    // remove '_post' from the current page to get the news_events page
    current_page = current_page.replace("_post","");

    // Add event listeners for the back arrow buttons
    document.getElementById("top-back-btn").addEventListener("click", () => {
    window.location.href="/pages/news/"+current_page+".html";
    });
    document.getElementById("bottom-back-btn").addEventListener("click", () => {
    window.location.href="/pages/news/"+current_page+".html";
    });

    // Show bottom-back-btn if window width is less than 800px
    window.innerWidth < 800 ?
    document.getElementById("bottom-back-btn").classList.remove("hidden") :
    document.getElementById("bottom-back-btn").classList.add("hidden");

    window.addEventListener("resize", () => {
    if (window.innerWidth < 800) {
      document.getElementById("bottom-back-btn").classList.remove("hidden");
    } else {
      document.getElementById("bottom-back-btn").classList.add("hidden");
    }
    });
  }

  /**
 * Get the Posts list from the JSON file
 */
  function getPostsList() {
    return fetch("/posts_data/news_events.json")
      .then((response) => response.json())
      .catch((error) => {
        alert("Error: " + error);
      });
  }

  function setPrevNext(posts, index, current_page) {
    let prev_span = document.getElementById("prev");
    let next_span = document.getElementById("next");

    let prev_post = index > 0 ? posts[index - 1] : undefined;
    let next_post = index < posts.length - 1 ? posts[index + 1] : undefined;

    if (prev_post === undefined) {
      prev_span.classList.add("hidden");
    } else {
      prev_span.classList.remove("hidden");
      document.getElementById("prev-title").textContent = prev_post.title;
      prev_span.addEventListener("click", () => {
        window.location.href = "/pages/news/"+current_page+"/"+prev_post.date+".html";
      });
    }
    if (next_post === undefined) {
      next_span.classList.add("hidden");
    } else {
      next_span.classList.remove("hidden");
      document.getElementById("next-title").textContent = next_post.title;
      next_span.addEventListener("click", () => {
        window.location.href = "/pages/news/"+current_page+"/"+next_post.date+".html";
      });
    }
  }

  function findCurrentIndex(posts) {
    let current_post = window.location.href.split("/").pop().split(".")[0];
    console.log("current post: " + current_post);
    // scan through posts and find the matching post
    let index = 0;
    for (let post of posts) {
      if (post.date === current_post) {
        console.log("index: " + index);
        return index;
      }
      index++;
    }
    console.log("index: " + index);
    return index;
  }

})();