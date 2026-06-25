import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasBody,
  CPagination,
  CPaginationItem,
  CBadge,
} from '@coreui/react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import setting from '../../../setting.json'
import secureLocalStorage from 'react-secure-storage'

import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilCheckCircle, cilXCircle } from '@coreui/icons'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  designation: yup.string().required('Designation is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone is required'),
  sortOrder: yup.number().required('Sort Order is required'),
})

const Team = () => {
  const [teamList, setTeamList] = useState([])
  const [editingTeam, setEditingTeam] = useState(null)
  const [visible, setVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      designation: '',
      bio: '',
      email: '',
      phone: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      youtube: '',
      website: '',
      sortOrder: 0,
      status: true,
      image: null,
    },
  })

  const formValues = watch()

  useEffect(() => {
    if (editingTeam) {
      reset({
        name: editingTeam.name || '',
        designation: editingTeam.designation || '',
        bio: editingTeam.bio || '',
        email: editingTeam.email || '',
        phone: editingTeam.phone || '',
        facebook: editingTeam.facebook || '',
        instagram: editingTeam.instagram || '',
        linkedin: editingTeam.linkedin || '',
        twitter: editingTeam.twitter || '',
        youtube: editingTeam.youtube || '',
        website: editingTeam.website || '',
        sortOrder: editingTeam.sortOrder || 0,
        status: editingTeam.status,
      })

      if (editingTeam.image) {
        setPreviewImage(`${setting.api}/uploads/team/${editingTeam.image}`)
      }
    }
  }, [editingTeam, reset])

  useEffect(() => {
    getAllTeam()
  }, [])

  // ==========================
  // Get All Team Members
  // ==========================
  const getAllTeam = async () => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const response = await fetch(`${setting.api}/api/team`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setTeamList(result.data)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ==========================
  // Save / Update Team
  // ==========================
  const saveTeam = async (data) => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('designation', data.designation)
      formData.append('bio', data.bio)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('facebook', data.facebook)
      formData.append('instagram', data.instagram)
      formData.append('linkedin', data.linkedin)
      formData.append('twitter', data.twitter)
      formData.append('youtube', data.youtube)
      formData.append('website', data.website)
      formData.append('sortOrder', data.sortOrder)
      formData.append('status', data.status)

      if (data.image?.[0]) {
        formData.append('image', data.image[0])
      }

      let url = `${setting.api}/api/team`
      let method = 'POST'

      if (editingTeam) {
        url = `${setting.api}/api/team/${editingTeam._id}`
        method = 'PUT'
      }

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        alert(result.message)

        getAllTeam()

        reset()

        setEditingTeam(null)

        setPreviewImage('')

        setVisible(false)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ==========================
  // Edit Team
  // ==========================
  const handleEdit = (item) => {
    setEditingTeam(item)

    if (item.image) {
      setPreviewImage(`${setting.api}/uploads/images/${item.image}`)
    }

    setVisible(true)
  }

  // ==========================
  // Delete Team
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this member?')) return

    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const response = await fetch(`${setting.api}/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        alert(result.message)
        getAllTeam()
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ==========================
  // Change Status
  // ==========================
  const changeStatus = async (id) => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const response = await fetch(`${setting.api}/api/team/status/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        getAllTeam()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ==========================
  // Pagination
  // ==========================
  const totalPages = Math.ceil(teamList.length / itemsPerPage)

  const paginatedItems = teamList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div>
      <CCard className="shadow border-0 rounded-4">
        <CCardHeader className="bg-dark text-white px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-people-fill me-2 text-warning"></i>
              Team Members
            </h5>

            <CButton
              color="light"
              onClick={() => {
                reset({
                  name: '',
                  designation: '',
                  bio: '',
                  email: '',
                  phone: '',
                  facebook: '',
                  instagram: '',
                  linkedin: '',
                  twitter: '',
                  youtube: '',
                  website: '',
                  sortOrder: 0,
                  status: true,
                })

                setEditingTeam(null)
                setPreviewImage('')
                setVisible(true)
              }}
            >
              <CIcon icon={cilPlus} className="me-2" />
              Add Team
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <div className="d-flex justify-content-end mb-3">
            <CFormInput
              placeholder="Search Team..."
              style={{ width: 300 }}
              onChange={(e) => {
                const keyword = e.target.value.toLowerCase()

                setTeamList(
                  teamList.filter(
                    (item) =>
                      item.name.toLowerCase().includes(keyword) ||
                      item.designation.toLowerCase().includes(keyword),
                  ),
                )
              }}
            />
          </div>
          <CTable bordered striped hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell width="50">#</CTableHeaderCell>

                <CTableHeaderCell width="80">Image</CTableHeaderCell>

                <CTableHeaderCell>Name</CTableHeaderCell>

                <CTableHeaderCell>Designation</CTableHeaderCell>

                <CTableHeaderCell>Email</CTableHeaderCell>

                <CTableHeaderCell>Phone</CTableHeaderCell>

                <CTableHeaderCell>Status</CTableHeaderCell>

                <CTableHeaderCell width="220">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => {
                  const actualIndex = (currentPage - 1) * itemsPerPage + index

                  return (
                    <CTableRow key={item._id}>
                      <CTableDataCell>{actualIndex + 1}</CTableDataCell>

                      <CTableDataCell>
                        {item.image ? (
                          <img
                            src={`${setting.api}/uploads/team/${item.image}`}
                            width="60"
                            height="60"
                            className="rounded-circle border"
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                            style={{
                              width: 60,
                              height: 60,
                            }}
                          >
                            N/A
                          </div>
                        )}
                      </CTableDataCell>

                      <CTableDataCell>
                        <strong>{item.name}</strong>
                      </CTableDataCell>

                      <CTableDataCell>{item.designation}</CTableDataCell>

                      <CTableDataCell>{item.email}</CTableDataCell>

                      <CTableDataCell>{item.phone}</CTableDataCell>

                      <CTableDataCell>
                        <CBadge
                          color={item.status ? 'success' : 'danger'}
                          style={{
                            cursor: 'pointer',
                            padding: '8px 14px',
                            fontSize: 13,
                          }}
                          onClick={() => changeStatus(item._id)}
                        >
                          {item.status ? 'Active' : 'Inactive'}
                        </CBadge>
                      </CTableDataCell>

                      <CTableDataCell>
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2 rounded-pill"
                          onClick={() => handleEdit(item)}
                        >
                          <CIcon icon={cilPencil} className="me-1" />
                          Edit
                        </CButton>

                        <CButton
                          color="danger"
                          size="sm"
                          className="rounded-pill"
                          onClick={() => handleDelete(item._id)}
                        >
                          <CIcon icon={cilTrash} className="me-1" />
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={8} className="text-center">
                    No Team Member Found
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>

          <div className="d-flex justify-content-end mt-3">
            <CPagination>
              {[...Array(totalPages)].map((_, index) => (
                <CPaginationItem
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
            </CPagination>
          </div>
        </CCardBody>
      </CCard>
      {/* ====================== Offcanvas ====================== */}

      <COffcanvas
        placement="end"
        visible={visible}
        onHide={() => {
          setVisible(false)
          setEditingTeam(null)
          reset()
          setPreviewImage('')
        }}
        backdrop={true}
      >
        <COffcanvasHeader className="bg-dark text-white" closeButton>
          {editingTeam ? 'Update Team Member' : 'Create Team Member'}
        </COffcanvasHeader>

        <COffcanvasBody>
          <CForm onSubmit={handleSubmit(saveTeam)}>
            {/* Image */}

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput
                  type="file"
                  label="Profile Image"
                  accept="image/*"
                  {...register('image')}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setPreviewImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
              </CCol>
            </CRow>

            {previewImage && (
              <div className="text-center mb-4">
                <img
                  loading="lazy"
                  src={previewImage}
                  alt=""
                  width="120"
                  height="120"
                  className="rounded-circle border shadow"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}

            {/* Name */}

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput label="Full Name" placeholder="Enter Full Name" {...register('name')} />

                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </CCol>
            </CRow>

            {/* Designation */}

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput
                  label="Designation"
                  placeholder="CEO / Founder"
                  {...register('designation')}
                />

                {errors.designation && (
                  <small className="text-danger">{errors.designation.message}</small>
                )}
              </CCol>
            </CRow>

            {/* Bio */}

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormTextarea
                  rows={4}
                  label="Biography"
                  placeholder="Write short biography..."
                  {...register('bio')}
                />
              </CCol>
            </CRow>

            {/* Email + Phone */}

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput label="Email" placeholder="Email Address" {...register('email')} />

                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </CCol>

              <CCol md={6}>
                <CFormInput label="Phone" placeholder="Phone Number" {...register('phone')} />

                {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
              </CCol>
            </CRow>
            {/* Facebook + Instagram */}

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                  {...register('facebook')}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                  {...register('instagram')}
                />
              </CCol>
            </CRow>

            {/* LinkedIn + Twitter */}

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                  {...register('linkedin')}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  label="Twitter (X)"
                  placeholder="https://x.com/username"
                  {...register('twitter')}
                />
              </CCol>
            </CRow>

            {/* YouTube + Website */}

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  label="YouTube"
                  placeholder="https://youtube.com/@channel"
                  {...register('youtube')}
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  label="Website"
                  placeholder="https://example.com"
                  {...register('website')}
                />
              </CCol>
            </CRow>

            {/* Sort Order + Status */}

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="number"
                  label="Sort Order"
                  placeholder="0"
                  {...register('sortOrder')}
                />

                {errors.sortOrder && (
                  <small className="text-danger">{errors.sortOrder.message}</small>
                )}
              </CCol>

              <CCol md={6}>
                <CFormSelect label="Status" {...register('status')}>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </CFormSelect>
              </CCol>
            </CRow>

            {/* Buttons */}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <CButton
                color="secondary"
                onClick={() => {
                  setVisible(false)
                  setEditingTeam(null)
                  reset()
                  setPreviewImage('')
                }}
              >
                Cancel
              </CButton>

              <CButton color={editingTeam ? 'warning' : 'success'} type="submit">
                <CIcon icon={editingTeam ? cilPencil : cilCheckCircle} className="me-2" />

                {editingTeam ? 'Update Team Member' : 'Save Team Member'}
              </CButton>
            </div>
          </CForm>
        </COffcanvasBody>
      </COffcanvas>
    </div>
  )
}

export default Team
