// Quill初期化
const quill = new Quill('#quillEditor', {
  theme: 'snow',
  placeholder: '本文を入力してください…\n\n例:\n{{infobox\nname:サンプル\nphoto:sample.jpg\n}}\n',
  modules: {
    toolbar: '#wikiToolbar'
  }
});

const preview = document.getElementById('infoboxPreview');

// 本文から {{infobox ...}} ブロックを探してプレビュー
function updateInfobox() {
  const text = quill.getText();
  const match = text.match(/\{\{infobox([\s\S]*?)\}\}/i);
  if (!match) {
    preview.textContent = '本文内 {{infobox ...}} を解析して表示';
    return;
  }

  // 行ごとに key:value を抽出
  const lines = match[1].split('\n');
  let html = '<div class="infobox">';
  lines.forEach(l => {
    const [key, ...rest] = l.split(':');
    if (key && rest.length) {
      html += `<div class="info-row"><strong>${key.trim()}</strong>: ${rest.join(':').trim()}</div>`;
    }
  });
  html += '</div>';
  preview.innerHTML = html;
}

// 入力のたびに更新
quill.on('text-change', updateInfobox);

// 保存処理（バックエンド連携はここに追加）
document.getElementById('editForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const bodyHtml = quill.root.innerHTML;
  console.log({ title, bodyHtml });
  alert('記事を保存しました（コンソールに出力）');
});
