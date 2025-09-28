import { supabase } from './supabaseClient.js';

const params = new URLSearchParams(location.search);
const articleId = params.get('id');

if (articleId) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', articleId)
    .single();

  if (error || !data) {
    document.getElementById('article-title').textContent = '記事が見つかりません';
  } else {
    document.getElementById('article-title').textContent = data.title;
    document.getElementById('article-content').innerHTML = data.content;
  }
}
