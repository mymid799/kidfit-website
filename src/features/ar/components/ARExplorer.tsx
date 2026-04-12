import React, { useRef, useState, useCallback, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAR } from '../hooks/useAR';
import type { ARMultiResult, ARModelItem, SubjectSuggestion, SubjectGroup } from '../types';

// ─── SUBJECT GROUPS (mirrors arRoutes.ts SUBJECT_GROUPS) ────────────────────
// Grouped by category so kids can find subjects more easily.
const SUBJECT_GROUPS: SubjectGroup[] = [
    {
        group: 'Thú cưng & Gia súc', emoji: '🐾',
        subjects: [
            { id: 'cat', nameVi: 'Mèo', emoji: '🐱' },
            { id: 'kitten', nameVi: 'Mèo con', emoji: '🐈' },
            { id: 'dog', nameVi: 'Chó', emoji: '🐶' },
            { id: 'puppy', nameVi: 'Chó con', emoji: '🐕' },
            { id: 'beagle', nameVi: 'Beagle', emoji: '🦴' },
            { id: 'poodle', nameVi: 'Poodle', emoji: '🎀' },
            { id: 'husky', nameVi: 'Husky', emoji: '🐺' },
            { id: 'rabbit', nameVi: 'Thỏ', emoji: '🐰' },
            { id: 'cow', nameVi: 'Bò', emoji: '🐮' },
            { id: 'horse', nameVi: 'Ngựa', emoji: '🐴' },
            { id: 'pig', nameVi: 'Lợn', emoji: '🐷' },
            { id: 'sheep', nameVi: 'Cừu', emoji: '🐑' },
            { id: 'goat', nameVi: 'Dê', emoji: '🐐' },
            { id: 'chicken', nameVi: 'Gà', emoji: '🐓' },
            { id: 'chick', nameVi: 'Gà con', emoji: '🐤' },
            { id: 'duck', nameVi: 'Vịt', emoji: '🦆' },
        ],
    },
    {
        group: 'Động vật hoang dã', emoji: '🦁',
        subjects: [
            { id: 'elephant', nameVi: 'Voi', emoji: '🐘' },
            { id: 'giraffe', nameVi: 'Hươu cao cổ', emoji: '🦒' },
            { id: 'hippopotamus', nameVi: 'Hà mã', emoji: '🦛' },
            { id: 'rhinoceros', nameVi: 'Tê giác', emoji: '🦏' },
            { id: 'bear', nameVi: 'Gấu đen', emoji: '🐻' },
            { id: 'panda', nameVi: 'Gấu trúc', emoji: '🐼' },
            { id: 'tiger', nameVi: 'Hổ', emoji: '🐯' },
            { id: 'jaguar', nameVi: 'Báo đốm', emoji: '🐆' },
            { id: 'cheetah', nameVi: 'Báo săn', emoji: '🐆' },
            { id: 'fox', nameVi: 'Cáo', emoji: '🦊' },
            { id: 'wolf', nameVi: 'Sói', emoji: '🐺' },
            { id: 'deer', nameVi: 'Nai', emoji: '🦌' },
            { id: 'zebra', nameVi: 'Ngựa vằn', emoji: '🦓' },
            { id: 'bison', nameVi: 'Bò rừng', emoji: '🦬' },
            { id: 'monkey', nameVi: 'Khỉ', emoji: '🐒' },
            { id: 'gorilla', nameVi: 'Khỉ đột', emoji: '🦍' },
            { id: 'alpaca', nameVi: 'Lạc đà con', emoji: '🦙' },
            { id: 'unicorn', nameVi: 'Kỳ lân', emoji: '🦄' },
        ],
    },
    {
        group: 'Chim', emoji: '🐦',
        subjects: [
            { id: 'bird', nameVi: 'Chim', emoji: '🐦' },
            { id: 'sparrow', nameVi: 'Chim sẻ', emoji: '🐦' },
            { id: 'parrot', nameVi: 'Vẹt', emoji: '🦜' },
            { id: 'owl', nameVi: 'Cú mèo', emoji: '🦉' },
            { id: 'hawk', nameVi: 'Diều hâu', emoji: '🦅' },
            { id: 'raven', nameVi: 'Quạ', emoji: '🐦' },
            { id: 'flamingo', nameVi: 'Hồng hạc', emoji: '🦩' },
            { id: 'ostrich', nameVi: 'Đà điểu', emoji: '🦚' },
            { id: 'penguin', nameVi: 'Chim cánh cụt', emoji: '🐧' },
            { id: 'duck', nameVi: 'Vịt', emoji: '🦆' },
            { id: 'goose', nameVi: 'Ngỗng', emoji: '🪿' },
            { id: 'hen', nameVi: 'Gà mái', emoji: '🐔' },
            { id: 'rooster', nameVi: 'Gà trống', emoji: '🐓' },
            { id: 'seagull', nameVi: 'Mòng biển', emoji: '🐦' },
        ],
    },
    {
        group: 'Bò sát, Ếch & Khủng long', emoji: '🦕',
        subjects: [
            { id: 'frog', nameVi: 'Ếch', emoji: '🐸' },
            { id: 'turtle', nameVi: 'Rùa', emoji: '🐢' },
            { id: 'snake', nameVi: 'Rắn', emoji: '🐍' },
            { id: 'cobra', nameVi: 'Rắn hổ mang', emoji: '🐍' },
            { id: 'dragon', nameVi: 'Rồng', emoji: '🐉' },
            { id: 'dinosaur', nameVi: 'Khủng long', emoji: '🦕' },
            { id: 'stegosaurus', nameVi: 'Stegosaurus', emoji: '🦕' },
            { id: 'velociraptor', nameVi: 'Velociraptor', emoji: '🦖' },
            { id: 'parasaurolophus', nameVi: 'Parasauro.', emoji: '🦕' },
        ],
    },
    {
        group: 'Sinh vật biển', emoji: '🌊',
        subjects: [
            { id: 'fish', nameVi: 'Cá', emoji: '🐟' },
            { id: 'clownfish', nameVi: 'Cá hề', emoji: '🐠' },
            { id: 'shark', nameVi: 'Cá mập', emoji: '🦈' },
            { id: 'dolphin', nameVi: 'Cá heo', emoji: '🐬' },
            { id: 'whale', nameVi: 'Cá voi', emoji: '🐳' },
            { id: 'killerwhale', nameVi: 'Cá voi ôc a', emoji: '🐋' },
            { id: 'narwhal', nameVi: 'Cá kỳ lân', emoji: '🐳' },
            { id: 'seahorse', nameVi: 'Cá ngựa', emoji: '🐠' },
            { id: 'sealion', nameVi: 'Sư tử biển', emoji: '🦭' },
            { id: 'jellyfish', nameVi: 'Sứa', emoji: '🪼' },
            { id: 'octopus', nameVi: 'Bạch tuộc', emoji: '🐙' },
            { id: 'squid', nameVi: 'Mực ống', emoji: '🦑' },
            { id: 'crab', nameVi: 'Cua', emoji: '🦀' },
            { id: 'crayfish', nameVi: 'Tôm hùm', emoji: '🦞' },
            { id: 'eel', nameVi: 'Lươn', emoji: '🐍' },
            { id: 'manta', nameVi: 'Cá đuối', emoji: '🐟' },
        ],
    },
    {
        group: 'Côn trùng', emoji: '🐛',
        subjects: [
            { id: 'butterfly', nameVi: 'Bướm', emoji: '🦋' },
            { id: 'dragonfly', nameVi: 'Chuồn chuồn', emoji: '🪲' },
            { id: 'bee', nameVi: 'Ong', emoji: '🐝' },
            { id: 'ant', nameVi: 'Kiến', emoji: '🐜' },
            { id: 'grasshopper', nameVi: 'Châu chấu', emoji: '🦗' },
            { id: 'ladybug', nameVi: 'Bọ rùa', emoji: '🐞' },
            { id: 'snail', nameVi: 'Ốc sên', emoji: '🐌' },
            { id: 'scorpion', nameVi: 'Bọ cạp', emoji: '🦂' },
        ],
    },
    {
        group: 'Cây cối & Thiên nhiên', emoji: '🌿',
        subjects: [
            { id: 'tree', nameVi: 'Cây', emoji: '🌳' },
            { id: 'bamboo', nameVi: 'Tre', emoji: '🎋' },
            { id: 'flower', nameVi: 'Hoa', emoji: '🌸' },
            { id: 'avocado', nameVi: 'Bơ', emoji: '🥑' },
            { id: 'volcano', nameVi: 'Núi lửa', emoji: '🌋' },
            { id: 'island', nameVi: 'Đảo', emoji: '🏝️' },
            { id: 'sandcastle', nameVi: 'Lâu cát', emoji: '🏖️' },
            { id: 'snowman', nameVi: 'Người tuyết', emoji: '☃️' },
        ],
    },
    {
        group: 'Vũ trụ & Khoa học', emoji: '🚀',
        subjects: [
            { id: 'earth', nameVi: 'Trái Đất', emoji: '🌍' },
            { id: 'moon', nameVi: 'Mặt Trăng', emoji: '🌕' },
            { id: 'star', nameVi: 'Ngôi sao', emoji: '⭐' },
            { id: 'satellite', nameVi: 'Vệ tinh', emoji: '🛸' },
            { id: 'flyingsaucer', nameVi: 'Đĩa bay UFO', emoji: '🛸' },
            { id: 'rocketship', nameVi: 'Tên lửa', emoji: '🚀' },
            { id: 'spaceshuttle', nameVi: 'Tàu con thoi', emoji: '🚀' },
            { id: 'astronaut', nameVi: 'Phi hành gia', emoji: '👨‍🚀' },
            { id: 'robot', nameVi: 'Robot', emoji: '🤖' },
        ],
    },
    {
        group: 'Phương tiện', emoji: '🚗',
        subjects: [
            { id: 'car', nameVi: 'Xe hơi', emoji: '🚗' },
            { id: 'bus', nameVi: 'Xe buýt', emoji: '🚌' },
            { id: 'train', nameVi: 'Tàu hỏa', emoji: '🚂' },
            { id: 'motorcycle', nameVi: 'Xe máy', emoji: '🏍️' },
            { id: 'bicycle', nameVi: 'Xe đạp', emoji: '🚲' },
            { id: 'boat', nameVi: 'Thuyền buồm', emoji: '⛵' },
            { id: 'airplane', nameVi: 'Máy bay', emoji: '✈️' },
            { id: 'helicopter', nameVi: 'Trực thăng', emoji: '🚁' },
            { id: 'ambulance', nameVi: 'Xe cứu thương', emoji: '🚑' },
            { id: 'policecar', nameVi: 'Xe cảnh sát', emoji: '🚓' },
            { id: 'paperairplane', nameVi: 'Máy bay giấy', emoji: '🛩️' },
        ],
    },
    {
        group: 'Ăn uống & Hoa quả', emoji: '🍕',
        subjects: [
            { id: 'pizza', nameVi: 'Pizza', emoji: '🍕' },
            { id: 'watermelon', nameVi: 'Dưa hấu', emoji: '🍉' },
            { id: 'banana', nameVi: 'Chuối', emoji: '🍌' },
            { id: 'lollipop', nameVi: 'Kẹo mút', emoji: '🍭' },
            { id: 'icecream', nameVi: 'Kem ốc quế', emoji: '🍦' },
            { id: 'popsicle', nameVi: 'Kem que', emoji: '🍡' },
        ],
    },
    {
        group: 'Thời tiết', emoji: '🌈',
        subjects: [
            { id: 'rainbow', nameVi: 'Cầu vồng', emoji: '🌈' },
            { id: 'cloud', nameVi: 'Đám mây', emoji: '☁️' },
            { id: 'lightning', nameVi: 'Tia sét', emoji: '⚡' },
            { id: 'snowman', nameVi: 'Người tuyết', emoji: '☃️' },
            { id: 'volcano', nameVi: 'Núi lửa', emoji: '🌋' },
        ],
    },
    {
        group: 'Trường học & Nghệ thuật', emoji: '📚',
        subjects: [
            { id: 'pencil', nameVi: 'Bút chì', emoji: '✏️' },
            { id: 'pen', nameVi: 'Bút mực', emoji: '🖊️' },
            { id: 'backpack', nameVi: 'Ba lô', emoji: '🎒' },
            { id: 'schooldesk', nameVi: 'Bàn học', emoji: '🪑' },
            { id: 'paintkit', nameVi: 'Hộp màu', emoji: '🎨' },
            { id: 'books', nameVi: 'Sách', emoji: '📚' },
            { id: 'blackboard', nameVi: 'Bảng đen', emoji: '🖥️' },
        ],
    },
    {
        group: 'Nhân vật', emoji: '👨‍⚕️',
        subjects: [
            { id: 'doctor', nameVi: 'Bác sĩ', emoji: '👨‍⚕️' },
            { id: 'teacher', nameVi: 'Giáo viên', emoji: '👨‍🏫' },
            { id: 'pirate', nameVi: 'Hải tặc', emoji: '🏴‍☠️' },
            { id: 'astronaut', nameVi: 'Phi hành gia', emoji: '👨‍🚀' },
        ],
    },
    {
        group: 'Đồ vật & Công nghệ', emoji: '🎧',
        subjects: [
            { id: 'headphones', nameVi: 'Tai nghe', emoji: '🎧' },
            { id: 'phone', nameVi: 'Điện thoại', emoji: '📱' },
            { id: 'tv', nameVi: 'Tivi', emoji: '📺' },
            { id: 'piano', nameVi: 'Đàn piano', emoji: '🎹' },
            { id: 'ferriswheel', nameVi: 'Vòng quay', emoji: '🎡' },
            { id: 'camera', nameVi: 'Máy ảnh', emoji: '📷' },
            { id: 'laptop', nameVi: 'Máy tính', emoji: '💻' },
            { id: 'stethoscope', nameVi: 'Ống nghe', emoji: '🩺' },
            { id: 'umbrella', nameVi: 'Ô dù', emoji: '☂️' },
            { id: 'teapot', nameVi: 'Ấm trà', emoji: '🫖' },
            { id: 'clock', nameVi: 'Đồng hồ', emoji: '🕐' },
            { id: 'magnifyingglass', nameVi: 'Kính lúp', emoji: '🔍' },
            { id: 'broom', nameVi: 'Cái chổi', emoji: '🧹' },
            { id: 'videogame', nameVi: 'Gamepad', emoji: '🎮' },
            { id: 'wizardhat', nameVi: 'Mũ phù thủy', emoji: '🧙' },
        ],
    },
    {
        group: 'Địa điểm & Công trình', emoji: '🏠',
        subjects: [
            { id: 'house', nameVi: 'Ngôi nhà', emoji: '🏠' },
            { id: 'castle', nameVi: 'Lâu đài', emoji: '🏰' },
            { id: 'cabin', nameVi: 'Nhà gỗ', emoji: '🛖' },
            { id: 'pagoda', nameVi: 'Chùa tháp', emoji: '🏯' },
            { id: 'island', nameVi: 'Đảo', emoji: '🏝️' },
            { id: 'sandcastle', nameVi: 'Lâu đài cát', emoji: '🏖️' },
        ],
    },
] as const satisfies SubjectGroup[];

