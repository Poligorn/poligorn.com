/**
 * Генерирует URL изображения обложки для проекта на Itch.io
 * Формат: https://[username].itch.io/[game-slug]/image/[size]
 */
export function getItchImageUrl(slug: string, username: string = 'tea-agency', size: string = '347x500'): string {
	return `https://${username}.itch.io/${slug}/image/${size}`;
}

/**
 * Альтернативный формат через img.itch.zone (если известен ID изображения)
 */
export function getItchZoneImageUrl(imageId: string, size: string = '347x500'): string {
	return `https://img.itch.zone/aW1hZ2Uv${imageId}/${size}/cover.png`;
}
