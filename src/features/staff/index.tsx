import React, { useState } from 'react';
import { useStaff } from './hooks/useStaff';
import { StaffStats } from './components/StaffStats';
import { StaffTable } from './components/StaffTable';
import { StaffForm } from './components/StaffForm';
import { Staff } from './types';

export const StaffManagement: React.FC = () => {
    const { staffList, isLoading, addStaff, updateStaff, deleteStaff } = useStaff();
    const [showForm, setShowForm] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | undefined>();

    const handleCreate = () => {
        setEditingStaff(undefined);
        setShowForm(true);
    };

    const handleEdit = (staff: Staff) => {
        setEditingStaff(staff);
        setShowForm(true);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-4xl text-primary">groups</span>
                        Quản lý Nhân sự
                    </h2>
                    <p className="text-slate-400 text-sm font-semibold mt-1">Hệ thống quản lý thông tin cán bộ, giáo viên và nhân viên trường.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 font-black text-xs uppercase tracking-widest py-3 px-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                        <span className="material-symbols-outlined text-lg">file_download</span>
                        Xuất báo cáo
                    </button>
                    <button
                        onClick={handleCreate}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-lg">person_add</span>
                        Thêm mới cán bộ
                    </button>
                </div>
            </div>

            <StaffStats staff={staffList} />

            <StaffTable
                staff={staffList}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={deleteStaff}
            />

            {showForm && (
                <StaffForm
                    onClose={() => setShowForm(false)}
                    initialData={editingStaff}
                    onSubmit={editingStaff ? updateStaff : addStaff}
                />
            )}
        </div>
    );
};

export * from './types';
export * from './hooks/useStaff';
export * from './services/staffService';
