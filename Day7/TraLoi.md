# BÀI TRẢ LỜI CÂU HỎI BỔ SUNG — BUỔI 7 (REACT NATIVE)

**Sinh viên thực hiện:**
- Họ và tên: **Hoàng Phước Thành Công**
- MSSV: **23731851**
- Lớp: **DHKTPM19BTT**

---

### Câu 1: Cấu trúc điều hướng
**Hỏi:** *Vì sao `BookDetail` được đăng ký ở Stack mà không đặt trong Tab? Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?*

**Trả lời:**
- `BookDetail` được đưa vào Root Native Stack để khi người dùng mở màn hình chi tiết, giao diện sẽ phủ toàn màn hình (che toàn bộ thanh Tab Bar ở phía dưới) và tự động hỗ trợ thanh tiêu đề kèm nút quay lại (Back arrow `←`), tạo trải nghiệm liền mạch theo chuẩn thiết kế di động (master-detail flow).
- Nếu đặt `BookDetail` vào Bottom Tab:
  1. Màn hình chi tiết sẽ trở thành một tab riêng biệt hiển thị cố định trên thanh điều hướng dưới cùng.
  2. Tab Bar vẫn sẽ luôn xuất hiện bên dưới chiếm diện tích hiển thị của chi tiết sách.
  3. Màn hình sẽ không có nút quay lại tự động của Native Stack, gây khó khăn cho trải nghiệm người dùng khi muốn quay về trang trước đó.

---

### Câu 2: Redux & Tính bất biến (Immutability)
**Hỏi:** *Trong reducer viết `state.items.push(...)` mà sao state gốc không bị sửa trực tiếp? Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?*

**Trả lời:**
- Trong Redux Toolkit, hàm `createSlice` tích hợp sẵn thư viện **Immer**. Mọi cú pháp thao tác trực tiếp (mutating syntax) như `.push()`, `.splice()` thực chất chỉ tác động lên một đối tượng nháp (`draftState`). Sau khi reducer kết thúc, Immer sẽ tự động so sánh và sinh ra một cây state mới hoàn toàn bất biến (immutable state).
- Nếu bỏ `useMemo` trong `useCart`:
  - **Kết quả hiển thị:** Không đổi, tổng tiền và tổng số lượng vẫn tính toán đúng giá trị.
  - **Hậu quả:** Cả hai phép tính `reduce` duyệt toàn bộ danh sách `items` sẽ bị ép chạy lại ở **mọi lần render** của bất kỳ component nào gọi `useCart`, kể cả khi dữ liệu giỏ hàng không hề thay đổi (chẳng hạn khi re-render vì gõ tìm kiếm, đổi tab, chuyển theme). Với giỏ hàng có nhiều mặt hàng, điều này gây lãng phí CPU và giảm độ mượt (FPS) của ứng dụng.

---

### Câu 3: Bất đồng bộ với Promise.all vs Promise.allSettled
**Hỏi:** *Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì? Tìm cách để vẫn hiện được danh sách sách (gợi ý: Promise.allSettled) và nói rõ cách đó phải đánh đổi gì.*

**Trả lời:**
- Khi dùng `Promise.all([getBooks(), getCategories()])`, nếu `getCategories()` bị lỗi thì toàn bộ `Promise.all` sẽ lập tức bị từ chối (`fail-fast`). Do đó, màn `HomeScreen` sẽ nhảy vào khối `catch`, đặt `error` và hiển thị toàn màn hình lỗi (`ErrorView`), người dùng hoàn toàn không xem được danh sách sách dù `getBooks()` đã tải thành công.
- **Giải pháp:** Dùng `Promise.allSettled([getBooks(), getCategories()])`. Cả hai request sẽ luôn được chờ thực hiện xong độc lập:
  ```ts
  const [booksRes, catRes] = await Promise.allSettled([getBooks(), getCategories()]);
  if (booksRes.status === "fulfilled") setBooks(booksRes.value);
  if (catRes.status === "fulfilled") setCategories(catRes.value);
  ```
- **Đánh đổi:** 
  1. Phải viết thêm logic kiểm tra trạng thái (`status === "fulfilled" | "rejected"`) cho từng kết quả và quản lý lỗi phân mảnh (ví dụ: hiển thị banner cảnh báo danh mục lỗi thay vì toàn màn hình).
  2. Giao diện có thể rơi vào trạng thái thiếu nhất quán (có sách hiển thị nhưng thanh lọc danh mục bị trống).

---

### Câu 4: Cơ chế Debounce
**Hỏi:** *Vì sao không đặt `setTimeout` thẳng trong `onChangeText`? Hàm dọn dẹp (`return () => clearTimeout`) giúp tránh lỗi gì?*

**Trả lời:**
- Nếu đặt `setTimeout` trực tiếp trong sự kiện `onChangeText`, mỗi ký tự người dùng gõ vào vẫn kích hoạt một bộ hẹn giờ độc lập. Các bộ hẹn giờ này không bị huỷ mà chỉ bị hoãn lại, dẫn đến hàm tìm kiếm vẫn bị gọi liên tục bấy nhiêu lần sau độ trễ (chỉ làm chậm chứ không giảm được số lần tính toán).
- Hàm dọn dẹp (`return () => clearTimeout(t)`) giúp:
  1. Huỷ bộ hẹn giờ của lần gõ trước đó ngay khi có ký tự mới, đảm bảo chỉ có thao tác gõ cuối cùng sau khi người dùng ngừng gõ đủ khoảng trễ (400ms) mới thực thi.
  2. Tránh rò rỉ bộ nhớ (memory leak) và lỗi cập nhật state trên component đã unmount khi người dùng chuyển màn hình trước khi timer kịp kích hoạt.

---

### Câu 5: Code bổ sung — Tuỳ chọn sắp xếp Giá tăng dần / Giảm dần
**Hỏi:** *Thêm tuỳ chọn sắp xếp “Giá tăng dần / giảm dần” cho Home. Chỉ cần thêm một state và sửa một chỗ trong visibleBooks.*

**Đoạn mã bổ sung trong `src/screens/HomeScreen.tsx`:**

1. **Khai báo state sắp xếp:**
```tsx
type SortOrder = "asc" | "desc" | null;
const [sortOrder, setSortOrder] = useState<SortOrder>(null);
```

2. **Cập nhật tính toán `visibleBooks` với `useMemo`:**
```tsx
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (!sortOrder) return filtered;
  return [...filtered].sort((a, b) => 
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```

3. **Giao diện nút chuyển đổi sắp xếp (đặt trong ListHeaderComponent):**
```tsx
<Pressable 
  style={styles.sortBtn} 
  onPress={() => setSortOrder(prev => prev === "asc" ? "desc" : prev === "desc" ? null : "asc")}
>
  <Text style={styles.sortText}>
    Giá: {sortOrder === "asc" ? "↑ Thấp đến cao" : sortOrder === "desc" ? "↓ Cao đến thấp" : "Mặc định"}
  </Text>
</Pressable>
```

