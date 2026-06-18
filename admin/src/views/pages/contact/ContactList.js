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
  CFormInput,
} from '@coreui/react'
import secureLocalStorage from 'react-secure-storage'
import setting from '../../../setting.json'
import { useNavigate } from 'react-router-dom'

const ContactList = () => {
  const navigate = useNavigate()

  const [contacts, setContacts] = useState([])
  const [searchText, setSearchText] = useState('')

  const getAllContacts = async () => {
    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const response = await fetch(`${setting.api}/api/contact/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        setContacts(data.data)
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllContacts()
  }, [])

  const filteredContacts = contacts.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
      item.message.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <CCard className="shadow-sm border-0 rounded-4">
      <CCardHeader className="bg-dark text-white">
        <h5 className="mb-0">Contact Enquiry List</h5>
      </CCardHeader>

      <CCardBody>
        <div className="mb-3">
          <CFormInput
            placeholder="Search Name / Email / Phone"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <CTable hover bordered responsive align="middle">
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Message</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableDataCell>{index + 1}</CTableDataCell>

                  <CTableDataCell>{item.name}</CTableDataCell>

                  <CTableDataCell>{item.email}</CTableDataCell>

                  <CTableDataCell>{item.phone}</CTableDataCell>

                  <CTableDataCell style={{ maxWidth: '350px' }}>{item.message}</CTableDataCell>

                  <CTableDataCell>{new Date(item.createdAt).toLocaleDateString()}</CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={6} className="text-center">
                  No Contact Enquiry Found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default ContactList
