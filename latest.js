// supabaseClient.js には supabase オブジェクトが定義されている前提
(async () => {
  const list = document.getElementById('latestList');

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    if (!data || data.length === 0) {
      list.textContent = '記事がまだありません。';
      return;
    }

    list.innerHTML = '';
    data.forEach(row => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `view.html?id=${encodeURIComponent(row.id)}`;
      link.textContent = row.title;
      const date = document.createElement('span');
      date.className = 'latest-date';
      date.textContent = ` (${new Date(row.updated_at).toLocaleString()})`;
      li.appendChild(link);
      li.appendChild(date);
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    list.textContent = '記事を読み込めませんでした。';
  }
})();
