$(document).ready(() => {
  $('form').on('submit', function(evt) {
    evt.preventDefault();
    const isSelectedManager = $(this).find('input[name=select]:first').prop('checked');
    const isSelectedMember = $(this).find('input[name=select]:eq(1)').prop('checked');
    if (!(isSelectedManager ^ isSelectedMember)) {
      // どちらも選択していない or どちらも選択している場合
      console.log('something err deal');
      return false;
    }
    const position = isSelectedManager ? 'manager' : 'member';
    sessionStorage.setItem('position', position);
    //Q1へリダイレクト
    location.href = './q.html?p=1';
  });
});
