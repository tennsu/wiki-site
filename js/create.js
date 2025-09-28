import { supabase } from './supabaseClient.js';

const quill = new Quill('#editor', { theme: 'snow' });

document.getElementById('create-form').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = quill.root.innerHTML;

  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  // 記事を挿入
  const { data, error } = await supabase
    .from('articles')
    .insert([
      { title, content, created_at: new Date().toISOString() }
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    alert('保存時にエラーが発生しました');
    return;
  }

  // 作成した記事ページへ移動
  window.location.href = `view.html?id=${data.id}`;
});
