// view_search_combined.js
const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
const SUPABASE_ANON_KEY = "public-anon-key";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;
  const { data, error } = await supabaseClient
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    document.getElementById("article").innerHTML = "<p>記事が見つかりません</p>";
    return;
  }
  const html = marked.parse(data.content);
  document.getElementById("article-title").textContent = data.title;
  document.getElementById("article").innerHTML = html;
  if (data.image_base64) {
    const img = document.createElement("img");
    img.src = `data:image/png;base64,${data.image_base64}`;
    img.className = "article-image";
    document.getElementById("article").prepend(img);
  }
}

async function searchArticles() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (!q) return;
  const { data, error } = await supabaseClient
    .from("articles")
    .select("id,title,created_at")
    .ilike("title", `%${q}%`)
    .order("created_at", { ascending: false });
  const resultEl = document.getElementById("search-results");
  if (error) {
    console.error(error);
    resultEl.innerHTML = "<p>検索エラーが発生しました</p>";
    return;
  }
  if (data.length === 0) {
    resultEl.innerHTML = "<p>該当する記事はありません</p>";
    return;
  }
  const list = document.createElement("ul");
  data.forEach(item => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `view.html?id=${item.id}`;
    link.textContent = item.title;
    li.appendChild(link);
    list.appendChild(li);
  });
  resultEl.appendChild(list);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("id")) {
    loadArticle();
  } else if (params.has("q")) {
    searchArticles();
  }
});
