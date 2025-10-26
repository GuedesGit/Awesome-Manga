import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [showSortMenu, setShowSortMenu] = useState(false); // menu flutuante de ordenação
  const [sortOrder, setSortOrder] = useState('recent'); // estado para ordenação
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null); // filtro de tag
  const [showTagMenu, setShowTagMenu] = useState(false); // menu de tags no topo
  const perPage = 6;

  // Fecha menus ao clicar fora
  useEffect(() => {
    function handleClick(e) {
      const sortMenu = document.getElementById('sort-menu');
      const tagMenu = document.getElementById('tag-menu');
      if (showSortMenu && sortMenu && !sortMenu.contains(e.target)) {
        setShowSortMenu(false);
      }
      if (showTagMenu && tagMenu && !tagMenu.contains(e.target)) {
        setShowTagMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSortMenu, showTagMenu]);
  const [modalArticle, setModalArticle] = useState(null); // artigo selecionado para modal

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
    // Filtra por tag se selecionada
    if (selectedTag && a.tag_id !== selectedTag) return false;
    if (!q) return true;
    return (
      (a.title?.toLowerCase().includes(q) || "") ||
      (a.tag_id && tagNames[a.tag_id]?.toLowerCase().includes(q))
    );
  });

  // Ordenação dos artigos
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortOrder === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at);
    }
    if (sortOrder === 'az') {
      return (a.title || '').localeCompare(b.title || '');
    }
    if (sortOrder === 'za') {
      return (b.title || '').localeCompare(a.title || '');
    }
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = sorted.slice((page - 1) * perPage, page * perPage);

  return (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f9fafb', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Top bar */}
  <header style={{ width: '100%', background: '#222', color: '#eee', boxShadow: '0 2px 8px #0001', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Anime Logo" style={{ height: '70px', width: 'auto' }} />
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 600, color: '#eee', lineHeight: 1.1 }}>
            <span>Cultura</span>
            <span style={{ marginTop: '2px' }}>Japonesa</span>
          </span>
        </div>
         <div style={{ flexGrow: 1, paddingLeft: '5px', paddingRight: '0px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', filter: 'grayscale(1)', display: 'block' }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Pesquisar artigos, animes, mangas..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ width: '100%', paddingLeft: '40px', borderRadius: '999px', boxShadow: '0 1px 4px #0001', border: '1px solid #e5e7eb', height: '40px', outline: 'none', fontSize: '16px', marginRight: 0 }}
            />
          </div>
        </div>
        {/* Botão/menu de filtro de tags depois da barra de pesquisa */}
        {/* Botão/menu de filtro de tags flutuante */}
        <div style={{ position: 'relative', marginLeft: '8px' }}>
          <button
            onClick={() => setShowTagMenu(v => !v)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#a78bfa',
              color: '#fff',
              border: 'none',
              boxShadow: '0 2px 8px #0002',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            title="Filtrar por tag"
          >
            🏷️
          </button>
          {/* Menu de seleção de tags */}
          {showTagMenu && (
            <div id="tag-menu" style={{ position: 'absolute', top: '54px', right: 0, background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px #0003', padding: '18px 24px', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '140px', maxWidth: '220px' }}>
              <button
                onClick={() => { setSelectedTag(null); setShowTagMenu(false); setPage(1); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: selectedTag === null ? '#fff' : '#222',
                  background: selectedTag === null ? '#a78bfa' : '#f3f4f6',
                  boxShadow: selectedTag === null ? '0 2px 8px #0002' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  outline: selectedTag === null ? '2px solid #222' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🗂️ Todos
              </button>
              <button
                onClick={() => { setSelectedTag(1); setShowTagMenu(false); setPage(1); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: selectedTag === 1 ? '#fff' : '#222',
                  background: selectedTag === 1 ? '#f87171' : '#f3f4f6',
                  boxShadow: selectedTag === 1 ? '0 2px 8px #0002' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  outline: selectedTag === 1 ? '2px solid #222' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🍥 Anime
              </button>
              <button
                onClick={() => { setSelectedTag(2); setShowTagMenu(false); setPage(1); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: selectedTag === 2 ? '#fff' : '#222',
                  background: selectedTag === 2 ? '#60a5fa' : '#f3f4f6',
                  boxShadow: selectedTag === 2 ? '0 2px 8px #0002' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  outline: selectedTag === 2 ? '2px solid #222' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📚 Manga
              </button>
              <button
                onClick={() => { setSelectedTag(3); setShowTagMenu(false); setPage(1); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: selectedTag === 3 ? '#fff' : '#222',
                  background: selectedTag === 3 ? '#34d399' : '#f3f4f6',
                  boxShadow: selectedTag === 3 ? '0 2px 8px #0002' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  outline: selectedTag === 3 ? '2px solid #222' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🎌 Culture
              </button>
            </div>
          )}
        </div>
      </header>
      {/* Articles list - vertical with pagination */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '64px', paddingTop: '40px' }}>
        {/* Botão de ordenação só aparece se houver artigos, igual à paginação */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                onClick={() => setShowSortMenu(v => !v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #d1d5db',
                  fontWeight: 500,
                  fontSize: '15px',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                title="Ordenar artigos"
              >
                <span style={{ fontSize: '16px', color: '#888' }}>▼</span> Ordenar
              </button>
              {showSortMenu && (
                <div id="sort-menu" style={{ position: 'absolute', top: '38px', right: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #0002', padding: '10px 0', zIndex: 20, minWidth: '150px', border: '1px solid #e5e7eb' }}>
                  <button
                    onClick={() => { setSortOrder('recent'); setShowSortMenu(false); setPage(1); }}
                    style={{
                      width: '100%',
                      padding: '8px 18px',
                      border: 'none',
                      background: sortOrder === 'recent' ? '#f3f4f6' : '#fff',
                      color: '#222',
                      fontWeight: 500,
                      fontSize: '15px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    Mais recente
                  </button>
                  <button
                    onClick={() => { setSortOrder('oldest'); setShowSortMenu(false); setPage(1); }}
                    style={{
                      width: '100%',
                      padding: '8px 18px',
                      border: 'none',
                      background: sortOrder === 'oldest' ? '#f3f4f6' : '#fff',
                      color: '#222',
                      fontWeight: 500,
                      fontSize: '15px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    Mais antigo
                  </button>
                  <button
                    onClick={() => { setSortOrder('az'); setShowSortMenu(false); setPage(1); }}
                    style={{
                      width: '100%',
                      padding: '8px 18px',
                      border: 'none',
                      background: sortOrder === 'az' ? '#f3f4f6' : '#fff',
                      color: '#222',
                      fontWeight: 500,
                      fontSize: '15px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    Título A-Z
                  </button>
                  <button
                    onClick={() => { setSortOrder('za'); setShowSortMenu(false); setPage(1); }}
                    style={{
                      width: '100%',
                      padding: '8px 18px',
                      border: 'none',
                      background: sortOrder === 'za' ? '#f3f4f6' : '#fff',
                      color: '#222',
                      fontWeight: 500,
                      fontSize: '15px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    Título Z-A
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <>
        {displayed.map((a, i) => (
          <div
            key={a.id || i}
            style={{ width: '100%', maxWidth: '800px', minHeight: '192px', borderRadius: '12px', boxShadow: '0 2px 8px #0002', background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'row', marginBottom: '16px', transition: 'transform 0.2s', cursor: 'pointer' }}
            onClick={() => setModalArticle(a)}
          >
            {/* Imagem à esquerda */}
            {a.image && (
              <div style={{ width: '300px', minWidth: '220px', height: '100%', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={a.image} alt={a.title} style={{ width: '100%', height: '192px', objectFit: 'cover', borderRadius: '12px 0 0 12px' }} />
              </div>
            )}
            {/* Conteúdo à direita */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 20px 16px 20px', position: 'relative' }}>
              {/* Badge visual da tag */}
              {a.tag_id && (
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#fff',
                  background:
                    a.tag_id === 1 ? '#f87171' :
                    a.tag_id === 2 ? '#60a5fa' :
                    a.tag_id === 3 ? '#34d399' : '#a78bfa',
                  boxShadow: '0 2px 8px #0002',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                }}>
                  {a.tag_id === 1 && '🍥'}
                  {a.tag_id === 2 && '📚'}
                  {a.tag_id === 3 && '🎌'}
                  {tagNames[a.tag_id]}
                </span>
              )}
              <div style={{ fontWeight: 600, fontSize: '20px', marginBottom: '8px', color: '#222' }}>{a.title}</div>
              {a.content && <div style={{ color: '#666', fontSize: '15px', marginBottom: '12px' }}>{a.content}</div>}
            </div>
          </div>
        ))}
        </>
        {/* Modal popup */}
        {modalArticle && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setModalArticle(null)}>
            <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 4px 32px #0002', padding: '32px', minWidth: '320px', maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
              {modalArticle.image && (
                <img src={modalArticle.image} alt={modalArticle.title} style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: '14px', marginBottom: '18px' }} />
              )}
              {/* YouTube embed se houver link no conteúdo */}
              {/* TODO: Futuramente usar coluna video_url na tabela articles */}
              <div style={{ margin: '18px 0' }}>
                <iframe
                  width="100%"
                  height="320"
                  src="https://www.youtube.com/embed/vvnNpjH93NU"
                  title="Akira Trailer 1988"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '12px', boxShadow: '0 2px 16px #0002' }}
                ></iframe>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0' }}>{modalArticle.title}</h2>
              <div style={{ color: '#222', fontSize: '17px', lineHeight: 1.7, marginBottom: '12px' }}>{modalArticle.content}</div>
              <button onClick={() => setModalArticle(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: '#eee', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '22px', cursor: 'pointer' }}>✕</button>
            </div>
          </div>
        )}

        {/* Loading and error messages */}
        {loading && (
          <div style={{ textAlign: 'center', marginTop: '32px', color: '#888', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '38px',
                animation: 'spin 1.1s linear infinite',
              }}
            >
              🌀
            </span>
            <span>A carregar artigos...</span>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}
  {error && <div style={{ textAlign: 'center', marginTop: '32px', color: 'red' }}>🚨 {error}</div>}
  {!loading && !error && filtered.length === 0 && <div style={{ textAlign: 'center', marginTop: '32px', color: '#888' }}>😢 Nenhum artigo encontrado.</div>}

        {/* Pagination */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              style={{
                padding: '4px',
                border: 'none',
                background: 'none',
                color: page === 1 ? '#ccc' : '#222',
                fontSize: '22px',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                transition: 'transform 0.15s',
                filter: page === 1 ? 'grayscale(1)' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.25)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1.25)'}
            >
              ⬅️
            </button>
            <span style={{ alignSelf: 'center', fontSize: '14px', color: '#666' }}>
              Página {page} de {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              style={{
                padding: '4px',
                border: 'none',
                background: 'none',
                color: page === totalPages ? '#ccc' : '#222',
                fontSize: '22px',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                transition: 'transform 0.15s',
                filter: page === totalPages ? 'grayscale(1)' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.25)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1.25)'}
            >
              ➡️
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: '#222', color: '#eee', padding: '32px 24px', marginTop: 'auto' }}>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Sobre o site com logo maior */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: '80px' }}>
              <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" style={{ height: '70px', width: 'auto', marginBottom: '2px' }} />
            </div>
          </div>
          {/* Redes sociais */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px', marginTop: '0' }}>Redes Sociais</h4>
            <ul style={{ fontSize: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li>📸 Instagram</li>
              <li>🐦 Twitter / X</li>
              <li>📺 YouTube</li>
            </ul>
          </div>
          {/* Contacto */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px', marginTop: '0' }}>Contacto</h4>
            <p style={{ fontSize: '14px', marginTop: '0' }}>✉️ info@awesome_manga.pt</p>
          </div>
        </div>
        {/* Frases divertidas com emojis */}
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#fed7aa', marginTop: '24px' }}>
          <span style={{ color: '#fff' }}>
            🎌 Site dedicado ao universo anime, manga e cultura pop. Feito por fãs, para fãs!<br />
            🚀 Explore, descubra e partilhe a paixão pelo manga e anime!
          </span>
        </div>
        {/* Direitos */}
  <div style={{ textAlign: 'center', fontSize: '13px', color: '#fff', marginTop: '16px' }}><span style={{ fontWeight: 'bold' }}>© 2025</span> AwesomeManga. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}

