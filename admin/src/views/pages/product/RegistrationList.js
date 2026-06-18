import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
} from '@coreui/react'
import { cilZoom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import setting from '../../../setting.json'

const RegistrationList = () => {
  const navigate = useNavigate()

  const [registrations, setRegistrations] = useState([])
  const [searchText, setSearchText] = useState('')

  const getAllRegistrations = async () => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const response = await fetch(`${setting.api}/api/business/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        setRegistrations(data.data)
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRegistrations()
  }, [])

  const filteredList = registrations.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.mobile.includes(searchText),
  )

  return (
    <CCard className="shadow-sm border-0 rounded-4">
      <CCardHeader className="bg-dark text-white">
        <h5 className="mb-0">Business Registration List</h5>
      </CCardHeader>

      <CCardBody>
        <div className="mb-3">
          <CFormInput
            placeholder="Search Name / Email / Mobile"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <CTable hover bordered responsive align="middle">
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Company</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Mobile</CTableHeaderCell>
              <CTableHeaderCell>Monthly Sales</CTableHeaderCell>
              <CTableHeaderCell>Yearly Turnover</CTableHeaderCell>
              <CTableHeaderCell>Experience</CTableHeaderCell>
              <CTableHeaderCell>Business Address</CTableHeaderCell>
              <CTableHeaderCell>Residential Address</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredList.length > 0 ? (
              filteredList.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1}</CTableDataCell>

                  <CTableDataCell>{item.name}</CTableDataCell>

                  <CTableDataCell>{item.company_name || '-'}</CTableDataCell>

                  <CTableDataCell>{item.email}</CTableDataCell>

                  <CTableDataCell>{item.mobile}</CTableDataCell>

                  <CTableDataCell>₹{item.monthly_sales}</CTableDataCell>

                  <CTableDataCell>₹{item.yearly_turnover}</CTableDataCell>

                  <CTableDataCell>{item.experience_years} Years</CTableDataCell>

                  <CTableDataCell style={{ maxWidth: '180px' }}>
                    {item.business_address}
                  </CTableDataCell>

                  <CTableDataCell style={{ maxWidth: '180px' }}>
                    {item.residential_address}
                  </CTableDataCell>

                  <CTableDataCell>{new Date(item.createdAt).toLocaleDateString()}</CTableDataCell>

                  <CTableDataCell>
                    <CButton
                      size="sm"
                      color="info"
                      onClick={() => navigate(`/BusinessDetails/${item._id}`)}
                    >
                      <CIcon icon={cilZoom} /> View
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={12} className="text-center">
                  No Registration Found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default RegistrationList