// Flat list for suggestions fallback
const ALL_SUBJECTS_FLAT = SUBJECT_GROUPS.flatMap(g => g.subjects);


// ─── GLB MODEL: auto-center + normalize to 2 units ───────────────────────────
function GLBModel({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const groupRef = useRef<THREE.Group>(null!);

    const cloned = useMemo(() => {
        const clone = scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        clone.scale.setScalar(scale);
        clone.position.sub(center.multiplyScalar(scale));
        return clone;
    }, [scene]);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.45;
    });

    return (
        <group ref={groupRef}>
            <primitive object={cloned} />
        </group>
    );
}

// ─── DRAWING BACKGROUND: child's drawing as a large 3D backdrop ──────────────
// Placed at z = -12, well behind all models (models at z=0, camera at z≥7).
// Sized up to 22×16 units — acts as a big visible canvas backdrop so children
// can clearly see their original artwork behind the 3D models.
// For a single-model view (camera z=7) the drawing fills most of the background.
// For many models (camera further back) it's still clearly visible.
function DrawingBackground3D({ url }: { url: string }) {
    const texture = useLoader(THREE.TextureLoader, url);
    const groupRef = useRef<THREE.Group>(null!);

    const aspect = texture.image && texture.image.height > 0
        ? texture.image.width / texture.image.height
        : 4 / 3;
    const maxW = 22;
    const maxH = 16;
    const w = aspect >= maxW / maxH ? maxW : maxH * aspect;
    const h = aspect >= maxW / maxH ? maxW / aspect : maxH;

    // Gentle slow float
    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.1;
    });

    return (
        <group ref={groupRef} position={[0, 1, -12]}>
            {/* Drawing */}
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[w, h]} />
                <meshBasicMaterial map={texture} transparent opacity={0.92} />
            </mesh>
            {/* White gallery frame */}
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[w + 0.4, h + 0.4]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Soft backlight so it glows slightly */}
            <pointLight position={[0, 0, 0.5]} intensity={0.6} color="#ffffff" distance={8} />
        </group>
    );
}

