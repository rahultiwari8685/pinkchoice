import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import setting from '../../../setting.json'
import secureLocalStorage from 'react-secure-storage'

const schema = yup.object().shape({
  heading: yup.string().required('Heading is required'),
  description: yup.string().required('Description is required'),
  buttonText: yup.string().required('Button Text is required'),
  buttonLink: yup.string().required('Button Link is required'),
})

const TeamSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    getSection()
  }, [])

  const getSection = async () => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const res = await fetch(`${setting.api}/api/team-section`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()

      if (result.success) {
        reset({
          heading: result.data.heading,
          description: result.data.description,
          buttonText: result.data.buttonText,
          buttonLink: result.data.buttonLink,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const saveSection = async (data) => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const res = await fetch(`${setting.api}/api/team-section`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        alert('Section Updated Successfully')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CCard className="shadow border-0 rounded-4">
      <CCardHeader className="bg-dark text-white">
        <h5 className="mb-0">Team Section Settings</h5>
      </CCardHeader>

      <CCardBody>
        <CForm onSubmit={handleSubmit(saveSection)}>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormInput label="Heading" {...register('heading')} />

              {errors.heading && <small className="text-danger">{errors.heading.message}</small>}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={12}>
              <CFormTextarea rows={5} label="Description" {...register('description')} />

              {errors.description && (
                <small className="text-danger">{errors.description.message}</small>
              )}
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput label="Button Text" {...register('buttonText')} />
            </CCol>

            <CCol md={6}>
              <CFormInput label="Button Link" {...register('buttonLink')} />
            </CCol>
          </CRow>

          <div className="text-end">
            <CButton color="success" type="submit">
              Save Changes
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default TeamSection
