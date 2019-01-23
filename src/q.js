import $ from 'jquery';
import axios from 'axios';

const getParams = () => {
  const params = {};
  const param = location.search.substring(1).split('&');
  for(let i = 0; i < param.length; i++) {
    const keySearch = param[i].search(/=/);
    let key = '';
    if(keySearch !== -1) {
      key = param[i].slice(0, keySearch);
    }
    const val = param[i].slice(param[i].indexOf('=', 0) + 1);
    if(key !== '') {
      params[key] = decodeURI(val);
    }
  }
  return params;
};

$(document).ready(async () => {
  // JSONからデータを取得して質問表示
  const params = getParams();
  const questionNum = params['p'];
  const maxQuestionNum = 3;
  if (questionNum <= 0 || questionNum > maxQuestionNum) {
    console.error('存在しない大問ページ');
    return false;
  }
  const ret = await axios.get(`./assets/question${questionNum}.json`);
  if (ret.status !== 200) {
    console.error('問題の取得に失敗');
    return false;
  }

  const title = `${ret.data.title}`;
  $('.q_title:first').text(`[質問${questionNum}]`);
  $('.q_title:eq(1)').html(title);
  const questionJson = ret.data.question;
  const entry = Object.entries(questionJson);

  const $qUl = $('.q_ul');
  for(const index in entry) {
    const [key, val] = entry[index];
    if (!questionJson.hasOwnProperty(key)) continue;

    const radioElName = `q${Number(index) + 1}`;
    // TODO: 6番目の選択肢を追加
    const insertHtml = `
<li class="q_ul_li">
    <div class="q_cell">Q${Number(index) + 1}</div>
    <div class="q_cell tx_left">${val.text}</div>
    <ul class="q_cell_btn" data-class="${val.class}">
        <li><input type="radio" name="${radioElName}" value="5" id="${radioElName}-a1"><label for="${radioElName}-a1" class="label">あてはまる</label></li>
        <li><input type="radio" name="${radioElName}" value="4" id="${radioElName}-a2"><label for="${radioElName}-a2" class="label">どちらかと<br>いえば<br>あてはまる</label></li>
        <li><input type="radio" name="${radioElName}" value="3" id="${radioElName}-a3"><label for="${radioElName}-a3" class="label">どちらとも<br>いえない</label></li>
        <li><input type="radio" name="${radioElName}" value="2" id="${radioElName}-a4"><label for="${radioElName}-a4" class="label">どちらかと<br>いえば<br>あてはまら<br>ない</label></li>
        <li><input type="radio" name="${radioElName}" value="1" id="${radioElName}-a5"><label for="${radioElName}-a5" class="label">あてはまら<br>ない</label></li>
    </ul>
</li>`;
    $qUl.append(insertHtml);
  }

  //サブミット処理
  $('form').on('submit', function(evt) {
    // 同一のclassId(分類)は同じページにしか存在しないことを想定
    let score = {};
    console.log(score);
    evt.preventDefault();
    for (const val of $qUl.find('.q_ul_li ul')) {
      const $li = $(val).find('li');
      const classId = $(val).data('class');
      const len = $li.length;
      let isSelected = false;
      for(let i = 0; i < len; i++) {
        if ($($li[i]).find('input').prop('checked')) {
          if (!(classId in score)) {
            score[classId] = {score: 0, questionNum: 0}
          }
          score[classId].score += Number($($li[i]).find('input').val());
          score[classId].questionNum += 1;
          isSelected = true;
          break;
        }
      }
      if (!isSelected) {
        console.error('選択されていない設問がある');
        return false;
      }
    }
    sessionStorage.setItem(`questionAnswer${questionNum}`, JSON.stringify(score));
    let nextUrl = '';
    if (questionNum < maxQuestionNum) {
      nextUrl = `./q.html?p=${Number(questionNum) + 1}`;
    } else {
      nextUrl = './surveyresults.html';
    }
    location.href = nextUrl;
  });
});
