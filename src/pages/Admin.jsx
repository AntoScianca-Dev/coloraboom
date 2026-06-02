import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faHandshakeAlt, faRightFromBracket,
  faRefresh, faPlus, faTrash, faToggleOn, faToggleOff,
  faMagnifyingGlass, faFilePdf,
  faCheck, faXmark,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════

/** Restituisce true se l'iscritto è soggetto a pagamento (mattino o entrambi, NON solo serale) */
const hasPagamento = (r) => {
  const ev = r.evento?.toLowerCase();
  return ev === 'mattino' || ev === 'entrambi';
};

// ═══════════════════════════════════════════
//  TAG COMPONENTS
// ═══════════════════════════════════════════

function TagEvento({ v }) {
  if (!v) return <span className="text-[#7a7a9a]">—</span>;
  const map = {
    'mattino':  { label: 'Mattino',  cls: 'bg-[#FF6B35]/15 text-[#FF6B35]' },
    'serale':   { label: 'Serale',   cls: 'bg-[#9B5DE5]/15 text-[#9B5DE5]' },
    'entrambi': { label: 'Entrambi', cls: 'bg-[#00C9A7]/15 text-[#00C9A7]' },
  };
  const t = map[v.toLowerCase()] || { label: v, cls: 'bg-white/10 text-white' };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[0.7rem] font-bold ${t.cls}`}>
      {t.label}
    </span>
  );
}

function TagPagato({ pagato, id, onToggle }) {
  return (
    <button
      onClick={() => onToggle(id, !pagato)}
      title={pagato ? 'Segna come non pagato' : 'Segna come pagato'}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[0.7rem] font-bold
        transition-all duration-200 hover:scale-105
        ${pagato
          ? 'bg-[#00C9A7]/15 text-[#00C9A7] hover:bg-[#00C9A7]/25'
          : 'bg-[#ff4d4d]/15 text-[#ff4d4d] hover:bg-[#ff4d4d]/25'
        }
      `}
    >
      <FontAwesomeIcon icon={pagato ? faCheck : faXmark} className="text-[0.6rem]" />
      {pagato ? 'Pagato' : 'Da pagare'}
    </button>
  );
}

// ═══════════════════════════════════════════
//  PDF EXPORT
// ═══════════════════════════════════════════

const exportPDF = async (rows, filterLabel) => {
  // Import dinamico: installa con  npm i jspdf jspdf-autotable
  const { default: jsPDF }    = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Intestazione
  doc.setFontSize(16);
  doc.setTextColor(255, 107, 53);
  doc.text('ColoraBoom! — Iscrizioni', 14, 16);

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 150);
  doc.text(
    `Filtro: ${filterLabel}  |  Totale righe: ${rows.length}  |  ${new Date().toLocaleDateString('it-IT')}`,
    14, 23
  );

  autoTable(doc, {
    startY: 28,
    styles: {
      fontSize: 8,
      cellPadding: 3,
      font: 'helvetica',
      textColor: [30, 30, 40],
    },
    headStyles: {
      fillColor: [255, 107, 53],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 7.5,
    },
    alternateRowStyles: { fillColor: [248, 246, 255] },
    head: [[
      '#', 'Data', 'Nome bambino', 'Cognome bambino', 'Età',
      'Evento', 'Genitore', 'Telefono', 'Email', 'Pagato'
    ]],
    body: rows.map((r, i) => [
      i + 1,
      new Date(r.created_at).toLocaleDateString('it-IT'),
      r.nome_bambino   || '',
      r.cognome_bambino || '',
      r.eta_bambino    ?? '',
      r.evento         || '',
      `${r.nome_genitore || ''} ${r.cognome_genitore || ''}`.trim(),
      r.telefono       || '',
      r.email          || '',
      hasPagamento(r) ? (r.pagato ? 'Pagato' : 'Da pagare') : '—',
    ]),
  });

  doc.save(`coloraboom-iscrizioni-${Date.now()}.pdf`);
};

// ═══════════════════════════════════════════
//  SEZIONE ISCRIZIONI
// ═══════════════════════════════════════════

