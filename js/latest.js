import { supabase } from './supabaseClient.js';

const list = document.getElementById('latest-list');

const { data, error } = await supabase
  .from('articles')
  .select('id,title,created_at')
  .order('created_at', { ascending: false })
  .limit(10);

if (error) {
  console.error(error);
  list.innerHTML = '<li>読み込みに失敗しました</li>';
} else {
  data.forEach(a => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `view.html?id=${a.id}`;
    link.textContent = `${a.title} (${new Date(a.created_at).toLocaleDateString()})`;
    li.appendChild(link);
    list.appendChild(li);
  });
}
