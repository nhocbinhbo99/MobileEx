# BÀI TRẢ LỜI CÂU HỎI BỔ SUNG — BUỔI 8 (REACT NATIVE)

**Sinh viên thực hiện:**
- Họ và tên: **Hoàng Phước Thành Công**
- MSSV: **23731851**
- Lớp: **DHKTPM19BTT**

---

### Câu 1: Ý nghĩa cờ `ready` trong `usePersistence` và `useAutoPersist`
**Hỏi:** *Trong `useAutoPersist`, nếu bỏ điều kiện `ready` thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.*

**Trả lời:**
- **Thứ tự thực thi khi mở app:**
  1. **Lần render đầu tiên (Initial Render):** Store Redux khởi tạo state mặc định với mảng giỏ hàng rỗng (`items: []`). Lúc này quá trình đọc bất đồng bộ từ `AsyncStorage` (`loadJSON(CART_KEY)`) chỉ mới được gọi trong `useEffect` và **chưa kịp trả về kết quả**.
  2. **Kích hoạt `useAutoPersist`:** Nếu không có cờ `ready` chặn lại, `useEffect` của `useAutoPersist` sẽ chạy ngay lập tức với giá trị hiện tại của Redux store là mảng rỗng `[]`.
  3. **Hậu quả (Bug ghi đè dữ liệu):** Mảng rỗng `[]` sẽ được ghi đè (`saveJSON`) vào `AsyncStorage`, xóa sạch toàn bộ dữ liệu giỏ hàng mà người dùng đã lưu từ các phiên trước trước khi hàm đọc nạp (`hydrateCart`) kịp hoàn tất.
- **Tác dụng của cờ `ready`:**
  - `ready` chỉ được chuyển sang `true` sau khi `Promise.all` đã nạp thành công cả 3 dữ liệu (`loadAuth`, `loadJSON(CART_KEY)`, `loadJSON(WISHLIST_KEY)`) và dispatch vào Redux store.
  - Khi chưa `ready`, `useAutoPersist` trả về ngay (`if (!ready) return;`), giúp bảo toàn dữ liệu cũ và chỉ bắt đầu lắng nghe ghi đĩa khi giỏ hàng đã được phục hồi đầy đủ.

---

### Câu 2: Token giả & Bảo mật trong ứng dụng di động
**Hỏi:** *Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?*

**Trả lời:**
- **Hai điểm không an toàn trong bài thực hành:**
  1. **Lộ thông tin nhạy cảm ở client:** Toàn bộ thông tin tài khoản và mật khẩu nằm trong file `db.json` tải về máy khách. Kẻ tấn công có thể dễ dàng bắt gói tin mạng hoặc dịch ngược mã nguồn để lấy toàn bộ danh sách mật khẩu của người dùng.
  2. **Token tự sinh và không được ký số:** Token chỉ là một chuỗi ngẫu nhiên do app tự ghép (`demo-token-...`), không có chữ ký mã hoá bí mật (như HMAC SHA256 trong JWT) nên bất kỳ ai cũng có thể giả mạo token để mạo danh người dùng hợp lệ mà không cần đăng nhập.
- **Trong hệ thống thực tế (Production):**
  - **Ai kiểm tra mật khẩu:** **Phía máy chủ (Server/Backend API)** chịu trách nhiệm kiểm tra. Mật khẩu gửi lên được mã hoá qua HTTPS và so khớp với chuỗi băm an toàn (hashing bằng bcrypt, argon2) lưu trong cơ sở dữ liệu. Sau khi hợp lệ, Server sẽ ký số và cấp JWT token (kèm thời hạn hết hạn - expiration time).
  - **Nơi lưu token an toàn:** Token và Refresh Token phải được lưu trong vùng nhớ mã hóa an toàn cấp phần cứng của hệ điều hành như **Keychain (iOS)** và **Keystore (Android)** thông qua thư viện `expo-secure-store`, tuyệt đối không lưu dưới dạng văn bản thô (plain-text) trong `AsyncStorage` vì dễ bị trích xuất trên thiết bị đã root/jailbreak.

---

### Câu 3: Hai `useEffect` trong `CartItemRow`
**Hỏi:** *Thử xóa effect đồng bộ `setQty(item.quantity)`. Với thao tác nào thì số hiển thị trên nút bị lệch so với store?*

