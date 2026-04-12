import React from 'react';
import ARExplorer from '../features/ar/components/ARExplorer';

/**
 * AIARExplorerTab — "Drawing Explorer 3D"
 *
 * Dashboard tab wrapper following the same card layout as AIStoryboardTab.
 * Uses KidFit Pro's primary green (#4cae4f) throughout.
 */
export default function AIARExplorerTab() {
    return (
        <div className="space-y-6">

            {/* ── Header card ─────────────────────────────────────────── */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 shrink-0"
                        style={{ background: 'linear-gradient(135deg, #4cae4f, #81c784)' }}
                    >
                        <span className="material-symbols-outlined text-white text-[28px]">view_in_ar</span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-slate-800 mb-1">
                            Drawing Explorer 3D — Khám phá qua nét vẽ ✏️
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Tải lên bức vẽ của trẻ — AI sẽ nhận diện, chấm điểm và dựng mô hình 3D ngay lập tức!
                            Trẻ học vẽ tốt hơn khi thấy bức vẽ của mình đặt cạnh vật thật trong không gian 3D.
                        </p>

                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {[
                                { icon: 'psychology',  label: 'Gemini Vision AI',       col: 'bg-green-50 text-primary border-green-200' },
                                { icon: 'view_in_ar', label: 'Mô hình 3D tương tác',   col: 'bg-green-50 text-primary border-green-200' },
                                { icon: 'rate_review',label: 'Nhận xét chi tiết',       col: 'bg-amber-50 text-amber-700 border-amber-200' },
                                { icon: 'translate',  label: 'Tiếng Việt thân thiện',   col: 'bg-sky-50 text-sky-700 border-sky-200' },
                            ].map(t => (
                                <span key={t.label}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${t.col}`}>
                                    <span className="material-symbols-outlined text-[14px]">{t.icon}</span>
                                    {t.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How it works — 3 steps */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { n: '1', em: '✏️', title: 'Vẽ bức tranh',       desc: 'Vẽ con vật hoặc vật gì bạn thích' },
                        { n: '2', em: '📸', title: 'Tải ảnh lên',        desc: 'Chụp hoặc chọn ảnh bức vẽ' },
                        { n: '3', em: '🎉', title: 'Xem 3D + nhận xét',  desc: 'AI chấm điểm & dựng mô hình 3D' },
                    ].map(s => (
                        <div key={s.n} className="flex items-center gap-3 p-3.5 rounded-2xl bg-green-50/60 border border-green-100">
                            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black text-[15px] shrink-0">
                                {s.n}
                            </div>
                            <div>
                                <p className="font-bold text-[13px] text-slate-800">{s.em} {s.title}</p>
                                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main explorer panel ─────────────────────────────────── */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <ARExplorer />
            </div>

        </div>
    );
}
