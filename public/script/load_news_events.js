"use strict";

(function() {

  window.addEventListener("load", init);

  /** When page is fully loaded */
  function init() {
    getNewsEventsTable()
  //  getNewsEventsContent();

    // Add event listeners
    document.getElementById("top-back-btn").addEventListener("click", () => {
      close_content();
      open_table();
    });
    document.getElementById("bottom-back-btn").addEventListener("click", () => {
      close_content();
      open_table();
    });
  }

  /**
   * Load the news_events table by reading the /news/news_events_post folder and
   * getting their title(id="notice-title") and dates(id="notice-date").
   */
  function getNewsEventsTable() {
    let table = document.getElementById("table-of-contents");

    fetch("/posts_data/news_events.json")
      .then((response) => response.json())
      .then((posts) => {
        posts.forEach((post, index) => {

          // fill each table row with the title and date of each post
          let date = post.date;
          let title = post.title;
          let row = document.createElement("tr");
          let cell = document.createElement("td"); // Renamed 'data' to 'cell'
          let data_title = document.createElement("h3");
          let data_date_container = document.createElement("div");
          let data_date = document.createElement("span");
          let pinned_icon = document.createElement("img");

          data_title.textContent = title;
          data_date.textContent = date;
          pinned_icon.src = "/img/pin.png";
          pinned_icon.alt = "pinned_icon";
          pinned_icon.classList.add("pin");

          // when a row is clicked, load the content of the post
          row.addEventListener("click", () => {
            load_content(date, posts, index);
            table.classList.add("hidden");
          });

          table.appendChild(row);
          row.appendChild(cell); // Changed 'data' to 'cell'
          cell.appendChild(data_title);
          cell.appendChild(data_date_container);
          data_date_container.appendChild(data_date);
          data_date_container.appendChild(pinned_icon);
        });
      });
  }


  function load_content(date, posts, index) {
    // Switch view mode
    let content_container = document.getElementById("opened-content-container");
    content_container.classList.remove("hidden");

    // Load content
    let content = document.getElementById("opened-content");
    fetch(`/pages/news/news_events_post/${date}.html`)
      .then((response) => response.text())
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        Array.from(doc.body.childNodes).forEach(node => {
          content.appendChild(node);
        });
      });

    // Set previous and next post
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
        close_content();
        load_content(prev_post.date, posts, index - 1);
      });
    }
    if (next_post === undefined) {
      next_span.classList.add("hidden");
    } else {
      next_span.classList.remove("hidden");
      document.getElementById("next-title").textContent = next_post.title;
      next_span.addEventListener("click", () => {
        close_content();
        load_content(next_post.date, posts, index + 1);
      });
    }
  }

  /**
   * Close the content and show the table of contents
   * when back button is clicked.
   */
  function close_content() {
    document.getElementById("opened-content-container").classList.add("hidden");
    let content = document.getElementById("opened-content");
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  }

  function open_table() {
    document.getElementById("table-of-contents").classList.remove("hidden");
  }

})();