import $ from 'jquery';

$(document).ready(function() {
  $('form').on('submit', function(evt) {
    evt.preventDefault();
    const isSelectedManager = $(this).find('input[name=select]:first').prop('checked');
    const isSelectedMember = $(this).find('input[name=select]:eq(1)').prop('checked');
    console.log(isSelectedManager, isSelectedMember);
    if (!isSelectedManager && !isSelectedMember) {
      console.log('something err deal');
      return false;
    }
    const position = isSelectedManager ? 'manager' : 'member';
    sessionStorage.setItem('position', position);
    location.href = './q.html?p=1';
  });
});
