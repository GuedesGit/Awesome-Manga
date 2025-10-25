import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const perPage = 8;

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('articles')
        .select('id, created_at, title, content, tag_id, image')
        .order('created_at', { ascending: false });
      if (error) setError(error.message);
      setArticles(data || []);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  // Filtrar por pesquisa
  // Tags disponíveis
  const tagNames = {
    1: "anime",
    2: "manga",
    3: "culture"
  };

  const filtered = articles.filter(a => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (a.title?.toLowerCase().includes(q) || "") ||
      (a.tag_id && tagNames[a.tag_id]?.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Top bar */}
      <header style={{ width: '100%', background: '#fed7aa', color: '#222', boxShadow: '0 2px 8px #0001', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Anime Logo" style={{ height: '40px', width: 'auto' }} />
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#444' }}>Anime • Manga • Cultura Pop</span>
        </div>
        <div style={{ flexGrow: 1, paddingLeft: '5px', paddingRight: '24px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', filter: 'grayscale(1)', display: 'block' }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Pesquisar artigos, animes, mangas..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ width: '100%', paddingLeft: '40px', borderRadius: '999px', boxShadow: '0 1px 4px #0001', border: '1px solid #e5e7eb', height: '40px', outline: 'none', fontSize: '16px' }}
            />
          </div>
        </div>
      </header>

      {/* Articles list - vertical with pagination */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '64px', paddingTop: '40px' }}>
        {displayed.map((a, i) => (
          <div key={a.id || i} style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', boxShadow: '0 2px 8px #0002', background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: '8px', transition: 'transform 0.2s', cursor: 'pointer' }}>
            {a.image && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', background: '#fafafa' }}>
                <img src={a.image} alt={a.title} style={{ width: 'auto', height: '192px', display: 'block', margin: 'auto', objectFit: 'contain' }} />
              </div>
            )}
            <div style={{ padding: '16px', fontWeight: 600, display: 'flex', alignItems: 'center' }}>{a.title}</div>
            {a.content && <div style={{ padding: '0 16px 16px 16px', color: '#666', fontSize: '15px' }}>{a.content}</div>}
            {a.tag_id && (
              <div style={{ padding: '0 16px 16px 16px', fontSize: '13px', color: '#888' }}>Tag: {tagNames[a.tag_id]}</div>
            )}
          </div>
        ))}

        {/* Loading and error messages */}
        {loading && <div style={{ textAlign: 'center', marginTop: '32px', color: '#888' }}>A carregar artigos...</div>}
        {error && <div style={{ textAlign: 'center', marginTop: '32px', color: 'red' }}>Erro: {error}</div>}
        {!loading && !error && filtered.length === 0 && <div style={{ textAlign: 'center', marginTop: '32px', color: '#888' }}>Nenhum artigo encontrado.</div>}

        {/* Pagination */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', background: page === 1 ? '#f3f4f6' : '#fff', color: '#222', fontSize: '20px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
          >
            ←
          </button>
          <span style={{ alignSelf: 'center', fontSize: '14px', color: '#666' }}>
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', background: page === totalPages ? '#f3f4f6' : '#fff', color: '#222', fontSize: '20px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
          >
            →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#222', color: '#eee', padding: '32px 24px', marginTop: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>Sobre</h4>
            <p style={{ fontSize: '14px' }}>Site dedicado ao universo Anime, Manga e Cultura Pop. Criado por fãs, para fãs.</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>Redes Sociais</h4>
            <ul style={{ fontSize: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>Instagram</li>
              <li>Twitter / X</li>
              <li>YouTube</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>Contacto</h4>
            <p style={{ fontSize: '14px' }}>info@animepop.pt</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '24px' }}>© 2025 AnimePop. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}