**Trả lời:**
- Trong `CartItemRow`, component duy trì một state cục bộ `qty` để người dùng bấm tăng giảm mượt mà và debounce trước khi dispatch cập nhật store.
- **Nếu xóa effect đồng bộ (`setQty(item.quantity)`):**
  - Số hiển thị sẽ bị lệch khi **Redux store thay đổi từ một nguồn bên ngoài mà không thông qua việc bấm nút trên chính hàng đó**, bao gồm:
    1. **Khi app vừa mở lại (Hydration):** Lúc đầu component render với `item.quantity` ban đầu, sau đó `usePersistence` nạp dữ liệu từ `AsyncStorage` vào Redux store. Nếu không có effect đồng bộ, `qty` local vẫn giữ nguyên giá trị cũ của lần khởi tạo.
    2. **Xoá rồi thêm lại cùng sản phẩm:** Khi người dùng xoá một cuốn sách khỏi giỏ, sau đó vào `BookDetailScreen` thêm lại cuốn sách đó với số lượng mới, state cục bộ của hàng nếu được tái sử dụng (hoặc trong các trường hợp quản trị giỏ hàng) sẽ hiển thị sai lệch so với dữ liệu thực trong Redux store.
    3. **Tính năng cập nhật hàng loạt / Xoá giỏ hàng:** Khi có thao tác clear cart hoặc áp dụng mã khuyến mãi đồng bộ lại số lượng từ server.

---

### Câu 4: Một nguồn chân lý (Single Source of Truth) giữa Home, Detail, Wishlist
**Hỏi:** *Nếu HeartButton giữ trạng thái bằng `useState` riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?*

**Trả lời:**
- **Nếu dùng `useState` riêng rẽ ở từng component:**
  - Mỗi nút tim `HeartButton` tại `BookCard` (trang chủ), `BookDetailScreen` (trang chi tiết) và `WishlistScreen` sẽ có một biến trạng thái độc lập. Khi bấm thả tim tại màn hình chi tiết sách, chỉ có `useState` của trang chi tiết đổi thành màu đỏ ♥, trong khi icon tim của cuốn sách đó ngoài trang chủ vẫn là ♡ (chưa yêu thích). Trạng thái giữa các màn hình bị phân mảnh và không đồng nhất.
- **Cách Redux giải quyết (Single Source of Truth):**
  - Toàn bộ danh sách mã sách yêu thích được lưu tập trung tại một nơi duy nhất: `state.wishlist.ids` trong Redux Store.
  - Cả `BookCard`, `BookDetailScreen` và `WishlistScreen` đều kết nối chung qua custom hook `useWishlist()`.
  - Khi người dùng bấm tim ở bất kỳ đâu, action `toggleWishlist(bookId)` được gửi đến Redux store. Store cập nhật danh sách `ids` mới, kích hoạt re-render tự động tức thì cho toàn bộ các component đang đăng ký lắng nghe state này. Nhờ đó, icon tim ở mọi nơi luôn phản ánh chính xác và đồng bộ trạng thái thực tế mà không cần reload trang.

---

### Câu 5: Bổ sung nút Ẩn/Hiện mật khẩu (Toggle Eye Password)
**Hỏi:** *Thêm biểu tượng 👁 cạnh ô Mật khẩu ở màn Đăng nhập: bấm để hiện/ẩn mật khẩu (gợi ý: một state `showPassword` điều khiển `secureTextEntry`). Chụp ảnh màn hình kết quả.*

**Đoạn mã đã triển khai trong `LoginScreen.tsx`:**

```tsx
// 1. Quản lý trạng thái hiển thị mật khẩu
const [showPassword, setShowPassword] = useState(false);

// 2. Giao diện ô nhập mật khẩu có nút chuyển đổi 👁️ / 🙈
<View style={styles.passwordContainer}>
  <TextInput
    style={styles.passwordInput}
    value={password}
    onChangeText={(t) => {
      setPassword(t);
      if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
    }}
    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
    secureTextEntry={!showPassword}
    autoCapitalize="none"
  />
  <TouchableOpacity
    style={styles.eyeBtn}
    onPress={() => setShowPassword((prev) => !prev)}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
  >
    <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
  </TouchableOpacity>
</View>
```

**Nguyên lý hoạt động:**
- Khởi tạo `showPassword = false`. Thuộc tính `secureTextEntry={!showPassword}` sẽ che ký tự bằng dấu chấm tròn.
- Khi người dùng chạm vào biểu tượng con mắt (`TouchableOpacity`), hàm đảo trạng thái `setShowPassword(prev => !prev)` được gọi.
- `secureTextEntry` chuyển thành `false`, văn bản mật khẩu hiển thị rõ ràng cho người dùng kiểm tra; đồng thời biểu tượng chuyển linh hoạt giữa `👁️` (đang ẩn) và `🙈` (đang hiện).

