param (
    [int]$port = 3000
)

Write-Host "🚀 Đang khởi tạo Cloudflare Tunnel cho port $port..." -ForegroundColor Cyan

if (-not (Get-Command "cloudflared" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Lỗi: Chưa cài đặt 'cloudflared'. Vui lòng cài đặt bằng: 'winget install cloudflare.cloudflared'" -ForegroundColor Red
    exit 1
}

# Run cloudflared with http2 protocol for better stability in some networks
cloudflared tunnel --protocol http2 --url "http://localhost:$port"
