# Product Manager - Hướng dẫn sử dụng

## Tính năng

Trang Product Manager cung cấp các tính năng CRUD (Create, Read, Update, Delete) cho sản phẩm với các chức năng bổ sung:

### 1. CRUD Operations
- **Create**: Thêm sản phẩm mới
- **Read**: Hiển thị danh sách sản phẩm
- **Update**: Chỉnh sửa thông tin sản phẩm
- **Delete**: Xóa sản phẩm

### 2. Search (Tìm kiếm)
- Tìm kiếm theo tên sản phẩm
- Tìm kiếm theo mô tả
- Tìm kiếm theo danh mục

### 3. Sort (Sắp xếp)
- Sắp xếp theo ID (tăng/giảm)
- Sắp xếp theo tên (A-Z/Z-A)
- Sắp xếp theo giá (thấp-cao/cao-thấp)
- Sắp xếp theo danh mục (A-Z/Z-A)
- Sắp xếp theo số lượng tồn kho (thấp-cao/cao-thấp)

## Cách sử dụng

### 1. Khởi động ứng dụng

```bash
# Terminal 1: Chạy JSON Server
npm run server

# Terminal 2: Chạy React App
npm start
```

### 2. Truy cập Product Manager

1. Đăng nhập vào hệ thống
2. Click vào tên người dùng ở header
3. Chọn "Product Manager" từ dropdown menu
4. Hoặc truy cập trực tiếp: `http://localhost:3000/product-manager`

### 3. Thêm sản phẩm mới

1. Click nút "Add Product"
2. Điền thông tin sản phẩm:
   - **Name**: Tên sản phẩm
   - **Description**: Mô tả sản phẩm
   - **Price**: Giá sản phẩm (USD)
   - **Category**: Danh mục sản phẩm
   - **Image URL**: Link hình ảnh sản phẩm
   - **Stock**: Số lượng tồn kho
   - **Featured**: Đánh dấu sản phẩm nổi bật
3. Click "Add Product"

### 4. Chỉnh sửa sản phẩm

1. Click nút Edit (biểu tượng bút chì) bên cạnh sản phẩm
2. Chỉnh sửa thông tin trong modal
3. Click "Update Product"

### 5. Xóa sản phẩm

1. Click nút Delete (biểu tượng thùng rác) bên cạnh sản phẩm
2. Xác nhận xóa trong popup

### 6. Tìm kiếm sản phẩm

1. Nhập từ khóa vào ô tìm kiếm
2. Kết quả sẽ được lọc theo tên, mô tả hoặc danh mục

### 7. Sắp xếp sản phẩm

1. Click dropdown "Sort by" để chọn tiêu chí sắp xếp
2. Click vào header của cột để thay đổi thứ tự sắp xếp (tăng/giảm)

## Giao diện

### Bảng sản phẩm
- Hiển thị thông tin: ID, Hình ảnh, Tên, Mô tả, Giá, Danh mục, Tồn kho, Nổi bật
- Badge màu cho trạng thái tồn kho:
  - 🟢 Xanh: > 10 sản phẩm
  - 🟡 Vàng: 1-10 sản phẩm
  - 🔴 Đỏ: Hết hàng (0 sản phẩm)
- Badge cho sản phẩm nổi bật: Xanh (Yes) / Xám (No)

### Modal thêm/chỉnh sửa
- Form validation cho các trường bắt buộc
- Layout responsive với Bootstrap Grid
- Preview hình ảnh từ URL

## Lưu ý

- Cần có JSON Server chạy trên port 9999
- Dữ liệu được lưu trong file `database.json`
- Chỉ người dùng đã đăng nhập mới có thể truy cập Product Manager
- Tất cả thao tác CRUD đều có thông báo thành công/lỗi 