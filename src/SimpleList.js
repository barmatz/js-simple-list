/* globals getChildIndex */
(function (global) {
  'use strict';

  function SimpleList(container) {
    var inputField, addButton, items, counter;

    /**
     * Shorthand for creating a DOM element and appending it to the container.
     */
    function createElement(tagName) {
      return container.appendChild(document.createElement(tagName)); 
    }

    /**
     * Refresh the counter with the current number of items.
     */
    function refreshCounter() {
      counter.innerHTML = items.children.length + ' items in list';
    }

    /**
     * Adds an item to the DOM.
     */
    function addItem(text) {
      var item = items.appendChild(document.createElement('li')),
          label = item.appendChild(document.createElement('span')),
          btn = item.appendChild(document.createElement('button'));

      label.innerHTML = text;
      label.setAttribute('data-simple-list-name', 'label');

      btn.innerHTML = 'Delete';
      btn.setAttribute('data-simple-list-name', 'delete-btn');
      btn.addEventListener('click', onItemDeleteButtonClick);

      refreshCounter();

      return item;
    }

    /**
     * Removes an item by index from the DOM.
     */
    function removeItem(index) {
      var item = items.children[index];

      items.removeChild(item);
      item.removeEventListener('click');
      refreshCounter();
    }

    /**
     * Returns a reference to an item by index.
     */
    function getItem(index) {
      return items.children[index];
    }

    /**
     * Add button click handler.
     */
    function onAddButtonClick() {
      addItem(inputField.value);
      inputField.value = '';
    }

    /**
     * An item's delete button handler.
     */
    function onItemDeleteButtonClick(event) {
      removeItem(getChildIndex(event.target.parentNode));
    }

    // Check if the container argument provided to the constructor is a valid DOM element.

    if (!container) {
      throw new Error('Missing `container` argument');
    } else if (!(container instanceof HTMLElement)) {
      throw new Error('`container` is not a valid DOM element');
    }

    // Create child DOM elements
    
    inputField = createElement('input');
    inputField.placeholder = 'Add items to list';

    addButton = createElement('button');
    addButton.innerHTML = 'Add';
    addButton.addEventListener('click', onAddButtonClick);
    
    items = createElement('ul');

    counter = createElement('div');
    refreshCounter();

    // Expose DOM elements to the object scope.

    this.dom = {
      inputField: inputField,
      addButton: addButton,
      items: items,
      counter: counter,
      getItem: getItem
    };
  }

  // Expose the SimpleList class to the global scope.

  global.SimpleList = SimpleList;
}(window));