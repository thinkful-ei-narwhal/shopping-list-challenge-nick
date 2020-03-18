'use strict';

$(function () {
  // On page load, I clone the first child in the list and cache the value
  let shoppingListItem = $('ul.shopping-list').children().first().clone();

  // I set up a submit listener
  $('#js-shopping-list-form').submit(function (event) {
    // I prevent it's default behavior of attempting to submit to a server
    event.preventDefault();
    // I extract the value of the input data and cache it
    let inputVal = $('#shopping-list-entry').val();

    // I check to make sure the input value is not blank
    if (inputVal !== '') {
      // I take the shopping list item I cloned, and overwrite it's span text with user input value
      shoppingListItem.find('span.shopping-item').text(inputVal);

      // Then I prepend the cloned and mutated shopping list item to my full shopping list
      $('ul.shopping-list').prepend(shoppingListItem);

      // Then I clone a new shopping list item to get ready for a new submission
      shoppingListItem = $('ul.shopping-list').children().first().clone();

      // Finally, I clear the input field to get it ready for the next item
      $('#shopping-list-entry').val('');
    } else {
      // if there is no input value, the user is alert and no items are added to the list
      alert('Please enter a value');
    }
  });
});

// I set up a click listener for the delete button
// I use event delegates because new elements can be added to the list and they won't be bound
$('ul').on('click', '.shopping-item-delete', function () {
  // On click I find the closest li to my delete button (it's parent) and remove it
  $(this).closest('li').remove();
});

// I set up a click listener for the delete button
// I use event delegates because new elements can be added to the list and they won't be bound
$('ul').on('click', '.shopping-item-toggle', function () {
  // On click I find the span of text with the item and toggle the strikethrough line
  //Note: unsure why I need to do a jquery on the this to use it, but I have to
  //Note: can't use closest here, because it only finds parents, and this is a sibling
  $(this).parent().prev().toggleClass('shopping-item__checked');
});