function IscrizioniSection() {
  const [data,         setData]         = useState([]);
  const [filtered,     setFiltered]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [exporting,    setExporting]    = useState(false);
  const [search,       setSearch]       = useState('');
  const [filterEvento, setFilterEvento] = useState('');
  const [filterPagato, setFilterPagato] = useState('');
  const [page,         setPage]         = useState(1);
  const PAGE = 15;

  const load = async () => {
    setLoading(true);
    const { data: rows, error } = await supabase
      .from('iscrizioni')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setData(rows || []);
    setLoading(false);
  };
  
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Sei sicuro di voler eliminare questo iscritto?"
    );

    if (!ok) return;

    try {
      const { error } = await supabase
        .from('iscrizioni')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // ricarica i dati reali dal database
      await load();

    } catch (err) {
      console.error('Errore eliminazione:', err);
      alert('Errore durante l\'eliminazione: ' + err.message);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let f = [...data];

    // ── Filtro ricerca testo ──────────────────────────────────────────────
    if (search)
      f = f.filter(r => JSON.stringify(r).toLowerCase().includes(search.toLowerCase()));

    // ── Filtro evento ─────────────────────────────────────────────────────
    // mattino → mattino + entrambi
    // serale  → serale  + entrambi
    // ''      → tutti
    if (filterEvento === 'mattino')
      f = f.filter(r => ['mattino', 'entrambi'].includes(r.evento?.toLowerCase()));
    else if (filterEvento === 'serale')
      f = f.filter(r => ['serale', 'entrambi'].includes(r.evento?.toLowerCase()));

    // ── Filtro pagato ─────────────────────────────────────────────────────
    // Esclude sempre i "solo serale" (non prevedono pagamento)
    if (filterPagato !== '') {
      f = f.filter(r => hasPagamento(r) && r.pagato === (filterPagato === 'true'));
    }

    setFiltered(f);
    setPage(1);
  }, [data, search, filterEvento, filterPagato]);

  const togglePagato = async (id, val) => {
    await supabase.from('iscrizioni').update({ pagato: val }).eq('id', id);
    setData(prev => prev.map(r => r.id === id ? { ...r, pagato: val } : r));
  };

  const handleExportPDF = async () => {
    setExporting(true);
    const filterLabel =
      filterEvento === 'mattino' ? 'Mattino (+ Entrambi)' :
      filterEvento === 'serale'  ? 'Serale (+ Entrambi)'  :
      filterPagato === 'true'    ? 'Pagati'               :
      filterPagato === 'false'   ? 'Da pagare'            : 'Tutti';
    try {
      await exportPDF(filtered, filterLabel);
    } finally {
      setExporting(false);
    }
  };

  const pages     = Math.max(1, Math.ceil(filtered.length / PAGE));
  const pageItems = filtered.slice((page - 1) * PAGE, page * PAGE);

  // ── Stats ──────────────────────────────────────────────────────────────
  // "entrambi" conta sia in mattino che in serale
  const totale  = data.length;
  const mattino = data.filter(r => ['mattino', 'entrambi'].includes(r.evento?.toLowerCase())).length;
  const serale  = data.filter(r => ['serale',  'entrambi'].includes(r.evento?.toLowerCase())).length;

  // Per i pagamenti: escludiamo i "solo serale"
  const conPagamento = data.filter(hasPagamento);
  const pagati       = conPagamento.filter(r => r.pagato).length;

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Totale iscritti', value: totale,                      color: 'text-[#FF6B35]' },
          { label: 'Mattino',         value: mattino,                     color: 'text-[#FFD93D]' },
          { label: 'Serale',          value: serale,                      color: 'text-[#9B5DE5]' },
          { label: 'Pagamenti ok',    value: `${pagati}/${conPagamento.length}`, color: 'text-[#00C9A7]' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: '#18181f', border: '1px solid #2e2e3a' }}>
            <p className="text-[0.68rem] font-bold uppercase tracking-widest mb-2" style={{ color: '#7a7a9a' }}>{label}</p>
            <p className={`font-baloo font-extrabold text-3xl ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {/* Search */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: '#7a7a9a' }}
            />
            <input
              type="text"
              placeholder="Cerca…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-xl text-sm font-mono outline-none w-48"
              style={{ background: '#22222c', border: '1px solid #2e2e3a', color: '#f0eeff' }}
            />
          </div>

          {/* Filtro evento: solo Tutti / Mattino / Serale */}
          <select
            value={filterEvento}
            onChange={e => setFilterEvento(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm font-mono outline-none appearance-none"
            style={{ background: '#22222c', border: '1px solid #2e2e3a', color: '#f0eeff' }}
          >
            <option value="">Tutti gli eventi</option>
            <option value="mattino">Mattino</option>
            <option value="serale">Serale</option>
          </select>

          {/* Filtro pagato */}
          <select
            value={filterPagato}
            onChange={e => setFilterPagato(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm font-mono outline-none appearance-none"
            style={{ background: '#22222c', border: '1px solid #2e2e3a', color: '#f0eeff' }}
          >
            <option value="">Tutti</option>
            <option value="true">Pagati</option>
            <option value="false">Da pagare</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: '#22222c', border: '1px solid #2e2e3a', color: '#00C9A7' }}
          >
            <FontAwesomeIcon icon={faRefresh} /> Aggiorna
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exporting || filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            style={{ background: '#22222c', border: '1px solid #2e2e3a', color: '#9B5DE5' }}
          >
            {exporting
              ? <span className="w-3 h-3 rounded-full border-2 border-[#9B5DE5]/30 border-t-[#9B5DE5] animate-spin" />
              : <FontAwesomeIcon icon={faFilePdf} />
            }
            Esporta PDF
          </button>
        </div>
      </div>

      {/* Tabella */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#18181f', border: '1px solid #2e2e3a' }}>
        {loading ? (
          <div className="py-16 text-center" style={{ color: '#7a7a9a' }}>
            <div className="w-8 h-8 rounded-full border-2 border-[#FF6B35]/30 border-t-[#FF6B35] animate-spin mx-auto mb-3" />
            <p className="text-sm font-mono">Caricamento…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center" style={{ color: '#7a7a9a' }}>
            <p className="text-3xl mb-3">📭</p>
            <p className="text-sm font-mono">Nessuna iscrizione trovata.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ background: '#22222c' }}>
                    {['#', 'Nome', 'Cognome', 'Età', 'Evento', 'Genitore', 'Telefono', 'Email', 'Pagato'].map(h => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest whitespace-nowrap"
                        style={{ color: '#7a7a9a' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((r, i) => (
                    <tr
                      key={r.id}
                      className="hover:bg-white/[0.02] transition-colors"
                      style={{ borderTop: '1px solid #2e2e3a' }}
                    >
                      <td className="px-4 py-3 text-[0.72rem] font-mono" style={{ color: '#7a7a9a' }}>
                        {(page - 1) * PAGE + i + 1}<br />
                        <span className="text-[0.65rem]">
                          {new Date(r.created_at).toLocaleDateString('it-IT')}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-baloo font-bold text-sm" style={{ color: '#f0eeff' }}>{r.nome_bambino}</td>
                      <td className="px-4 py-3 text-sm font-mono" style={{ color: '#f0eeff' }}>{r.cognome_bambino}</td>
                      <td className="px-4 py-3 text-sm font-mono" style={{ color: '#FFD93D' }}>{r.eta_bambino}</td>
                      <td className="px-4 py-3"><TagEvento v={r.evento} /></td>
                      <td className="px-4 py-3 text-sm font-mono" style={{ color: '#f0eeff' }}>
                        {r.nome_genitore} {r.cognome_genitore}
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${r.telefono}`}
                          className="text-sm font-mono hover:text-[#00C9A7] transition-colors"
                          style={{ color: '#00C9A7', textDecoration: 'none' }}>
                          {r.telefono}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${r.email}`}
                          className="text-sm font-mono hover:text-[#9B5DE5] transition-colors"
                          style={{ color: '#9B5DE5', textDecoration: 'none' }}>
                          {r.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 flex justify-between">
                        {/* Serale puro → nessun tag pagamento */}
                        {hasPagamento(r)
                          ? <TagPagato pagato={r.pagato} id={r.id} onToggle={togglePagato} />
                          : <span className="text-[0.7rem] font-mono" style={{ color: '#3a3a4a' }}>—</span>
                        }

                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-xs px-2 py-1 rounded-xl"
                          style={{
                            background: '#2a1a1a',
                            border: '1px solid #442222',
                            color: '#ff4d4d'
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                        </button>

                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginazione */}
            <div className="flex items-center justify-between px-5 py-3 flex-wrap gap-3"
              style={{ borderTop: '1px solid #2e2e3a' }}>
              <span className="text-xs font-mono" style={{ color: '#7a7a9a' }}>
                {(page - 1) * PAGE + 1}–{Math.min(page * PAGE, filtered.length)} di {filtered.length}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-8 h-8 rounded-lg text-xs font-mono transition-colors"
                    style={{
                      background: p === page ? '#FF6B35' : '#22222c',
                      border: `1px solid ${p === page ? '#FF6B35' : '#2e2e3a'}`,
                      color: p === page ? '#fff' : '#f0eeff',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  SEZIONE SPONSOR  (invariata)
// ═══════════════════════════════════════════

const EMPTY_SPONSOR = { nome: '', logo_url: '', url: '', tier: 'bronze', attivo: true };

function SponsorForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm]         = useState(initial || EMPTY_SPONSOR);
  const [uploading, setUploading] = useState(false);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const ext      = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('sponsors').upload(fileName, file, { upsert: false });
    if (error) {
      alert('Errore upload: ' + error.message);
    } else {
      const { data } = supabase.storage.from('sponsors').getPublicUrl(fileName);
      setForm(f => ({ ...f, logo_url: data.publicUrl }));
    }
    setUploading(false);
  };

  return (
    <div className="rounded-2xl p-6 space-y-4" style={{ background: '#22222c', border: '1px solid #2e2e3a' }}>
      <h4 className="font-baloo font-bold text-base" style={{ color: '#f0eeff' }}>
        {initial?.id ? 'Modifica sponsor' : 'Nuovo sponsor'}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.68rem] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7a7a9a' }}>Nome *</label>
          <input name="nome" value={form.nome} onChange={handle} placeholder="Es. Azienda Srl"
            className="w-full px-4 py-2.5 rounded-xl text-sm font-mono outline-none"
            style={{ background: '#18181f', border: '1px solid #2e2e3a', color: '#f0eeff' }} />
        </div>
        <div>
          <label className="block text-[0.68rem] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7a7a9a' }}>Tier</label>
          <select name="tier" value={form.tier} onChange={handle}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-mono outline-none appearance-none"
            style={{ background: '#18181f', border: '1px solid #2e2e3a', color: '#f0eeff' }}>
            <option value="gold">⭐ Gold</option>
            <option value="silver">🥈 Silver</option>
            <option value="bronze">🥉 Bronze</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[0.68rem] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7a7a9a' }}>Logo sponsor</label>
          {form.logo_url ? (
            <div className="flex items-center gap-4 p-3 rounded-xl" style={{ background: '#18181f', border: '1px solid #2e2e3a' }}>
              <img src={form.logo_url} alt="preview" className="h-12 w-auto object-contain rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono truncate" style={{ color: '#7a7a9a' }}>{form.logo_url.split('/').pop()}</p>
              </div>
              <button type="button" onClick={() => setForm(f => ({ ...f, logo_url: '' }))}
                className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{ background: '#ff4d4d15', color: '#ff4d4d', border: '1px solid #ff4d4d30' }}>
                Rimuovi
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer"
              style={{ background: '#18181f', border: '2px dashed #2e2e3a' }}>
              {uploading
                ? <div className="w-6 h-6 rounded-full border-2 border-[#FF6B35]/30 border-t-[#FF6B35] animate-spin" />
                : <>
                    <span className="text-2xl">🖼️</span>
                    <span className="text-sm font-mono" style={{ color: '#7a7a9a' }}>Clicca per caricare il logo</span>
                    <span className="text-xs" style={{ color: '#3a3a4a' }}>PNG, JPG, SVG — max 2MB</span>
                  </>
              }
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
            </label>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[0.68rem] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7a7a9a' }}>Sito web sponsor</label>
          <input name="url" value={form.url} onChange={handle} placeholder="https://www.sponsor.it"
            className="w-full px-4 py-2.5 rounded-xl text-sm font-mono outline-none"
            style={{ background: '#18181f', border: '1px solid #2e2e3a', color: '#f0eeff' }} />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" name="attivo" id="attivo" checked={form.attivo} onChange={handle} className="w-4 h-4 accent-[#FF6B35]" />
          <label htmlFor="attivo" className="text-sm font-mono" style={{ color: '#f0eeff' }}>Sponsor attivo (visibile sul sito)</label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} disabled={saving || !form.nome}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF4D8D)' }}>
          {saving ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <FontAwesomeIcon icon={faCheck} />}
          {initial?.id ? 'Salva modifiche' : 'Aggiungi sponsor'}
        </button>
        <button onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          style={{ background: '#18181f', border: '1px solid #2e2e3a', color: '#7a7a9a' }}>
          Annulla
        </button>
      </div>
    </div>
  );
}

function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving,   setSaving]   = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('sponsors').select('*').order('tier_order').order('nome');
    setSponsors(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    setSaving(true);
    const { id, ...payload } = form;
    if (id) await supabase.from('sponsors').update(payload).eq('id', id);
    else    await supabase.from('sponsors').insert([payload]);
    await load();
    setShowForm(false);
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Eliminare questo sponsor?')) return;
    await supabase.from('sponsors').delete().eq('id', id);
    setSponsors(prev => prev.filter(s => s.id !== id));
  };

  const handleToggle = async (id, attivo) => {
    await supabase.from('sponsors').update({ attivo }).eq('id', id);
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, attivo } : s));
  };

  const TIER_LABEL = { gold: '⭐ Gold', silver: '🥈 Silver', bronze: '🥉 Bronze' };

  return (
    <div className="space-y-6">
      {!showForm && (
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF4D8D)', boxShadow: '0 4px 16px rgba(255,107,53,0.3)' }}>
          <FontAwesomeIcon icon={faPlus} /> Aggiungi sponsor
        </button>
      )}
      {showForm && <SponsorForm onSave={handleSave} onCancel={() => setShowForm(false)} saving={saving} />}
      {loading ? (
        <div className="py-12 text-center" style={{ color: '#7a7a9a' }}>
          <div className="w-8 h-8 rounded-full border-2 border-[#FF6B35]/30 border-t-[#FF6B35] animate-spin mx-auto mb-3" />
        </div>
      ) : sponsors.length === 0 ? (
        <div className="py-12 text-center" style={{ color: '#7a7a9a' }}>
          <p className="text-3xl mb-3">🤝</p>
          <p className="text-sm font-mono">Nessuno sponsor ancora. Aggiungine uno!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sponsors.map(s => (
            <div key={s.id} className="flex items-center gap-4 p-4 rounded-2xl transition-colors"
              style={{ background: '#18181f', border: '1px solid #2e2e3a' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: '#22222c' }}>
                {s.logo_url
                  ? <img src={s.logo_url} alt={s.nome} className="w-full h-full object-contain p-1" />
                  : <span className="text-xl">🏢</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-baloo font-bold text-sm" style={{ color: '#f0eeff' }}>{s.nome}</span>
                  <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: '#2e2e3a', color: '#7a7a9a' }}>
                    {TIER_LABEL[s.tier] || s.tier}
                  </span>
                  {!s.attivo && (
                    <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-[#ff4d4d]/15 text-[#ff4d4d]">
                      Disattivo
                    </span>
                  )}
                </div>
                {s.url && (
                  <a href={s.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-mono truncate hover:text-[#FF6B35] transition-colors"
                    style={{ color: '#7a7a9a' }}>
                    {s.url}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleToggle(s.id, !s.attivo)}
                  title={s.attivo ? 'Disattiva' : 'Attiva'}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: s.attivo ? '#00C9A7' : '#7a7a9a' }}>
                  <FontAwesomeIcon icon={s.attivo ? faToggleOn : faToggleOff} />
                </button>
                <button onClick={() => handleDelete(s.id)} title="Elimina"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#ff4d4d]/10"
                  style={{ color: '#ff4d4d' }}>
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
//  MAIN ADMIN PAGE
// ═══════════════════════════════════════════

const TABS = [
  { key: 'iscrizioni', label: 'Iscrizioni', icon: faUsers },
  { key: 'sponsors',   label: 'Sponsor',    icon: faHandshakeAlt },
];

export default function Admin() {
  const [tab, setTab] = useState('iscrizioni');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    // ↓ pt-[68px] compensa l'altezza della Navbar del sito (fixed, h-[68px])
    <div className="min-h-screen pt-[68px]" style={{ background: '#0f0f13', color: '#f0eeff' }}>

      {/* Topbar admin — sticky ma parte SOTTO la navbar del sito */}
      <div
        className="sticky top-[68px] z-40 flex items-center justify-between px-4 sm:px-6 py-3 flex-wrap gap-3"
        style={{ background: '#18181f', borderBottom: '1px solid #2e2e3a' }}
      >
        {/* Logo / titolo */}
        <div className="font-baloo font-extrabold text-lg sm:text-xl" style={{ letterSpacing: '-0.03em' }}>
          Colora<span className="text-[#FF6B35]">Boom!</span>
          <span className="ml-2 text-xs sm:text-sm font-mono font-normal" style={{ color: '#7a7a9a' }}>// admin</span>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#22222c' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200"
              style={{
                background: tab === t.key ? '#FF6B35' : 'transparent',
                color:      tab === t.key ? '#fff'    : '#7a7a9a',
              }}
            >
              <FontAwesomeIcon icon={t.icon} className="text-xs" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors hover:text-[#ff4d4d]"
          style={{ background: '#22222c', border: '1px solid #2e2e3a', color: '#7a7a9a' }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className="hidden sm:inline">Esci</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === 'iscrizioni' ? <IscrizioniSection /> : <SponsorsSection />}
      </div>
    </div>
  );
}