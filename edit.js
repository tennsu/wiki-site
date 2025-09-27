import { supabase } from './supabaseClient.js';

const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');
const form = document.getElementById('editForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('imageUrl');
const message = document.getElementById('message');

// 既存記事読み込み
if (articleId) {
  (async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single();
    if (error) {
      message.textContent = '記事の読み込みに失敗しました: ' + error.message;
    } else if (data) {
      titleInput.value = data.title;
      contentInput.value = data.content;
      imageInput.value = data.image_url || '';
    }
  })();
}

// 保存
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const imageUrl = imageInput.value.trim();

  let result;
  if (articleId) {
    // 更新
    result = await supabase.from('articles')
      .update({ title, content, image_url: imageUrl })
      .eq('id', articleId);
  } else {
    // 新規作成
    result = await supabase.from('articles')
      .insert([{ title, content, image_url: imageUrl }]);
  }

  if (result.error) {
    message.textContent = '保存エラー: ' + result.error.message;
  } else {
    message.textContent = '保存しました！';
    // 保存後に記事ページへリダイレクト
    if (!articleId) {
      const newId = result.data[0].id;
      window.location.href = `view.html?id=${newId}`;
    }
  }
});
