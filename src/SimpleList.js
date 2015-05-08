/* globals getChildIndex */
(function (global) {
  'use strict';

  function SimpleList(container) {
    var inputField, addButton, items, counter;

    function createElement(tagName) {
      return container.appendChild(document.createElement(tagName)); 
    }

    function refreshCounter() {
      counter.innerHTML = items.children.length;
    }

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

    function removeItem(index) {
      var item = items.children[index];

      items.removeChild(item);
      item.removeEventListener('click');
      refreshCounter();
    }

    function getItem(index) {
      return items.children[index];
    }

    function onAddButtonClick() {
      addItem(inputField.value);
      inputField.value = '';
    }

    function onItemDeleteButtonClick(event) {
      removeItem(getChildIndex(event.target.parentNode));
    }

    if (!container) {
      throw new Error('Missing `container` argument');
    } else if (!(container instanceof HTMLElement)) {
      throw new Error('`container` is not a valid DOM element');
    }

    inputField = createElement('input');
    addButton = createElement('button');
    items = createElement('ul');
    counter = createElement('div');

    addButton.addEventListener('click', onAddButtonClick);

    refreshCounter();

    this.dom = {
      inputField: inputField,
      addButton: addButton,
      items: items,
      counter: counter,
      getItem: getItem
    };
  }

  SimpleList.prototype.destroy = function () {};

  global.SimpleList = SimpleList;
}(window));