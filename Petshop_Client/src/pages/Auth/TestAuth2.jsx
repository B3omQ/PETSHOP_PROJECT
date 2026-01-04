// components/TestAuth.jsx
import React, { useEffect, useState } from 'react';
import instance from '../../services/index'; // Import instance đã cấu hình withCredentials: true

const TestAuth2 = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("Chưa gọi API");

    const handleCheckProfile = async () => {
        setStatus("Đang gọi API...");
        try {
            // Gọi API bảo mật (/api/user/profile)
            // Axios sẽ TỰ ĐỘNG lấy cookie 'accesstoken' từ trình duyệt gửi kèm request này
            const res = await instance.get('/api/user/profile');

            console.log("Kết quả server trả về:", res.data);
            setData(res.data);
            setStatus("Thành công! (200 OK)");
        } catch (error) {
            console.error("Lỗi:", error);
            if (error.response?.status === 401) {
                setStatus("Thất bại (401): Server không tìm thấy Cookie hoặc Token hết hạn.");
            } else {
                setStatus("Lỗi khác: " + error.message);
            }
        }
    };
    

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Test gửi Cookie tự động</h3>
            <button onClick={handleCheckProfile} className="btn btn-primary">
                Gọi API Profile
            </button>

            <div style={{ marginTop: '10px' }}>
                <strong>Trạng thái: </strong> {status}
            </div>

            {data && (
                <pre style={{ background: '#f4f4f4', padding: '10px', marginTop: '10px' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default TestAuth2;