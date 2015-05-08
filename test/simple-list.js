/* globals expect */
/* jshint expr: true */

(function () {
  'use strict';

  var fixture = document.getElementById('mocha');

  describe('A simple list component', function () {
    var list;

    function addItemToListAsUser(text) {
      var dom = list.dom;

      dom.inputField.value = text;
      dom.addButton.dispatchEvent('click');
    }

    function removeItemFromListAsUser(index) {
      list.dom.getItem(index).getElementsByName('delete-btn').dispatchEvent('click');
    }

    beforeEach(function () {
      list = new SimpleList(fixture);
    });

    afterEach(function () {
      list.destroy();
      list = null;
    });

    it('has an input field', function () {
      expect(list.dom.inputField).to.be.$visible;
    });

    it('has an add button', function () {
      expect(list.dom.addButton).to.be.$visible;
    });

    it('has an item container', function () {
      expect(list.dom.items).to.be.$visible;
    });

    it('has an item counter', function () {
      expect(list.dom.counter).to.be.$visible;
    });

    it('can have a user add an item', function () {
      var items = list.dom.items;

      expect(items.numChildren).to.equal(0);

      addItemToListAsUser('foo');

      expect(items.numChildren).to.equal(1);
    });

    it('can have a user delete an item', function() {
      var dom = list.dom,
          items = dom.items;

      expect(items.numChildren).to.equal(0);
      
      addItemToListAsUser('foo');

      expect(items.numChildren).to.equal(1);

      removeItemFromListAsUser(0);

      expect(items.numChildren).to.equal(0);
    });

    it('counter updates when an item is added or removed', function () {
      var counter = list.dom.counter;

      expect(counter.innerHTML).to.equal('0');

      addItemToListAsUser('foo');

      expect(counter.innerHTML).to.equal('1');

      addItemToListAsUser(0);

      expect(counter.innerHTML).to.equal('0');
    });
  });
}());