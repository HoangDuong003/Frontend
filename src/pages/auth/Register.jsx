import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { authAPI } from '../../api/api';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  fullname: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  salary: Yup.number().required('Required'),
  startDate: Yup.string().required('Required'),
  roleId: Yup.number().required('Required'),
});

const Register = () => {
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      phone: '',
      address: '',
      salary: '',
      startDate: '',
      roleId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      try {
        await authAPI.register(values);
        setSuccess('Đăng ký thành công!');
      } catch (err) {
        setError(err.response?.data?.message || 'Đăng ký thất bại!');
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" align="center" gutterBottom>Đăng ký</Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField fullWidth margin="normal" id="email" name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
          <TextField fullWidth margin="normal" id="password" name="password" label="Password" type="password" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
          <TextField fullWidth margin="normal" id="fullname" name="fullname" label="Họ tên" value={formik.values.fullname} onChange={formik.handleChange} error={formik.touched.fullname && Boolean(formik.errors.fullname)} helperText={formik.touched.fullname && formik.errors.fullname} />
          <TextField fullWidth margin="normal" id="phone" name="phone" label="Số điện thoại" value={formik.values.phone} onChange={formik.handleChange} error={formik.touched.phone && Boolean(formik.errors.phone)} helperText={formik.touched.phone && formik.errors.phone} />
          <TextField fullWidth margin="normal" id="address" name="address" label="Địa chỉ" value={formik.values.address} onChange={formik.handleChange} error={formik.touched.address && Boolean(formik.errors.address)} helperText={formik.touched.address && formik.errors.address} />
          <TextField fullWidth margin="normal" id="salary" name="salary" label="Lương" type="number" value={formik.values.salary} onChange={formik.handleChange} error={formik.touched.salary && Boolean(formik.errors.salary)} helperText={formik.touched.salary && formik.errors.salary} />
          <TextField fullWidth margin="normal" id="startDate" name="startDate" label="Ngày bắt đầu" type="date" InputLabelProps={{ shrink: true }} value={formik.values.startDate} onChange={formik.handleChange} error={formik.touched.startDate && Boolean(formik.errors.startDate)} helperText={formik.touched.startDate && formik.errors.startDate} />
          <TextField fullWidth margin="normal" id="roleId" name="roleId" label="Role ID" type="number" value={formik.values.roleId} onChange={formik.handleChange} error={formik.touched.roleId && Boolean(formik.errors.roleId)} helperText={formik.touched.roleId && formik.errors.roleId} />
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 3 }}>Đăng ký</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register; 