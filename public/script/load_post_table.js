"use strict";

(function() {

  window.addEventListener("load", init);

  /** When page is fully loaded */
  function init() {
    let current_page = window.location.href.split("/").pop().split(".")[0];
    console.log("current page: " + current_page);
    getNewsEventsTable(current_page)
  }

  /**
   * Load the news_events table by reading the /news/news_events_post folder and
   * getting their title(id="notice-title") and dates(id="notice-date").
   */
  function getNewsEventsTable(current_page) {
    let table = document.getElementById("table-of-contents");

    fetch("/posts_data/"+current_page+".json")
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
            window.location.href = "/pages/news/"+current_page+"_post/"+date+".html";
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

})();