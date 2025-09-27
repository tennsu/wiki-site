// Quill初期化
const quill = new Quill('#quillEditor', {
  theme: 'snow',
  placeholder: '本文を入力してください…',
  modules: {
    toolbar: '#wikiToolbar'
  }
});

// インフォボックスのプレビュー
const infoboxField = document.getElementById('infobox');
const preview = document.getElementById('infoboxPreview');

function renderInfobox(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    let html = '<div class="infobox">';
    for (const key in data) {
      html += `<div class="info-row"><strong>${key}</strong>: ${data[key]}</div>`;
    }
    html += '</div>';
    preview.innerHTML = html;
  } catch {
    preview.textContent = '有効なJSONを入力してください';
  }
}

infoboxField.addEventListener('input', () => renderInfobox(infoboxField.value));

// 保存処理（Supabaseなどバックエンド連携はここに追加）
document.getElementById('editForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const bodyHtml = quill.root.innerHTML;
  const infoJson = infoboxField.value;

  // ここに保存処理を記述（例：Supabase insert/update）
  console.log({ title, bodyHtml, infoJson });
  alert('記事を保存しました（コンソールに出力）');
});

// ページ初期化時に既存データを読み込む場合
// （例：URLパラメータidを使ってDBからfetch → quill.setContents(...) など）
