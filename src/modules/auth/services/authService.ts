/**
 * Auth Service — KidFit Frontend
 * ===============================
 * Quản lý xác thực: login, register, logout, refresh token, forgot/reset password
 * 
 * Bảo mật:
 *  - Access token (15 phút) lưu trong memory (biến JS)
 *  - Refresh token (7 ngày) lưu trong localStorage (cần refresh khi hết access token)
 *  - Tự động refresh access token khi hết hạn
 *  - Logout: gọi API + xóa tất cả tokens
 */
import { API_BASE_URL } from '@/shared/services/api';

const API = `${API_BASE_URL}/api`;

// ─── Token Management ─────────────────────────────────────────────────────────
// Access token lưu trong memory (không persist qua reload → an toàn hơn localStorage)
let accessToken: string | null = null;

export const authService = {
    // ─── Getters ───
    getAccessToken: (): string | null => {
        // Fallback: check localStorage nếu memory trống (backward compat với code cũ)
        return accessToken || localStorage.getItem('token');
    },

    getRefreshToken: (): string | null => {
        return localStorage.getItem('refreshToken');
    },

    getUser: (): any => {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
    },

    isLoggedIn: (): boolean => {
        return !!(authService.getAccessToken() || authService.getRefreshToken());
    },

    // ─── Setters (private-like) ───
    _setTokens: (tokens: { accessToken: string; refreshToken: string }) => {
        accessToken = tokens.accessToken;
        localStorage.setItem('token', tokens.accessToken);       // Backward compat
        localStorage.setItem('refreshToken', tokens.refreshToken);
    },

    _setUser: (user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
    },

    _clearAll: () => {
        accessToken = null;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    // ─── Login ───
    login: async (identifier: string, password: string) => {
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });

        const data = await res.json();

        if (data.success) {
            authService._setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            authService._setUser(data.user);
        }

        return data;
    },

    // ─── Register ───
    register: async (formData: {
        username: string;
        email: string;
        password: string;
        parentName: string;
        childName: string;
        childAge: number;
        phone?: string;
    }) => {
        const res = await fetch(`${API}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success) {
            authService._setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            authService._setUser(data.user);
        }

        return { response: res, data };
    },

    // ─── Logout ───
    logout: async () => {
        try {
            const token = authService.getAccessToken();
            const refreshToken = authService.getRefreshToken();

            if (token) {
                await fetch(`${API}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ refreshToken }),
                });
            }
        } catch (err) {
            console.error('Logout API error:', err);
        } finally {
            authService._clearAll();
        }
    },

    // ─── Refresh Access Token ───
    refreshAccessToken: async (): Promise<boolean> => {
        const refreshToken = authService.getRefreshToken();
        if (!refreshToken) return false;

        try {
            const res = await fetch(`${API}/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await res.json();

            if (data.success) {
                authService._setTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                });
                return true;
            } else {
                // Refresh token invalid/expired → force logout
                authService._clearAll();
                return false;
            }
        } catch (err) {
            console.error('Refresh token error:', err);
            authService._clearAll();
            return false;
        }
    },

    // ─── Forgot Password ───
    forgotPassword: async (email: string) => {
        const res = await fetch(`${API}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return res.json();
    },

    // ─── Reset Password ───
    resetPassword: async (email: string, otp: string, password: string) => {
        const res = await fetch(`${API}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, password }),
        });
        return res.json();
    },

    // ─── Change Password ───
    changePassword: async (currentPassword: string, newPassword: string, confirmNewPassword: string) => {
        const token = authService.getAccessToken();
        const res = await fetch(`${API}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
        });
        return res.json();
    },

    // ─── Get Current User ───
    getMe: async () => {
        const token = authService.getAccessToken();
        const res = await fetch(`${API}/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return res.json();
    },

    // ─── Verify Email ───
    verifyEmail: async (email: string, otp: string) => {
        const res = await fetch(`${API}/verify-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });
        return res.json();
    },
};

// ─── Authenticated Fetch Wrapper ──────────────────────────────────────────────
/**
 * fetch wrapper tự động gắn token và retry khi 401
 * Sử dụng thay thế cho fetch() trực tiếp trong mọi API call cần xác thực
 */
export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = authService.getAccessToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    let res = await fetch(url, { ...options, headers });

    // Nếu 401 (token hết hạn), thử refresh
    if (res.status === 401) {
        const refreshed = await authService.refreshAccessToken();
        if (refreshed) {
            const newToken = authService.getAccessToken();
            const retryHeaders = {
                ...headers,
                'Authorization': `Bearer ${newToken}`,
            };
            res = await fetch(url, { ...options, headers: retryHeaders });
        } else {
            // Refresh failed → redirect to login
            authService._clearAll();
            window.location.href = '/login';
        }
    }

    return res;
};
