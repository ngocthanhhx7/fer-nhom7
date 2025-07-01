# Account Manager - Hướng dẫn sử dụng

## Tính năng

Trang Account Manager cung cấp các tính năng CRUD (Create, Read, Update, Delete) cho người dùng với các chức năng bổ sung:

### 1. CRUD Operations
- **Create**: Thêm người dùng mới
- **Read**: Hiển thị danh sách người dùng
- **Update**: Chỉnh sửa thông tin người dùng
- **Delete**: Xóa người dùng

### 2. Search (Tìm kiếm)
- Tìm kiếm theo tên người dùng
- Tìm kiếm theo email

### 3. Sort (Sắp xếp)
- Sắp xếp theo ID (tăng/giảm)
- Sắp xếp theo tên (A-Z/Z-A)
- Sắp xếp theo email (A-Z/Z-A)
- Sắp xếp theo ngày tạo (cũ-mới/mới-cũ)

## Cách sử dụng

### 1. Khởi động ứng dụng

```bash
# Terminal 1: Chạy JSON Server
npm run server

# Terminal 2: Chạy React App
npm start
```

### 2. Truy cập Account Manager

1. Đăng nhập vào hệ thống
2. Click vào tên người dùng ở header
3. Chọn "Account Manager" từ dropdown menu
4. Hoặc truy cập trực tiếp: `http://localhost:3000/account-manager`

### 3. Thêm người dùng mới

1. Click nút "Add User"
2. Điền thông tin người dùng:
   - **Full Name**: Họ và tên
   - **Email**: Địa chỉ email
   - **Password**: Mật khẩu (tối thiểu 6 ký tự)
   - **Confirm Password**: Xác nhận mật khẩu
3. Click "Add User"

### 4. Chỉnh sửa người dùng

1. Click nút Edit (biểu tượng bút chì) bên cạnh người dùng
2. Chỉnh sửa thông tin trong modal
3. Nếu không muốn thay đổi mật khẩu, để trống ô Password
4. Click "Update User"

### 5. Xóa người dùng

1. Click nút Delete (biểu tượng thùng rác) bên cạnh người dùng
2. Xác nhận xóa trong popup

### 6. Tìm kiếm người dùng

1. Nhập từ khóa vào ô tìm kiếm
2. Kết quả sẽ được lọc theo tên hoặc email

### 7. Sắp xếp người dùng

1. Click dropdown "Sort by" để chọn tiêu chí sắp xếp
2. Click vào header của cột để thay đổi thứ tự sắp xếp (tăng/giảm)

## Giao diện

### Bảng người dùng
- Hiển thị thông tin: ID, Avatar, Tên, Email, Ngày tạo
- Avatar mặc định với icon User
- Ngày tạo được format theo định dạng Việt Nam

### Modal thêm/chỉnh sửa
- Form validation cho các trường bắt buộc
- Validation mật khẩu:
  - Tối thiểu 6 ký tự
  - Phải khớp với Confirm Password
- Khi chỉnh sửa: có thể để trống Password để giữ nguyên
- Hiển thị ngày tạo (chỉ đọc) khi chỉnh sửa

## Tính năng bảo mật

### Validation
- Email phải đúng định dạng
- Mật khẩu tối thiểu 6 ký tự
- Mật khẩu và xác nhận mật khẩu phải khớp nhau
- Tên và email là bắt buộc

### Xác nhận
- Xác nhận trước khi xóa người dùng
- Thông báo thành công/lỗi cho mọi thao tác

## Lưu ý

- Cần có JSON Server chạy trên port 9999
- Dữ liệu được lưu trong file `database.json`
- Chỉ người dùng đã đăng nhập mới có thể truy cập Account Manager
- Khi chỉnh sửa người dùng, nếu không nhập mật khẩu mới thì sẽ giữ nguyên mật khẩu cũ
- Tất cả thao tác CRUD đều có thông báo thành công/lỗi
- Ngày tạo được tự động thêm khi tạo người dùng mới 