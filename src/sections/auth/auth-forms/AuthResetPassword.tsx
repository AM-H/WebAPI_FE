'use client';

import { useEffect, useState, SyntheticEvent } from 'react';

// next
import { useRouter } from 'next/navigation';
import axios from 'utils/axios';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { openSnackbar } from 'api/snackbar';
// import useLocalStorage from 'hooks/useLocalStorage';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// types
import { SnackbarProps } from 'types/snackbar';
import { StringColorProps } from 'types/password';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| Update - Password ||============================ //

export default function AuthResetPassword() {
  const router = useRouter();

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        acc_info: '',
        oldpass: '',
        newpass: '',
        newpass_retype: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        acc_info: Yup.string().max(255).required('Email or Username is required'),
        oldpass: Yup.string().max(255).required('Current password is required'),
        newpass: Yup.string()
          .min(12, 'Must be at least 12 characters')
          .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
          .matches(/[a-z]/, 'Must contain at least one lowercase letter')
          .matches(/\d/, 'Must contain at least one digit')
          .matches(/[@!#$%^&*(),.?":{}|<>]/, 'Must contain one special character')
          .required('New password is required'),
        newpass_retype: Yup.string()
          .required('New password is required')
          .oneOf([Yup.ref('newpass')], 'New passwords must match')
      })}
      onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
        // password reset
        axios
          .patch('c/update_password', {
            acc_info: values.acc_info,
            oldpass: values.oldpass,
            newpass: values.newpass,
            newpass_retype: values.newpass_retype
          })
          .then((response) => {
            setStatus({ success: true });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: response.data.message || 'Password changed successfully.',
              variant: 'alert',
              alert: { color: 'success' }
            } as SnackbarProps);

            setTimeout(() => {
              router.push('/sample-page');
            }, 2000);
          })
          .catch((error) => {
            console.error(error);

            setErrors({
              submit: error.response?.data?.message || 'Update password failed!'
            });
            setSubmitting(false);

            openSnackbar({
              open: true,
              message: error.response?.data?.message || 'Update password failed!',
              variant: 'alert',
              alert: { color: 'error' }
            } as SnackbarProps);
          });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="acc_info"
              label="Email or Username"
              value={values.acc_info}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.acc_info && errors.acc_info)}
              helperText={touched.acc_info && errors.acc_info}
              placeholder="Enter you email or username"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="oldpass">Current Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="oldpass"
                name="oldpass"
                type={showPassword ? 'text' : 'password'}
                value={values.oldpass}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.oldpass && errors.oldpass)}
                placeholder="Enter current password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
            {touched.oldpass && errors.oldpass && (
              <FormHelperText error id="helper-text-oldpass">
                {errors.oldpass}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="newpass">New Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="newpass"
                name="newpass"
                type={showPassword ? 'text' : 'password'}
                value={values.newpass}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                error={Boolean(touched.newpass && errors.newpass)}
                placeholder="Enter new password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
            {touched.newpass && errors.newpass && (
              <FormHelperText error id="helper-text-newpass">
                {errors.newpass}
              </FormHelperText>
            )}
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    sx={{
                      bgcolor: level?.color ?? '#eee',
                      width: 85,
                      height: 8,
                      borderRadius: '7px'
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="newpass_retype">Confirm New Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="newpass_retype"
                name="newpass_retype"
                type={showPassword ? 'text' : 'password'}
                value={values.newpass_retype}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.newpass_retype && errors.newpass_retype)}
                placeholder="Re-enter new password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="secondary"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
            {touched.newpass_retype && errors.newpass_retype && (
              <FormHelperText error id="helper-text-newpass_retype">
                {errors.newpass_retype}
              </FormHelperText>
            )}
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                {isSubmitting ? 'Updating…' : 'Update Password'}
              </Button>
            </AnimateButton>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
