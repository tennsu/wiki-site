// Quill 初期化
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  }
});

// プレビュー更新
function updatePreview() {
  const html = quill.root.innerHTML;
  document.getElementById('infoContent').innerHTML = html;

  // タイトルに画像URLが含まれていたら差し替える簡易例
  const img = quill.root.querySelector('img');
  document.getElementById('infoImage').src = img ? img.src : 'https://placehold.co/300x200?text=Preview';
}
quill.on('text-change', updatePreview);

// 保存処理（例：コンソール出力やAPI送信）
document.getElementById('saveBtn').addEventListener('click', () => {
  const title = document.getElementById('pageTitle').value.trim();
  const content = quill.root.innerHTML;

  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  // ここでバックエンドや Supabase などに送信する処理を実装
  console.log('---保存データ---');
  console.log('タイトル:', title);
  console.log('本文HTML:', content);

  alert('保存しました（デモ）');
});