// ─── LOADING RING ────────────────────────────────────────────────────────────
function LoadingRing() {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((s) => {
        if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 2.5;
    });
    return (
        <mesh ref={ref}>
            <torusGeometry args={[0.6, 0.09, 8, 40]} />
            <meshStandardMaterial color="#4cae4f" emissive="#4cae4f" emissiveIntensity={0.6} />
        </mesh>
    );
}

// ─── CAMERA CAPTURE MODAL ────────────────────────────────────────────────────
function CameraCapture({ onCapture, onClose }: { onCapture: (url: string) => void; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [ready, setReady] = useState(false);

    const start = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } },
                audio: false,
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setReady(true);
            }
        } catch {
            alert('Không thể mở camera. Vui lòng cấp quyền truy cập!');
            onClose();
        }
    }, [onClose]);

    const stop = useCallback(() => {
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null;
    }, []);

    const capture = useCallback(() => {
        const v = videoRef.current;
        if (!v || v.readyState < 2) return;
        const c = document.createElement('canvas');
        c.width = v.videoWidth;
        c.height = v.videoHeight;
        c.getContext('2d')!.drawImage(v, 0, 0);
        stop();
        onCapture(c.toDataURL('image/jpeg', 0.85));
    }, [stop, onCapture]);

    React.useEffect(() => {
        start();
        return () => stop();
    }, [start, stop]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <video ref={videoRef} playsInline muted className="flex-1 w-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-center gap-6 bg-gradient-to-t from-black/80 to-transparent">
                <button onClick={() => { stop(); onClose(); }}
                    className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
                {ready && (
                    <button onClick={capture}
                        className="w-20 h-20 rounded-full bg-white border-4 border-white/40 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-slate-800">photo_camera</span>
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ accuracy }: { accuracy: number }) {
    const stars = Math.round((accuracy / 100) * 5);
    const [label, cls] = accuracy >= 80
        ? ['Tuyệt vời! ⭐', 'text-yellow-500']
        : accuracy >= 60
            ? ['Giỏi lắm! 👏', 'text-amber-500']
            : accuracy >= 40
                ? ['Cố lên nào! 💪', 'text-orange-400']
                : ['Thử lại nhé! ✏️', 'text-orange-300'];
    return (
        <div className="flex flex-col items-end gap-0.5">
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={`text-xl leading-none ${i <= stars ? cls : 'text-slate-200'}`}>
                        {i <= stars ? '★' : '☆'}
                    </span>
                ))}
            </div>
            <span className={`text-xs font-black ${cls}`}>{label}</span>
        </div>
    );
}

