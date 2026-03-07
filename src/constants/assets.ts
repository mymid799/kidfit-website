/**
 * File Hằng Số Quản Lý Hình Ảnh Toàn Hệ Thống (Assets Config)
 *
 * MỤC ĐÍCH: 
 * - Quản lý duy nhất 1 điểm: Tập trung toàn bộ path hình ảnh vào chung một file thay vì rải rác.
 * - Sạch code (clean-code): Dễ dàng gọi file bằng biến, tránh typo (lỗi chính tả đường link `src`).
 * - Triển khai (Bảo trì): Dễ mở rộng thay thêm module mà không ảnh hưởng Layout các component. 
 * - Đường dẫn (Public/Vite): `/assets/...` trỏ thẳng ra `public/assets/` trên source folder.
 */

export const IMAGES = {
    // Giao diện / Thương Hiệu
    logo: {
        main: '/assets/logo/logo.png',            // Logo toàn site (Header, Footer, Menu, Dashboard)
        favicon: '/assets/logo/favicon.ico',      // Logo trên tab trình duyệt
        text_svg: '/assets/logo/logo-text.svg',   // (Dự phòng) Typography
    },

    // Icon chức năng
    icons: {
        pencil: '/assets/icons/pencil.svg',               // Biểu tượng cây viết
        playVideo: '/assets/icons/play-video.svg',        // Icon Player video
        community: '/assets/icons/community.svg',         // Tab Phụ huynh
        library: '/assets/icons/library.svg',             // Khám phá thư viện mẫu
        user: '/assets/icons/user.svg',                   // Tài khoản cá nhân
    },

    // Minh hoạ trẻ em 
    illustrations: {
        kidsDrawing: '/assets/illustrations/kids-drawing-1.png', // Vẽ tranh sáng tạo
        steamIcons: '/assets/illustrations/steam-icons.png',     // Logo / Huy hiệu Steam tổng hợp
        backgroundHero: '/assets/illustrations/background-hero.jpg', // Minh họa background cho module mở đầu
    },

    // Flashcards Học Cụ Điện Tử (A, B, C...)
    cards: {
        a: {
            A1: '/assets/cards/a/A1-dau-vet.png',       // Module A - Dấu vết
            A2: '/assets/cards/a/A2-duong-net.png',     // Module A - Đường nét
            // Các module khác được bổ sung vào đây (A3, A4...)
        },
        b: {
            B1: '/assets/cards/b/B1-di-chuyen.png',     // Module B - Di chuyển logic
            // Các module khác được bổ sung vào đây...
        },
        c: {
            C1: '/assets/cards/c/C1-chon.png',          // Module C
            // Hỗ trợ thêm module tương lai...
        }
    },

    // Ảnh Thumbnails hiển thị Thumbnail Bài Thực Hành / Video Player 
    thumbnails: {
        videoModule1: '/assets/thumbnails/video-module1.jpg', // Bài thực hành Mẫu
        videoProject: '/assets/thumbnails/video-project.jpg', // Tác phẩm của bé
    },

    // Sổ tay cá nhân (Nhật ký)
    journal: {
        avatar: '/assets/illustrations/journal-avatar.jpg',
        teacherAvatar: '/assets/illustrations/teacher-avatar.jpg',
        activity1: '/assets/illustrations/journal-activity-1.jpg', // Thế giới nước
        activity2: '/assets/illustrations/journal-activity-2.jpg', // Khu vườn của bé
        activity3: '/assets/illustrations/journal-activity-3.jpg', // Gia đình yêu thương
    },

    // Màu nền, Mảng trang trí Full Màn hình (Backgrounds)
    backgrounds: {
        loginLight: '/assets/backgrounds/login-bg-light.jpg',      // Nền trang đăng nhập, Đăng ký
        dashboardBg: '/assets/backgrounds/dashboard-bg.jpg',       // Nền màn hình cá nhân hoá
    }
};
