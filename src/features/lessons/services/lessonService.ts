const API = 'http://localhost:3001/api';

const getHeaders = (isMultipart = false) => {
    const headers: any = {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    };
    if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
};

export const lessonService = {
    generateLesson: async (formData: FormData): Promise<any> => {
        const res = await fetch(`${API}/lessons/generate`, {
            method: 'POST',
            headers: getHeaders(true),
            body: formData
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to generate lesson');
        return data.data;
    }
};
