// view.js + search.js の簡易統合例
import { supabase } from './supabaseClient.js';

// 記事表示
async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;
  const { data } = await supabase.from('articles').select('*').eq('id', id).single();
  if (data) {
    document.getElementById('title').textContent = data.title;
    document.getElementById('content').innerHTML = data.content;
  }
}
if (document.getElementById('title')) loadArticle();

// 検索
async function doSearch() {
  const q = document.getElementById('searchInput').value;
  const { data } = await supabase.from('articles').select('id,title').ilike('title', `%${q}%`);
  const ul = document.getElementById('results');
  if (!ul) return;
  ul.innerHTML = '';
  data.forEach(row => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="view.html?id=${row.id}">${row.title}</a>`;
    ul.appendChild(li);
  });
}
if (document.getElementById('searchInput')) {
  document.getElementById('searchInput').addEventListener('input', doSearch);
}
