const quill = new Quill('#editor', {
  theme: 'snow',
  modules: { toolbar: '#toolbar' }
});

// プレビュー更新
quill.on('text-change', updatePreview);

function updatePreview() {
  const text = quill.getText();
  // 簡易的に {{Infobox ...}} を抜き出して右側に表示
  const match = text.match(/\{\{Infobox([\s\S]*?)\}\}/i);
  document.getElementById('infoboxContent').textContent =
    match ? match[0] : 'インフォボックスはまだありません';
}

// 保存処理
document.getElementById('saveBtn').addEventListener('click', async () => {
  const title = document.getElementById('titleInput').value.trim();
  const content = quill.root.innerHTML;

  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  const { error } = await supabase
    .from('articles')
    .insert([{ title, content }]);

  if (error) {
    console.error(error);
    alert('保存に失敗しました');
  } else {
    alert('保存しました');
    location.href = 'latest.html';
  }
});
