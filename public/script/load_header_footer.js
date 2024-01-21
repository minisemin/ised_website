"use strict";

(function() {

  window.addEventListener("load", init);

  /**
   * Init function for the index page
   */
  function init() {
    // Get the header.html and footer.html
    console.log("init");
    getHeader();
    getFooter();
  }

  /**
   * Get the header.html and append it to the header element
   */
  function getHeader() {
    let header = document.getElementById("header-container");
    fetch("/components/header.html")
      .then((response) => response.text())
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        Array.from(doc.body.childNodes).forEach(node => {
          header.appendChild(node);
        });
      })
      .then(() => {
        /* Activate mobile navigation button */
        let mobileNav = document.getElementById("mobile-nav");
        let mobileNavButton = document.getElementById("mobile-navbton");
        mobileNavButton.addEventListener("click", () => {
          mobileNav.classList.toggle("flex");
          mobileNavButton.classList.toggle("hidden");
        });
      });
  }

  /**
   * Get the footer.html and append it to the footer element
   */
  function getFooter() {
    let footer = document.getElementById("footer-container");
    fetch("/components/footer.html")
      .then((response) => response.text())
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        Array.from(doc.body.childNodes).forEach(node => {
          footer.appendChild(node);
        });
      });
  }
})();