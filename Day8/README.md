# BookStore Online — Buổi 8 · Đăng nhập, Đánh giá, Giỏ hàng & Yêu thích

**Sinh viên thực hiện:**
- Họ và tên: **Hoàng Phước Thành Công**
- MSSV: **23731851**
- Lớp: **DHKTPM19BTT**

---

Dự án đã hoàn thành toàn bộ **8 bài tập chính (BT8.1 - BT8.8)**, **2 thử thách nâng cao (BT8.C1, BT8.C2)**, và hoàn thiện 5 câu hỏi lý thuyết tại [TraLoi.md](TraLoi.md).
Dự án được nâng cấp đồng bộ lên **Expo SDK 58** (`react 19.3.0`, `react-native 0.88.1`, `typescript ~6.0.3`) với `tsc --noEmit` đạt 0 lỗi.

## Chạy dự án
```bash
npm install
npm run api         # terminal 1: json-server http://localhost:3000 (dữ liệu db.json)
npx expo start      # terminal 2: quét QR bằng Expo Go hoặc nhấn w để mở web
npm run typecheck   # npx tsc --noEmit
```

- Tài khoản demo: `demo@bookstore.vn` / `123456` hoặc `23731851.cong@student.iuh.edu.vn` / `123456`
- Hỗ trợ đầy đủ Web & Mobile: Hộp thoại xác nhận xoá hoạt động chuẩn mực qua `utils/dialog.ts`.

## Tiến độ hoàn thành
| Mã | File | Mô tả tính năng | Trạng thái |
|---|---|---|:---:|
| **BT8.1** | `screens/LoginScreen.tsx` | Form đăng nhập, validate dưới ô nhập, quay lại đúng màn (Checkout/Home), kèm toggle ẩn/hiện mật khẩu | **Hoàn thành** |
| **BT8.2** | `screens/RegisterScreen.tsx` | Form đăng ký 4 trường, kiểm tra mật khẩu trùng khớp, tự động đăng nhập sau khi tạo tài khoản | **Hoàn thành** |
| **BT8.3** | `hooks/usePersistence.ts` | Tự động phục hồi phiên đăng nhập khi mở app, đồng bộ AsyncStorage khi login/logout | **Hoàn thành** |
| **BT8.4** | `screens/CartScreen.tsx`, `screens/CheckoutScreen.tsx` | Bảo vệ Checkout: chuyển hướng sang Login nếu chưa đăng nhập, guard CheckoutScreen | **Hoàn thành** |
| **BT8.5** | `components/RatingStars.tsx`, `screens/BookDetailScreen.tsx` | Đánh giá sao tương tác (a), tính điểm trung bình realtime (b), gửi review vào API (c) | **Hoàn thành** |
| **BT8.6** | `components/CartItemRow.tsx` | Nút −/+ số lượng có debounce 300ms, kiểm soát giới hạn tồn kho `stock` | **Hoàn thành** |
| **BT8.7** | `screens/CartScreen.tsx`, `hooks/useAutoPersist.ts`, `hooks/usePersistence.ts` | Xác nhận xoá với confirmDialog (a), tự động lưu giỏ hàng & wishlist vào AsyncStorage với cờ `ready` (b) | **Hoàn thành** |
| **BT8.8** | `components/HeartButton.tsx`, `screens/WishlistScreen.tsx` | Nút tim dùng chung Redux store (a), màn hình Danh sách yêu thích với BookGrid & EmptyState (b) | **Hoàn thành** |
| **BT8.C1** | `screens/BookDetailScreen.tsx` | *(Thử thách)* Danh sách sách liên quan cùng danh mục cuộn ngang | **Hoàn thành** |
| **BT8.C2** | `screens/CartScreen.tsx` | *(Thử thách)* Hệ thống mã giảm giá (`SALE10` giảm 10%, `GIAM50K` giảm 50.000đ) | **Hoàn thành** |
