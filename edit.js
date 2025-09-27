// edit.js
document.getElementById('create-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = e.target.title.value.trim();
  const content = e.target.content.value.trim();

  if (!title || !content) {
    alert('タイトルと内容を入力してください');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('articles')          // ← Supabase のテーブル名
      .insert([{ title, content }]);

    if (error) throw error;

    alert('記事を作成しました！');
    window.location.href = `view.html?title=${encodeURIComponent(title)}`;
  } catch (err) {
    console.error(err);
    alert('作成中にエラーが発生しました');
  }
});
