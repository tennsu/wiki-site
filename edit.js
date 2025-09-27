import { supabase } from './supabaseClient.js';

const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');

const form = document.getElementById('editForm');
const titleInput = document.getElementById('title');
const infoInput = document.getElementById('infobox');
const imageInput = document.getElementById('imageUrl');
const message = document.getElementById('message');
const infoboxPreview = document.getElementById('infoboxPreview');

// Quill 初期化
const quill = new Quill('#quillEditor', {
  theme: 'snow',
  placeholder: '本文を入力してください…',
  modules: { toolbar: [['bold', 'italic'], ['link', 'image'], [{ list: 'ordered' }, { list: 'bullet' }]] }
});

// インフォボックス プレビュー更新
infoInput.addEventListener('input', () => {
  infoboxPreview.textContent = infoInput.value;
});

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
      infoInput.value = data.infobox || '';
      quill.root.innerHTML = data.content;
      imageInput.value = data.image_url || '';
      infoboxPreview.textContent = data.infobox || '';
    }
  })();
}

// 保存
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = quill.root.innerHTML; // HTMLとして保存
  const infobox = infoInput.value.trim();
  const imageUrl = imageInput.value.trim();

  let result;
  if (articleId) {
    result = await supabase.from('articles')
      .update({ title, content, infobox, image_url: imageUrl })
      .eq('id', articleId);
  } else {
    result = await supabase.from('articles')
      .insert([{ title, content, infobox, image_url: imageUrl }]);
  }

  if (result.error) {
    message.textContent = '保存エラー: ' + result.error.message;
  } else {
    message.textContent = '保存しました！';
    if (!articleId) {
      const newId = result.data[0].id;
      window.location.href = `view.html?id=${newId}`;
    }
  }
});
