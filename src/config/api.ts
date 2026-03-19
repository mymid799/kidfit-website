/**
 * Central API configuration
 * Usage: import { API_BASE_URL } from '@/config/api';
 */

// If deployed on the same domain, leave as empty string or '/api'
// If backend is on a separate domain (e.g. Cloudflare Tunnel), use VITE_API_URL
const viteApiUrl = import.meta.env.VITE_API_URL || '';

// If development mode and using Vite proxy, we might want to keep it empty or starting with /api
export const API_BASE_URL = viteApiUrl;

/**
 * Helper to get the full image/asset URL from relative paths stored in DB
 * e.g. /uploads/gallery/img-123.jpg -> https://api.com/uploads/gallery/img-123.jpg
 */
export const getAssetUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // Remove the leading slash if it exists and prefix with the base URL
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // In dev, the proxy handles /uploads, so we can keep it relative if API_BASE_URL is empty
    if (!API_BASE_URL) return cleanPath;
    
    // In prod, if API_BASE_URL is set (including the /api suffix), 
    // we need to remove /api to get to /uploads, or just use the base domain
    const baseDomain = API_BASE_URL.replace(/\/api$/, '');
    return `${baseDomain}${cleanPath}`;
};