// ─── ATTRIBUTION MODAL ───────────────────────────────────────────────────────
type CreditEntry = { name: string; author: string; url: string };
function AttributionModal({ onClose }: { onClose: () => void }) {
    const [credits, setCredits] = React.useState<CreditEntry[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        fetch('/api/ar/credits')
            .then(r => r.json())
            .then(d => { if (d.success) setCredits(d.models); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filtered = credits.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-3 pb-3 sm:p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden" style={{ maxHeight: '85vh' }}>
                <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-black text-slate-800">🎨 Tín dụng & Bản quyền</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Tất cả mô hình 3D được cấp phép CC BY 3.0 qua Poly Pizza</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors text-lg font-bold">
                        ×
                    </button>
                </div>
                <div className="px-5 py-3 border-b border-slate-100">
                    <input
                        type="text"
                        placeholder="Tìm mô hình hoặc tác giả..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div className="overflow-y-auto flex-1 px-5 py-3 space-y-1">
                    {loading && <div className="text-center py-8 text-slate-400 text-sm">Đang tải...</div>}
                    {!loading && filtered.length === 0 && <div className="text-center py-8 text-slate-400 text-sm">Không tìm thấy kết quả</div>}
                    {filtered.map((c, i) => (
                        <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-colors group">
                            <div>
                                <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{c.name}</span>
                                <span className="text-xs text-slate-400 ml-2">by {c.author}</span>
                            </div>
                            <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">Poly Pizza</span>
                        </a>
                    ))}
                </div>
                <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{filtered.length} mô hình · CC BY 3.0</span>
                    <a href="https://poly.pizza" target="_blank" rel="noopener noreferrer"
                        className="text-xs text-primary font-semibold hover:underline">
                        Poly Pizza
                    </a>
                </div>
            </div>
        </div>
    );
}

// ─── BACK CONFIRM DIALOG ─────────────────────────────────────────────────────
function BackConfirmDialog({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-7 max-w-xs w-full text-center space-y-4">
                <div className="text-5xl">🤔</div>
                <h3 className="text-lg font-black text-slate-800">Quay lại?</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Kết quả 3D của bạn sẽ biến mất. Bạn muốn vẽ bức mới không?
                </p>
                <div className="flex gap-3">
                    <button onClick={onStay}
                        className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                        Ở lại
                    </button>
                    <button onClick={onLeave}
                        className="flex-1 py-3 rounded-2xl bg-primary text-white font-black text-sm hover:opacity-90 transition-opacity">
                        Vẽ lại!
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── FLOATING LABEL: Vietnamese name above each 3D model ────────────────────
// Using an HTML overlay (absolutely positioned) rather than drei/Text
// to keep the bundle small and support all Vietnamese characters.
function FloatingLabel({ screenX, label, emoji }: { screenX: string; label: string; emoji: string }) {
    return (
        <div
            style={{ left: screenX, transform: 'translateX(-50%)' }}
            className="absolute top-4 pointer-events-none flex flex-col items-center gap-0.5 z-10"
        >
            <span className="text-2xl drop-shadow">{emoji}</span>
            <span className="text-xs font-black text-white/90 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}

// ─── FOCUS CONTROLS ─────────────────────────────────────────────────────────
// On focus click: animates BOTH the target AND the camera position over 0.5s,
// then STOPS. This resets zoom back to default distance so the focused model
// appears at full size regardless of how far the user had zoomed.
function FocusControls({ focusX, defaultZ }: { focusX: number; defaultZ: number }) {
    const ref = useRef<any>(null);
    const fromTarget = useRef(new THREE.Vector3(0, 0.5, 0));
    const toTarget = useRef(new THREE.Vector3(focusX, 0.5, 0));
    const fromCam = useRef(new THREE.Vector3(0, 1.8, defaultZ));
    const toCam = useRef(new THREE.Vector3(focusX, 1.8, defaultZ));
    const progress = useRef(1); // start "done" so first render doesn't animate
    const DURATION = 0.5;

    useEffect(() => {
        if (ref.current) {
            // 1. Save where we are now
            fromTarget.current.copy(ref.current.target);
            fromCam.current.copy(ref.current.object.position);

            // 2. Calculate current distance from target
            const currentDistance = ref.current.object.position.distanceTo(ref.current.target);

            // 3. Set new target (the new object)
            toTarget.current.set(focusX, 0.5, 0);

            // 4. Set new camera position using the SAME distance the user had
            // This prevents the "zoom reset" snap.
            toCam.current.set(focusX, 1.8, currentDistance);

            progress.current = 0;
        }
    }, [focusX]);

    useFrame((_, delta) => {
        if (!ref.current || progress.current >= 1) return;
        progress.current = Math.min(progress.current + delta / DURATION, 1);
        const t = 1 - Math.pow(1 - progress.current, 3); // cubic ease-out
        ref.current.target.lerpVectors(fromTarget.current, toTarget.current, t);
        ref.current.object.position.lerpVectors(fromCam.current, toCam.current, t);
        ref.current.update();
    });

    return (
        <OrbitControls
            ref={ref}
            enableZoom
            enablePan={false}
            enableRotate
            minDistance={1.5}
            maxDistance={15}
        />
    );
}

// ─── 3D SCENE ────────────────────────────────────────────────────────────────
const SPACING = 4; // units between model centers (bounding cube = 2, gap = 2)

function Scene3D({
    items,
    imagePreview,
    focusIndex,
}: {
    items: ARModelItem[];
    imagePreview: string | null;
    focusIndex: number;
}) {
    const glbItems = items.filter(i => i.modelType === 'glb' && i.modelUrl);
    const n = glbItems.length;
    const centerOffset = (n - 1) * SPACING * 0.5;
    // Minimum Z to fit all models in FOV 50°; base z=5 keeps single models big
    const cameraZ = Math.max(5, ((n - 1) * SPACING + 3) / 0.9);
    const focusX = n > 0 && focusIndex < n
        ? focusIndex * SPACING - centerOffset
        : 0;

    return (
        <Canvas
            camera={{ position: [0, 1.8, cameraZ], fov: 50 }}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
            <Suspense fallback={null}>
                <Environment preset="forest" background blur={0.6} />
            </Suspense>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 6, 5]} intensity={1} castShadow />
            {glbItems.map((item, i) => (
                <pointLight
                    key={`light-${i}`}
                    position={[i * SPACING - centerOffset, 2, 2]}
                    intensity={0.4}
                    color={item.primaryColor}
                />
            ))}

            {/* Drawing background — own Suspense so it loads independently */}
            {imagePreview && (
                <Suspense fallback={null}>
                    <DrawingBackground3D url={imagePreview} />
                </Suspense>
            )}

            {/* Each model gets its OWN Suspense boundary.
                Previously all models shared one <Suspense> — when any single
                model was still loading, React unmounted ALL models and showed
                the fallback. On re-mount, R3F could reattach primitives at
                stale positions, causing the overlap bug. */}
            {glbItems.map((item, i) => {
                const x = i * SPACING - centerOffset;
                return (
                    <group key={`model-${i}-${item.identified}`} position={[x, 0.5, 0]}>
                        <Suspense fallback={<LoadingRing />}>
                            <GLBModel url={item.modelUrl} />
                        </Suspense>
                    </group>
                );
            })}

            <ContactShadows position={[0, -1, 0]} opacity={0.35} scale={20} blur={3} />
            <FocusControls focusX={focusX} defaultZ={cameraZ} />
        </Canvas>
    );
}

// ─── RESULT VIEW ─────────────────────────────────────────────────────────────
function ResultView({
    result,
    imagePreview,
    onReset,
}: {
    result: ARMultiResult;
    imagePreview: string | null;
    onReset: () => void;
}) {
    const [showBackConfirm, setShowBackConfirm] = useState(false);
    const [showCredits, setShowCredits] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // Which model is "focused" in the 3D scene (OrbitControls target)
    const [focusIndex, setFocusIndex] = useState(0);

    const { items, feedback } = result;
    const primary = items[0];
    const glbItems = items.filter(i => i.modelType === 'glb');
    const showCarousel = glbItems.length > 1;

    return (
        <div className="space-y-5">
            {/* Back confirm dialog */}
            {showBackConfirm && (
                <BackConfirmDialog
                    onStay={() => setShowBackConfirm(false)}
                    onLeave={onReset}
                />
            )}
            {/* Attribution modal */}
            {showCredits && <AttributionModal onClose={() => setShowCredits(false)} />}

            {/* ── Header: back + name + stars + credits ── */}
            <div className="flex items-center gap-3">
                <button
                    id="ar-back-btn"
                    onClick={() => setShowBackConfirm(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-green-50 border border-green-100 text-primary hover:bg-green-100 transition-all active:scale-95 shrink-0"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {/* Show all detected emojis in the header */}
                    <span className="text-3xl">{items.map(i => i.emoji).join(' ')}</span>
                    <div className="min-w-0">
                        <h3 className="text-xl font-black text-slate-800 truncate">
                            {items.length === 1
                                ? primary.identifiedVi
                                : items.map(i => i.identifiedVi).join(' & ')}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                            {items.map(i => i.identified).join(' · ')}
                        </p>
                    </div>
                </div>
                <StarRating accuracy={primary.accuracy} />
                <button
                    id="ar-credits-btn"
                    title="Xem tín dụng mô hình 3D"
                    onClick={() => setShowCredits(true)}
                    className="w-9 h-9 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all active:scale-95 shrink-0 text-base font-bold"
                >
                    &copy;
                </button>
            </div>

            {/* ── Not-in-library notice (primary subject has no model) ── */}
            {!primary.isInLibrary && feedback.suggestions.length > 0 && (
                <div className="rounded-3xl bg-amber-50 border-2 border-amber-200 p-5">
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">💡</span>
                        <div>
                            <p className="font-black text-amber-800 text-sm mb-3">
                                Chúng tôi chưa có mô hình 3D cho "{primary.identifiedVi}" — nhưng bạn có thể thử vẽ một trong những vật dưới đây để xem mô hình 3D thật sự!
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {feedback.suggestions.map((s: SubjectSuggestion) => (
                                    <span key={s.id}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-900 text-sm font-bold">
                                        {s.emoji} {s.nameVi}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── 3D Viewer (fullscreen toggle) ── */}
            <div
                className={isFullscreen
                    ? 'fixed inset-0 z-50 bg-slate-900'
                    : 'relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl'}
                style={isFullscreen ? undefined : { height: 440 }}
            >
                <Scene3D items={items} imagePreview={imagePreview} focusIndex={focusIndex} />

                {/* Controls overlay */}
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                    {/* Type badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-black/30 backdrop-blur-md text-white/80 pointer-events-none">
                        <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
                        {glbItems.length > 0 ? `${glbItems.length} mô hình 3D` : 'Kết quả AI'}
                    </span>
                    {/* Fullscreen button */}
                    <button
                        onClick={() => setIsFullscreen(f => !f)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-black/30 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/50 transition-all pointer-events-auto"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                        </span>
                    </button>
                </div>

                {/* Fullscreen close */}
                {isFullscreen && (
                    <button onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                )}

                {/* Fullscreen model picker — compact emoji pills */}
                {isFullscreen && showCarousel && (
                    <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center pointer-events-none">
                        <div className="flex gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-md pointer-events-auto">
                            {glbItems.map((item, i) => (
                                <button
                                    key={`fs-${i}`}
                                    onClick={() => setFocusIndex(i)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all active:scale-90 ${
                                        focusIndex === i
                                            ? 'bg-white/25 ring-1 ring-white/50'
                                            : 'hover:bg-white/15'
                                    }`}
                                    title={item.identifiedVi}
                                >
                                    {item.emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hint */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10 pointer-events-none">
                    <p className="text-white/40 text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {imagePreview
                            ? 'Bức vẽ của bạn ở phía sau · Kéo để xoay · Cuộn để zoom'
                            : 'Kéo để xoay · Cuộn để zoom'}
                    </p>
                </div>
            </div>

            {/* ── Tap-to-focus model carousel (only when >1 model) ── */}
            {showCarousel && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {glbItems.map((item, i) => (
                        <button
                            key={item.identified}
                            onClick={() => setFocusIndex(i)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-sm font-bold whitespace-nowrap transition-all active:scale-95 shrink-0 ${focusIndex === i
                                ? 'bg-primary text-white border-primary shadow-md shadow-green-200'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                                }`}
                        >
                            <span className="text-base">{item.emoji}</span>
                            {item.identifiedVi}
                            {item.accuracy >= 70 && (
                                <span className="text-[10px] opacity-70">{item.accuracy}%</span>
                            )}
                        </button>
                    ))}
                    {/* "Bức vẽ" button removed — drawing is now always visible as background */}
                </div>
            )}

            {/* ── Feedback cards (shared for the whole drawing) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-3xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🌟</span>
                        <h4 className="font-black text-green-700 text-[15px]">Giỏi lắm!</h4>
                    </div>
                    <p className="text-green-800 text-[14px] leading-relaxed font-medium">{feedback.praise}</p>
                </div>
                <div className="rounded-3xl p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">✏️</span>
                        <h4 className="font-black text-amber-700 text-[15px]">Thử thách nhỏ!</h4>
                    </div>
                    <p className="text-amber-800 text-[14px] leading-relaxed font-medium">{feedback.tip}</p>
                </div>
                <div className="rounded-3xl p-5 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🧠</span>
                        <h4 className="font-black text-blue-700 text-[15px]">Bạn có biết?</h4>
                    </div>
                    <p className="text-blue-800 text-[14px] leading-relaxed font-medium">{feedback.description}</p>
                </div>
                <div className="rounded-3xl p-5 bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🚀</span>
                        <h4 className="font-black text-purple-700 text-[15px]">Tưởng tượng nào!</h4>
                    </div>
                    <p className="text-purple-800 text-[14px] leading-relaxed font-medium">{feedback.imagination}</p>
                </div>
            </div>

            {/* ── Draw again ── */}
            <div className="flex justify-center pt-1">
                <button
                    id="ar-draw-again-btn"
                    onClick={() => setShowBackConfirm(true)}
                    className="flex items-center gap-2 bg-primary hover:opacity-90 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">palette</span>
                    Vẽ bức mới!
                </button>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ARExplorer() {
    const { state, setLabel, setImagePreview, analyzeImage, loadDemo, reset } = useAR();
    const fileRef = useRef<HTMLInputElement>(null);
    const [showCamera, setShowCamera] = useState(false);

    const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(f);
        e.target.value = '';
    }, [setImagePreview]);

    const onCapture = useCallback((url: string) => {
        setImagePreview(url);
        setShowCamera(false);
    }, [setImagePreview]);

    const onAnalyze = useCallback(() => {
        if (state.imagePreview) analyzeImage(state.imagePreview);
    }, [state.imagePreview, analyzeImage]);

    const hasImage = !!state.imagePreview;
    const isIdle = state.status === 'idle' || state.status === 'error';

    return (
        <div className="w-full">
            {/* Camera modal */}
            {showCamera && <CameraCapture onCapture={onCapture} onClose={() => setShowCamera(false)} />}
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />

            {/* ─── IDLE / ERROR ─────────────────────────────────────── */}
            {isIdle && (
                <div className="space-y-5">
                    {/* Upload zone */}
                    <div
                        onClick={() => !hasImage && fileRef.current?.click()}
                        className={`rounded-3xl border-4 border-dashed flex flex-col items-center justify-center text-center gap-4 p-8 min-h-[220px] transition-all ${hasImage
                            ? 'border-primary/30 bg-green-50/40'
                            : 'border-slate-200 bg-white hover:border-primary/40 cursor-pointer group'
                            }`}
                    >
                        {hasImage && state.imagePreview ? (
                            <div className="flex flex-col items-center gap-3">
                                <img src={state.imagePreview} alt="Bức vẽ"
                                    className="max-h-44 w-auto rounded-2xl shadow-lg border-4 border-white object-contain" />
                                <button
                                    onClick={e => { e.stopPropagation(); setImagePreview(null); }}
                                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 font-bold transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span> Xoá ảnh
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="text-5xl group-hover:scale-110 transition-transform">🎨</div>
                                <div>
                                    <p className="font-black text-lg text-slate-700">Cho mình xem bức vẽ nào!</p>
                                    <p className="text-slate-400 text-sm mt-1">Chọn ảnh hoặc chụp bức vẽ của bạn</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Upload / Camera buttons */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button id="ar-upload-btn" onClick={() => fileRef.current?.click()}
                            className="flex items-center gap-2 bg-primary hover:opacity-90 text-white font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-green-200/50 transition-all active:scale-95 text-sm">
                            <span className="material-symbols-outlined text-lg">photo_library</span>
                            {hasImage ? 'Chọn ảnh khác' : 'Chọn từ thư viện'}
                        </button>
                        <button id="ar-camera-btn" onClick={() => setShowCamera(true)}
                            className="flex items-center gap-2 bg-white border-2 border-primary text-primary font-bold px-5 py-2.5 rounded-2xl transition-all active:scale-95 hover:bg-green-50 text-sm">
                            <span className="material-symbols-outlined text-lg">photo_camera</span>
                            Chụp ảnh
                        </button>
                    </div>

                    {/* Label input */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <label htmlFor="ar-label" className="block text-sm font-black text-slate-600 mb-2">
                            🖊️ Bạn vẽ gì vậy? <span className="text-slate-400 font-normal">(không bắt buộc)</span>
                        </label>
                        <input
                            id="ar-label"
                            type="text"
                            value={state.label}
                            onChange={e => setLabel(e.target.value)}
                            placeholder="Ví dụ: con mèo, cá mập, khủng long..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-700 text-sm font-medium placeholder-slate-400 transition-all outline-none"
                        />
                    </div>

                    {/* Analyze button */}
                    {hasImage && (
                        <div className="flex justify-center">
                            <button id="ar-analyze-btn" onClick={onAnalyze}
                                className="flex items-center gap-3 bg-primary hover:opacity-90 text-white font-black text-base px-10 py-4 rounded-2xl shadow-xl shadow-green-300/40 transition-all active:scale-95">
                                <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
                                Biến hình 3D! ✨
                            </button>
                        </div>
                    )}

                    {/* Error */}
                    {state.status === 'error' && state.error && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                            <p className="text-red-600 font-bold text-sm">{state.error}</p>
                        </div>
                    )}

                    {/* Demo */}
                    <div className="text-center">
                        <button id="ar-demo-btn" onClick={loadDemo}
                            className="text-sm font-bold text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">play_circle</span>
                            Xem Demo (không cần AI)
                        </button>
                    </div>

                    {/* ── Available subjects grid (grouped) ── */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-5">
                        <h4 className="text-sm font-black text-slate-700 mb-1 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base text-primary">palette</span>
                            Các vật có mô hình 3D sẵn — thử vẽ xem!
                        </h4>
                        <p className="text-xs text-slate-400 mb-4">
                            Nhấn vào tên để điền vào ô “Bạn vẽ gì?” nhé 👇
                        </p>
                        <div className="space-y-4">
                            {SUBJECT_GROUPS.map(group => (
                                <div key={group.group}>
                                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                        <span>{group.emoji}</span> {group.group}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {group.subjects.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => setLabel(s.nameVi)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 hover:border-primary hover:bg-green-50 hover:text-primary text-slate-700 text-xs font-bold transition-all"
                                            >
                                                <span>{s.emoji}</span>
                                                {s.nameVi}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-3 italic">
                            💡 Nếu bức vẽ của bạn không khớp với danh sách này, AI vẫn sẽ nhận xét — nhưng sẽ không có mô hình 3D.
                        </p>
                    </div>
                </div>
            )}

            {/* ─── ANALYZING ────────────────────────────────────────── */}
            {state.status === 'analyzing' && (
                <div className="flex flex-col items-center justify-center gap-6 py-16">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full border-[10px] border-green-100 border-t-primary animate-spin" />
                        <span className="text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">🪄</span>
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-xl font-black text-slate-800">Đang biến phép...</h3>
                        <p className="text-slate-400 font-medium text-sm">AI đang nhìn bức vẽ và tạo mô hình 3D ✨</p>
                    </div>
                </div>
            )}

            {/* ─── RESULT ───────────────────────────────────────────── */}
            {state.status === 'result' && state.result && state.result.items.length > 0 && (
                <ResultView
                    result={state.result}
                    imagePreview={state.imagePreview}
                    onReset={reset}
                />
            )}
        </div>
    );
}
