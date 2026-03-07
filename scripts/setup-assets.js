import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Lấy đường dẫn hiện tại do đang dùng ES Modules (type: "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chọn public/assets làm nơi phân bổ các thư mục hình ảnh vì Vite serve tĩnh thư mục này rất tốt
const ASSETS_DIR = path.join(__dirname, '../public/assets');

// Danh sách các thư mục cần khởi tạo
const directoriesToCreate = [
    'logo',
    'icons',
    'illustrations',
    'cards',
    'cards/a', // Module A
    'cards/b', // Module B
    'cards/c', // Module C
    'thumbnails',
    'backgrounds'
];

/**
 * Hàm khởi tạo cấu trúc thư mục chứa hình ảnh
 */
async function setupAssets() {
    console.log('\n🚀 BẮT ĐẦU KHỞI TẠO CẤU TRÚC THƯ MỤC HÌNH ẢNH (ASSETS)...');
    console.log(`📂 Thư mục gốc: ${ASSETS_DIR}\n`);

    try {
        for (const dir of directoriesToCreate) {
            const targetPath = path.join(ASSETS_DIR, dir);

            // Sử dụng `recursive: true` để tạo thư mục con lồng nhau một cách an toàn
            // Nếu folder đã tồn tại, Node.js sẽ tự động bỏ qua mà không báo lỗi hay xóa file cũ
            await fs.mkdir(targetPath, { recursive: true });
            console.log(`✅ Đã kiểm tra / khởi tạo thành công: public/assets/${dir}`);
        }

        console.log('\n🎉 HOÀN TẤT THIẾT LẬP!');
        console.log('💡 HƯỚNG DẪN SỬ DỤNG:');
        console.log('  1. Mở thư mục "public/assets"');
        console.log('  2. Kéo thả các hình ảnh tương ứng vào thư mục phù hợp (logo, icons, cards, ...)');
        console.log('  3. Sử dụng file `src/constants/assets.ts` để lấy đường dẫn file vào trong component (Ví dụ: <img src={IMAGES.logo.main} />)');
        console.log('  4. Khi sửa đổi hình/logo, chỉ cần thay file mới ghi đè tên cũ (Ví dụ thay logo.png) là web tự đổi - KHÔNG CẦN CHỈNH CODE!\n');

    } catch (error) {
        console.error('❌ LỖI TRONG QUÁ TRÌNH KHỞI TẠO CẤU TRÚC THƯ MỤC:', error);
        process.exit(1);
    }
}

setupAssets();
