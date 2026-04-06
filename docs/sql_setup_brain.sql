-- 1. Создаем таблицу для постов (заметок)
CREATE TABLE tg_posts (
    post_id BIGINT PRIMARY KEY,     -- ID сообщения в Telegram (например, 42)
    text TEXT,                      -- Текст поста (для превью)
    link TEXT,                      -- Прямая ссылка на пост (https://t.me/Brain_Gamedesign/42)
    date TIMESTAMP WITH TIME ZONE,  -- Дата публикации
    tags TEXT[] DEFAULT '{}'        -- Массив хештегов (например, ['#LevelDesign', '#UX'])
);

-- 2. Создаем таблицу для связей (ребер графа)
CREATE TABLE tg_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,           -- ID поста (как строка)
    target TEXT NOT NULL,           -- Целевой ID поста или хештег (строка)
    type TEXT NOT NULL              -- Тип связи: 'hashtag' (к тегу) или 'backlink' (к другому посту)
);

-- 3. Включаем Realtime (чтобы граф обновлялся на сайте моментально)
ALTER PUBLICATION supabase_realtime ADD TABLE tg_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE tg_links;

-- 4. Настраиваем правила безопасности (RLS) для публичного чтения
-- (Писать в эти таблицы будет только наш бот через секретный Service Key, поэтому INSERT для public мы не открываем)
ALTER TABLE tg_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tg_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select from tg_posts" ON tg_posts FOR SELECT TO public USING (true);
CREATE POLICY "Allow public select from tg_links" ON tg_links FOR SELECT TO public USING (true);
