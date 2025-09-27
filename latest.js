// Supabase クライアントを読み込み
// supabaseClient.js には `export const supabase = createClient(...)` がある前提
(async () => {
  const list = document.getElementById('latestList');

  try {
    // updated_at の降順で最新10件を取得
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

    // リスト生成
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
