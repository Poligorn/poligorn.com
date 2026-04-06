import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { createClient } from '@supabase/supabase-js';

// Get env vars (Astro passes these if mapped or we can pass as props)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Node {
  id: string;
  name: string;
  group: number;
  val: number;
  link?: string;
  text?: string;
  date?: string;
}

interface Link {
  source: string;
  target: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

// Helper to extract first sentence
function getFirstSentence(text: string, lang: string): string {
  if (!text) return lang === 'ru' ? 'Пост без текста' : 'Post without text';
  
  // Split by common sentence endings (. ! ?) followed by space or end of string
  // or newline
  const match = text.match(/^.*?[.!?](?:\s|$|\\n)|(?:.*?\\n)|.+$/);
  let firstSentence = match ? match[0].trim() : text.trim();
  
  // Clean up any Markdown/Telegram formatting (like asterisks for bold)
  firstSentence = firstSentence.replace(/[*_~`]/g, '');
  
  // Limit length just in case the first sentence is huge
  if (firstSentence.length > 50) {
    firstSentence = firstSentence.substring(0, 50) + '...';
  }
  
  return firstSentence || (lang === 'ru' ? 'Пост' : 'Post');
}

export default function BrainGraph({ isTma = false, lang = 'ru' }: { isTma?: boolean, lang?: string }) {
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [charge, setCharge] = useState(-200);
  const [linkDist, setLinkDist] = useState(50);
  const [postColor, setPostColor] = useState('#5aaaff');
  const [tagColor, setTagColor] = useState('#6effaa');
  const [homeColor, setHomeColor] = useState('#ffcc00');
  const [mocColor, setMocColor] = useState('#d966ff');
  const [showTags, setShowTags] = useState(false);
  
  const fgRef = useRef<any>();

  // Fetch initial data
  const fetchData = async () => {
    // Fetch posts
    const { data: postsData } = await supabase.from('tg_posts').select('*');
    // Fetch links
    const { data: linksData } = await supabase.from('tg_links').select('*');

    const newNodes: Node[] = [];
    const newLinks: Link[] = [];

    // Temporary map to track tags (targets) that aren't posts themselves
    const tagsMap = new Set<string>();

    if (postsData) {
      postsData.forEach(post => {
        const idStr = post.post_id.toString();
        const isHome = idStr === '35';
        const textLower = (post.text || '').toLowerCase();
        const isMoc = !isHome && (textLower.includes('#moc') || (post.tags && post.tags.some((t: string) => t.toLowerCase() === '#moc')));
        
        let group = 1;
        if (isHome) group = 3;
        else if (isMoc) group = 4;

        newNodes.push({
          id: idStr,
          name: isHome ? 'HOME' : getFirstSentence(post.text, lang),
          text: post.text,
          link: post.link,
          group: group,
          val: isHome ? 12 : (isMoc ? 8 : 5)
        });
      });
    }

    if (linksData) {
      linksData.forEach(link => {
        // Source is always a post
        // Target is either a hashtag or another post
        newLinks.push({
          source: link.source,
          target: link.target
        });

        if (link.type === 'hashtag') {
          tagsMap.add(link.target);
        }
      });
    }

    // Add nodes for tags
    tagsMap.forEach(tag => {
      // Only add tag node if it wasn't already added as a post node (in case hashtag = post_id somehow)
      if (!newNodes.some(n => n.id === tag)) {
        newNodes.push({
          id: tag,
          name: tag,
          group: 2,
          val: 3 // Default size for tags
        });
      }
    });

    // Safeguard: Ensure links only point to existing nodes to prevent force-graph crashes
    const validNodeIds = new Set(newNodes.map(n => n.id));
    const safeLinks = newLinks.filter(l => validNodeIds.has(l.source) && validNodeIds.has(l.target));

    // Calculate node sizes based on connections (degree)
    const degreeMap = new Map<string, number>();
    safeLinks.forEach(l => {
      degreeMap.set(l.source, (degreeMap.get(l.source) || 0) + 1);
      degreeMap.set(l.target, (degreeMap.get(l.target) || 0) + 1);
    });

    newNodes.forEach(node => {
      const connections = degreeMap.get(node.id) || 0;
      // Base size + bonus for connections
      if (node.group === 3) node.val = 12 + connections * 0.5; // HOME
      else if (node.group === 4) node.val = 8 + connections * 0.5; // MOC
      else if (node.group === 1) node.val = 5 + connections * 0.5; // Normal post
      else node.val = 3 + connections * 1.5; // Tag
    });

    setData({ nodes: newNodes, links: safeLinks });
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Subscribe to realtime updates
    const channel = supabase.channel('brain_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tg_posts' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tg_links' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      // In TMA mode, we want full viewport
      const w = window.innerWidth;
      const h = isTma ? window.innerHeight : Math.min(800, window.innerHeight * 0.8);
      setWindowSize({ width: w, height: h });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isTma]);

  // Apply physics settings
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge')?.strength(charge);
      fgRef.current.d3Force('link')?.distance(linkDist);
      fgRef.current.d3ReheatSimulation?.();
    }
  }, [charge, linkDist, data]);

  // Calculate derived data based on filters
  const displayData = useMemo(() => {
    let filteredNodes = data.nodes;
    let filteredLinks = data.links;

    if (!showTags) {
      filteredNodes = filteredNodes.filter(n => n.group !== 2); // Hide group 2 (tags)
      const validNodeIds = new Set(filteredNodes.map(n => n.id));
      filteredLinks = filteredLinks.filter(l => 
        validNodeIds.has(typeof l.source === 'object' ? (l.source as any).id : l.source) && 
        validNodeIds.has(typeof l.target === 'object' ? (l.target as any).id : l.target)
      );
    }

    return { nodes: filteredNodes, links: filteredLinks };
  }, [data, showTags]);

  // Styling for nodes
  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const safeName = node.name || '';
    const label = (node.group === 1 || node.group === 3 || node.group === 4) ? (safeName.length > 25 ? safeName.substring(0, 25) + '...' : safeName) : safeName;
    const fontSize = 14/globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    
    // Draw Node
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
    
    let color = tagColor;
    if (node.group === 1) color = postColor;
    else if (node.group === 3) color = homeColor;
    else if (node.group === 4) color = mocColor;

    ctx.fillStyle = color;
    ctx.fill();

    // Node glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 * globalScale;

    // Draw Label if zoomed in enough or if it's a big tag/post
    if (globalScale > 1.5 || node.val > 6) {
      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText(label, node.x, node.y + node.val + (8/globalScale));
    }
  }, [postColor, tagColor, homeColor, mocColor]);

  // Handle click on node
  const handleNodeClick = useCallback((node: any) => {
    if ([1, 3, 4].includes(node.group) && node.link) {
      // If it's TMA, use Telegram WebApp API to open link inside Telegram
      if (isTma && typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
        (window as any).Telegram.WebApp.openTelegramLink(node.link);
      } else {
        // On regular site, open in new tab
        window.open(node.link, '_blank');
      }
    } else {
      // Center on tag node
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(3, 2000);
    }
  }, [isTma]);

  return (
    <div style={{ width: '100%', height: isTma ? '100vh' : windowSize.height, background: '#0b0e14', position: 'relative', overflow: 'hidden', borderRadius: isTma ? '0' : '12px', border: isTma ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
      {/* Help Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.5)', padding: '10px 16px', borderRadius: '8px', backdropFilter: 'blur(4px)', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: '0', fontSize: '16px', color: 'rgba(255,255,255,0.9)' }}>Brain Gamedesign</h3>
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0 0 0 10px' }}
          >
            {showSettings ? '✕' : '⚙️'}
          </button>
        </div>
        
        {!showSettings && (
          <>
            <p style={{ margin: 0, fontSize: '13px' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: postColor, marginRight: 6 }}></span> Посты
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: tagColor, margin: '0 6px 0 12px' }}></span> Теги
            </p>
            <p style={{ margin: '0', fontSize: '12px', opacity: 0.7 }}>Скролл - зум, клик - открыть пост</p>
          </>
        )}

        {showSettings && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{lang === 'ru' ? 'Сила отталкивания нод' : 'Node repulsion force'}: {charge}</label>
              <input type="range" min="-2000" max="0" value={charge} onChange={(e) => setCharge(Number(e.target.value))} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{lang === 'ru' ? 'Длина связей' : 'Link distance'}: {linkDist}</label>
              <input type="range" min="10" max="1000" value={linkDist} onChange={(e) => setLinkDist(Number(e.target.value))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{lang === 'ru' ? 'Цвет постов' : 'Posts color'}</label>
              <input type="color" value={postColor} onChange={(e) => setPostColor(e.target.value)} style={{ border: 'none', width: '24px', height: '24px', padding: 0, background: 'none', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{lang === 'ru' ? 'Цвет тегов' : 'Tags color'}</label>
              <input type="color" value={tagColor} onChange={(e) => setTagColor(e.target.value)} style={{ border: 'none', width: '24px', height: '24px', padding: 0, background: 'none', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{lang === 'ru' ? 'Цвет HOME' : 'HOME color'}</label>
              <input type="color" value={homeColor} onChange={(e) => setHomeColor(e.target.value)} style={{ border: 'none', width: '24px', height: '24px', padding: 0, background: 'none', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{lang === 'ru' ? 'Цвет MOC' : 'MOC color'}</label>
              <input type="color" value={mocColor} onChange={(e) => setMocColor(e.target.value)} style={{ border: 'none', width: '24px', height: '24px', padding: 0, background: 'none', cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="showTagsToggle" checked={showTags} onChange={(e) => setShowTags(e.target.checked)} />
              <label htmlFor="showTagsToggle" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
                {lang === 'ru' ? 'Показывать хештеги' : 'Show hashtags'}
              </label>
            </div>
          </div>
        )}
      </div>

      <ForceGraph2D
        ref={fgRef}
        graphData={displayData}
        width={windowSize.width}
        height={windowSize.height}
        backgroundColor="#0b0e14"
        nodeCanvasObject={nodeCanvasObject}
        nodeRelSize={1}
        linkColor={() => 'rgba(255, 255, 255, 0.15)'}
        linkWidth={1}
        onNodeClick={handleNodeClick}
        d3VelocityDecay={0.3} // smooth physics
        nodeLabel={(node: any) => {
          const safeName = node.name || '';
          if ([1, 3, 4].includes(node.group)) {
            let color = postColor;
            if (node.group === 3) color = homeColor;
            if (node.group === 4) color = mocColor;

            let preview = node.text ? (node.text.length > 200 ? node.text.substring(0, 200) + '...' : node.text) : '';
            // Remove the first sentence from the preview to avoid duplication
            if (preview.startsWith(safeName) && safeName !== 'Пост без текста' && safeName !== 'Post without text') {
              preview = preview.substring(safeName.length).trim();
            }
            return `<div style="max-width: 260px; background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; font-family: sans-serif; color: rgba(255,255,255,0.9); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              <div style="font-weight: bold; margin-bottom: 6px; color: ${color}; line-height: 1.3;">${safeName}</div>
              ${preview ? `<div style="font-size: 13px; line-height: 1.4; white-space: pre-wrap; opacity: 0.8;">${preview}</div>` : ''}
            </div>`;
          }
          return `<div style="background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.1); padding: 6px 10px; border-radius: 6px; font-family: sans-serif; color: ${tagColor}; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">${safeName}</div>`;
        }}
      />
    </div>
  );
}