/**
 * Shortened function of 'createElement.'
 * @param {selector} selector - element that you want to create.
 * @returns {HTMLElement} returns the element created.
 */
export function gen(selector) {
  return document.createElement(selector);
}

/**
 * Shortened function of 'getElementByID.'
 * @param {id} id - id of the element.
 * @returns {HTMLElement} returns the element found by its id.
 */
export function id(id) {
  return document.getElementById(id);
}

/**
 * Shortened function of 'querySelector'
 * @param {selector} selector - selector of the element
 * @returns {HTMLElement} returns the element found by its selector.
 */
export function qs(selector) {
  return document.querySelector(selector);
}

/**
 * Shortened function of 'querySelectorAll'
 * @param {selector} selector - selector of the element
 * @returns {HTMLElement} returns the element found by its selector.
 */
export function qsa(selector) {
  return document.querySelectorAll(selector);
}
