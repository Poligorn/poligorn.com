import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Настройки
// Используем системную переменную
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
// Используем предоставленный вручную ключ
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0YnlsYW5zbm1kdmV4a2xtcGJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMzMTkyOSwiZXhwIjoyMDkwOTA3OTI5fQ.nLmLoK9cOl4wmeDPTAM9L0B567M0EfkpH7M4zdW6ZgI';

// Создаем клиент Supabase
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Функция для извлечения хештегов
function extractHashtags(text: string): string[] {
    const matches = text.match(/#[a-zA-Zа-яА-Я0-9_]+/g);
    if (!matches) return [];
    return matches.map(tag => tag.toLowerCase());
}

// Функция для извлечения прямых ссылок (Backlinks) на другие посты в этом же канале
function extractBacklinks(text: string, channelUsername: string, entities?: any[]): string[] {
    if (!channelUsername) return [];
    
    const backlinks = new Set<string>();
    
    // 1. Ищем ссылки в явном тексте
    const regex = new RegExp(`t\\.me/${channelUsername}/(\\d+)`, 'gi');
    const matches = [...text.matchAll(regex)];
    matches.forEach(m => backlinks.add(m[1]));
    
    // 2. Ищем ссылки в форматировании (entities)
    if (entities && Array.isArray(entities)) {
        entities.forEach(entity => {
            if (entity.type === 'text_link' && entity.url) {
                const urlMatch = entity.url.match(new RegExp(`t\\.me/${channelUsername}/(\\d+)`, 'i'));
                if (urlMatch) {
                    backlinks.add(urlMatch[1]);
                }
            }
        });
    }
    
    return Array.from(backlinks);
}

// Главная функция-обработчик вебхука
serve(async (req) => {
    // Обработка CORS preflight запросов
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const body = await req.json();

        const post = body.channel_post || body.edited_channel_post;

        if (!post) {
            return new Response(JSON.stringify({ status: 'ignored', reason: 'not a channel post' }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const text = post.text || post.caption || '';
        
        if (!text) {
            return new Response(JSON.stringify({ status: 'ignored', reason: 'empty text' }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const postId = post.message_id;
        const channelUsername = post.chat.username;
        const date = new Date(post.date * 1000).toISOString();
        const postLink = channelUsername ? `https://t.me/${channelUsername}/${postId}` : '';

        const entities = post.entities || post.caption_entities || [];
        const hashtags = extractHashtags(text);
        const backlinks = extractBacklinks(text, channelUsername, entities);

        // 1. Сохраняем пост
        const { error: postError } = await supabase
            .from('tg_posts')
            .upsert({
                post_id: postId,
                text: text.substring(0, 500) + (text.length > 500 ? '...' : ''),
                link: postLink,
                date: date,
                tags: hashtags
            });

        if (postError) throw postError;

        // 2. Создаем связи
        await supabase
            .from('tg_links')
            .delete()
            .eq('source', postId.toString());

        const linksToInsert = [];
        
        if (hashtags.length > 0) {
            hashtags.forEach(tag => {
                linksToInsert.push({
                    source: postId.toString(),
                    target: tag,
                    type: 'hashtag'
                });
            });
        }
        
        if (backlinks.length > 0) {
            backlinks.forEach(targetId => {
                linksToInsert.push({
                    source: postId.toString(),
                    target: targetId,
                    type: 'backlink'
                });
            });
        }

        if (linksToInsert.length > 0) {
            const { error: linkError } = await supabase
                .from('tg_links')
                .insert(linksToInsert);

            if (linkError) console.error('Error saving links:', linkError);
        }

        return new Response(JSON.stringify({ status: 'success', post_id: postId }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } catch (error) {
        console.error('Webhook error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
});