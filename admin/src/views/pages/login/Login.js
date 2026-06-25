import React from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import { cilUser, cilLockLocked } from '@coreui/icons'
import setting from '../../../setting.json'
import secureLocalStorage from 'react-secure-storage'

const schema = yup.object().shape({
  email: yup.string().email().required('Enter your valid email'),
  password: yup.string().required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const login = (data) => {
    // navigate('/dashboard')
    let lg = {
      email: data.email,
      password: data.password,
    }

    fetch(setting.api + '/api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lg),
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((dd) => {
        if (dd.result === 'success') {
          secureLocalStorage.setItem('logininfo', JSON.stringify({ ...dd.user, token: dd.token }))
          navigate('/dashboard')
        } else {
          alert(dd.message || 'Login failed')
        }
      })
      .catch((error) => console.error(error))
  }

  return (
    <CContainer fluid className="p-0">
      <CRow
        className="g-0 min-vh-100"
        style={{
          background: 'linear-gradient(135deg,#0a0f24,#101426)',
        }}
      >
        {/* LEFT PANEL */}

        <CCol lg={4} md={5} className="d-none d-md-flex" style={styles.leftPane}>
          <div style={styles.leftContent}>
            <h1 style={styles.title}>Pink Choice</h1>

            <p style={styles.subtitle}>
              Data-driven political insights, leader performance analysis, sentiment tracking and
              dashboard analytics.
            </p>

            <div style={styles.highlights}>
              <p>✓ AI Powered Reports</p>
              <p>✓ Real-time Dashboard</p>
              <p>✓ Analytics & Insights</p>
              <p>✓ Secure Login</p>
            </div>
          </div>
        </CCol>

        {/* RIGHT PANEL */}

        <CCol lg={8} md={7} xs={12} style={styles.rightPane}>
          <CCard style={styles.card}>
            <CCardBody>
              <h2 className="text-center mb-4" style={styles.loginTitle}>
                Login to Your Dashboard
              </h2>

              <CForm onSubmit={handleSubmit(login)}>
                {/* Email */}

                <CInputGroup className="mb-3">
                  <CInputGroupText style={styles.iconBox}>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>

                  <CFormInput
                    type="email"
                    placeholder="Email Address"
                    style={styles.input}
                    {...register('email')}
                  />
                </CInputGroup>

                {errors.email && <p style={styles.error}>{errors.email.message}</p>}

                {/* Password */}

                <CInputGroup className="mb-3">
                  <CInputGroupText style={styles.iconBox}>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>

                  <CFormInput
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                    {...register('password')}
                  />
                </CInputGroup>

                {errors.password && <p style={styles.error}>{errors.password.message}</p>}

                <CButton type="submit" className="w-100 mt-3" style={styles.button}>
                  Sign In
                </CButton>
              </CForm>

              <p className="text-center mt-3" style={styles.signupText}>
                Don't have an account? <span style={styles.signupLink}>Contact Admin</span>
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    background: 'linear-gradient(135deg, #0a0f24 0%, #101426 100%)',
    color: '#fff',
  },

  leftPane: {
    background:
      "url('https://cdn.dribbble.com/users/1355613/screenshots/15657654/media/2da52d3a3d55c97c2abb83378574b88e.png') center center / cover no-repeat",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
    minHeight: '100vh',
  },

  rightPane: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    minHeight: '100vh',
  },

  leftContent: {
    maxWidth: '500px',
    backdropFilter: 'blur(4px)',
    padding: '20px',
  },

  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#21d4fd',
  },

  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '25px',
    color: '#c7d3ff',
    lineHeight: '1.5',
  },

  highlights: {
    fontSize: '1rem',
    color: '#fff',
    lineHeight: '1.8',
  },

  card: {
    width: '100%',
    maxWidth: '430px',
    background: 'rgba(255,255,255,.06)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '18px',
    padding: '20px',
  },

  loginTitle: {
    color: '#21d4fd',
    fontWeight: '700',
  },

  input: {
    background: 'rgba(255,255,255,.12)',
    color: '#fff',
    border: 'none',
  },

  iconBox: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    border: 'none',
    color: '#fff',
  },

  button: {
    background: 'linear-gradient(45deg, #21d4fd, #b721ff)',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '8px',
  },

  signupText: {
    color: '#ccc',
    marginTop: '10px',
  },

  signupLink: {
    color: '#21d4fd',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  error: {
    color: '#ff6b6b',
    fontSize: '0.8rem',
    marginTop: '-5px',
  },
}

export default Login
