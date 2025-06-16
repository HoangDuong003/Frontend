import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AlertPopup from '../../components/common/AlertPopup';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const EMPLOYEE_KEY = 'employees';

const ProfileModal = ({ open, onClose }) => {
    const user = useSelector(state => state.auth.user) || JSON.parse(localStorage.getItem('currentUser'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (user) {
            const data = localStorage.getItem(EMPLOYEE_KEY);
            if (data) {
                const employees = JSON.parse(data);
                const emp = employees.find(e => e.id === user.id);
                if (JSON.stringify(employee) !== JSON.stringify(emp || user)) {
                    setEmployee(emp || user);
                }
            } else {
                if (JSON.stringify(employee) !== JSON.stringify(user)) {
                    setEmployee(user);
                }
            }
        }
        // eslint-disable-next-line
    }, [user]);

    const handleSave = () => {
        if (!editEmployee.name || !editEmployee.phone || !editEmployee.gender || !editEmployee.address) {
            setAlertMessage('Vui lòng nhập đầy đủ thông tin!');
            setOpenAlert(true);
            return;
        }
        // Cập nhật localStorage
        const data = localStorage.getItem(EMPLOYEE_KEY);
        if (data) {
            let employees = JSON.parse(data);
            employees = employees.map(e => e.id === editEmployee.id ? { ...e, ...editEmployee } : e);
            localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
        }
        setEmployee(editEmployee);
        setIsEditMode(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user || !employee) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, borderRadius: 2, minWidth: 400, maxWidth: 500 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Thông tin cá nhân</Typography>
                <AlertPopup open={openAlert} message={alertMessage} type="error" onClose={() => setOpenAlert(false)} />
                {!isEditMode ? (
                    <>
                        <Typography><b>Họ tên:</b> {employee.name}</Typography>
                        <Typography><b>Username:</b> {employee.username}</Typography>
                        <Typography><b>Email:</b> {employee.email}</Typography>
                        <Typography><b>Số điện thoại:</b> {employee.phone}</Typography>
                        <Typography><b>Giới tính:</b> {employee.gender}</Typography>
                        <Typography><b>Địa chỉ:</b> {employee.address}</Typography>
                        <Typography><b>Chức vụ:</b> {employee.position}</Typography>
                        <Typography><b>Văn phòng:</b> {employee.office}</Typography>
                        <Typography><b>Vai trò:</b> {employee.role}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button variant="contained" onClick={() => { setIsEditMode(true); setEditEmployee(employee); }}>Chỉnh sửa</Button>
                            <Button onClick={onClose}>Đóng</Button>
                            <Button color="error" variant="outlined" onClick={handleLogout}>Đăng xuất</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <TextField label="Họ tên" fullWidth sx={{ mb: 2 }} value={editEmployee.name} onChange={e => setEditEmployee({ ...editEmployee, name: e.target.value })} />
                        <TextField label="Số điện thoại" fullWidth sx={{ mb: 2 }} value={editEmployee.phone} onChange={e => setEditEmployee({ ...editEmployee, phone: e.target.value })} />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="gender-label">Giới tính</InputLabel>
                            <Select
                                labelId="gender-label"
                                value={editEmployee.gender}
                                label="Giới tính"
                                onChange={e => setEditEmployee({ ...editEmployee, gender: e.target.value })}
                            >
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                                <MenuItem value="Khác">Khác</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Địa chỉ" fullWidth sx={{ mb: 2 }} value={editEmployee.address} onChange={e => setEditEmployee({ ...editEmployee, address: e.target.value })} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button variant="contained" onClick={handleSave}>Lưu</Button>
                            <Button onClick={() => setIsEditMode(false)}>Hủy</Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default ProfileModal; 