import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import setting from '../../../setting.json'
import EditorJSComponent from '../../../components/EditorJSComponent'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CCardHeader,
  CFormCheck,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import secureLocalStorage from 'react-secure-storage'
import { useParams } from 'react-router-dom'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup.number().required('Price is required'),
  discount: yup.number().min(0).max(100),
})

const UpdateProduct = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const [slugEdited, setSlugEdited] = useState(false)
  const [editingNews, setEditingNews] = useState(true)
  const [newsList, setNewsList] = useState([])
  const [categoriesList, setCategoryList] = useState([])
  const [content, setContent] = useState({})

  const [bannerPreview, setBannerPreview] = useState(null)

  const [galleryPreview, setGalleryPreview] = useState([null, null, null])

  const [loading, setLoading] = useState(false)

  const validateImage = (file) => {
    if (!file) return false

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG and WEBP images are allowed')
      return false
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2 MB')
      return false
    }

    return true
  }

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
      title: '',
      price: '',
      discount: 0,
      final_price: 0,
      categories: [],
      thumbnail: null,
      gallery1: null,
      gallery2: null,
      gallery3: null,
    },
  })

  const getProduct = async () => {
    try {
      const res = await fetch(setting.api + `/api/products/${id}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(secureLocalStorage.getItem('logininfo')).token,
        },
      })

      const data = await res.json()

      if (data.success) {
        const product = data.data

        // 🔥 SET FORM VALUES
        setValue('title', product.title)
        setValue('price', product.price)
        setValue('discount', product.discount || 0)
        setValue('final_price', product.final_price || product.price)
        setValue(
          'categories',
          product.categories.map((c) => c._id),
        )

        // Set Editor Content
        setContent(
          typeof product.content === 'string' ? JSON.parse(product.content) : product.content || {},
        )

        setBannerPreview(product.thumbnail)

        setGalleryPreview([
          product.gallery?.[0] || null,
          product.gallery?.[1] || null,
          product.gallery?.[2] || null,
        ])
      }
    } catch (err) {
      console.error('Get product error:', err)
    }
  }

  const formDataValues = watch()
  const price = watch('price')
  const discount = watch('discount')

  const toggleCategory = (id) => {
    const alreadySelected = formDataValues.categories.includes(id)
    const newCategories = alreadySelected
      ? formDataValues.categories.filter((c) => c !== id)
      : [...formDataValues.categories, id]
    setValue('categories', newCategories)
  }

  const getAllCategory = async () => {
    await fetch(setting.api + '/api/categories/getAllCategory', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(secureLocalStorage.getItem('logininfo')).token,
      },
    })
      .then((response) => response.json())
      .then((u) => {
        if (u.status == false) {
          secureLocalStorage.clear()
          navigate('/login')
        } else {
          setCategoryList(u.data)
          console.log(u.data)
        }
      })
  }

  useEffect(() => {
    getAllCategory()
    getProduct()
  }, [])

  const updateProduct = async (data) => {
    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('title', data.title)
      formData.append('price', data.price)
      formData.append('discount', data.discount)
      formData.append('final_price', data.final_price)
      formData.append('categories', JSON.stringify(data.categories))
      formData.append('content', JSON.stringify(content))

      if (data.thumbnail?.[0]) {
        formData.append('thumbnail', data.thumbnail[0])
      }

      if (data.gallery1?.[0]) {
        formData.append('gallery1', data.gallery1[0])
      }

      if (data.gallery2?.[0]) {
        formData.append('gallery2', data.gallery2[0])
      }

      if (data.gallery3?.[0]) {
        formData.append('gallery3', data.gallery3[0])
      }

      const res = await fetch(`${setting.api}/api/products/update/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(secureLocalStorage.getItem('logininfo')).token,
        },
        body: formData,
      })

      const result = await res.json()

      if (result.success) {
        toast.success('Product updated successfully')

        setTimeout(() => {
          navigate('/ProductList')
        }, 1000)
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const p = Number(price) || 0
    const d = Number(discount) || 0

    const finalPrice = p - (p * d) / 100

    setValue('final_price', finalPrice.toFixed(2))
  }, [price, discount, setValue])

  return (
    <div className="d-flex flex-column flex-lg-row gap-4">
      <CCol lg={12}>
        <CCard className="shadow border-0 rounded-4">
          <CCardHeader className="bg-dark text-white fw-bold px-4 py-3 shadow-sm">
            <h5 className="mb-0">{editingNews ? 'Update Product' : 'Create Product'}</h5>
          </CCardHeader>

          <CCardBody>
            <CForm onSubmit={handleSubmit(updateProduct)}>
              <CRow className="mb-2">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    label="Title"
                    placeholder="Enter Title"
                    {...register('title')}
                    onChange={(e) => {
                      setValue('title', e.target.value)
                      setSlugEdited(false)
                    }}
                  />
                  {errors.title && <small className="text-danger">{errors.title.message}</small>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={4}>
                  <CFormInput
                    type="number"
                    label="Original Price"
                    placeholder="1000"
                    {...register('price')}
                  />
                  {errors.price && <small className="text-danger">{errors.price.message}</small>}
                </CCol>

                <CCol md={4}>
                  <CFormInput
                    type="number"
                    label="Discount (%)"
                    placeholder="10"
                    {...register('discount')}
                  />
                </CCol>

                <CCol md={4}>
                  <CFormInput
                    type="number"
                    label="Final Price"
                    readOnly
                    className="bg-light fw-bold"
                    {...register('final_price')}
                  />
                </CCol>
              </CRow>

              <CRow></CRow>

              <CRow>
                <CCol md={12} className="mb-2">
                  <p className="mb-2 ">Select Categories</p>
                  <CDropdown>
                    <CDropdownToggle color="secondary">
                      {formDataValues.categories.length > 0
                        ? categoriesList
                            .filter((cat) => formDataValues.categories.includes(cat._id))
                            .map((cat) => cat.name)
                            .join(', ')
                        : 'Select Categories'}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      {categoriesList.map((cat) => {
                        const isSelected = formDataValues.categories.includes(cat._id)
                        return (
                          <CDropdownItem key={cat.id}>
                            <CFormCheck
                              id={`cat-${cat._id}`}
                              label={cat.name}
                              checked={isSelected}
                              onChange={() => toggleCategory(cat._id)}
                            />
                          </CDropdownItem>
                        )
                      })}
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
              </CRow>

              <CRow>
                <CCol md={12} className="mb-2">
                  <div
                    style={{
                      width: '100%',
                      height: '250px',
                      margin: '0 auto',

                      padding: '10px',
                      borderRadius: '8px',
                      overflowY: 'auto',
                    }}
                  >
                    <label className="fw-semibold mb-2">Description</label>
                    <EditorJSComponent data={content} onChange={setContent} />
                  </div>

                  <CCol md={12} className="mb-3">
                    <label className="fw-bold mb-2">Banner Image</label>

                    <div className="border rounded p-3 text-center">
                      {bannerPreview ? (
                        <img
                          src={
                            bannerPreview.startsWith('blob:')
                              ? bannerPreview
                              : `${setting.api}/uploads/images/${bannerPreview}`
                          }
                          style={{
                            width: '100%',
                            height: 220,
                            objectFit: 'cover',
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: 220,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          No Banner
                        </div>
                      )}

                      <CFormInput
                        className="mt-3"
                        type="file"
                        accept="image/*"
                        {...register('thumbnail')}
                        onChange={(e) => {
                          const file = e.target.files[0]

                          if (!validateImage(file)) {
                            e.target.value = ''
                            return
                          }

                          setBannerPreview(URL.createObjectURL(file))
                        }}
                      />
                      {bannerPreview && (
                        <button
                          type="button"
                          className="btn btn-danger mt-3 ms-2"
                          onClick={() => {
                            setBannerPreview(null)
                            setValue('thumbnail', null)
                          }}
                        >
                          Remove Banner
                        </button>
                      )}
                    </div>

                    <CRow className="mt-4">
                      {[0, 1, 2].map((index) => (
                        <CCol md={4} key={index}>
                          <div className="border rounded p-3 shadow-sm text-center">
                            <h6>Gallery {index + 1}</h6>

                            {galleryPreview[index] ? (
                              <img
                                src={
                                  galleryPreview[index].startsWith('blob:')
                                    ? galleryPreview[index]
                                    : `${setting.api}/uploads/images/${galleryPreview[index]}`
                                }
                                style={{
                                  width: '100%',
                                  height: 180,
                                  objectFit: 'cover',
                                  borderRadius: 10,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  height: 180,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  background: '#f7f7f7',
                                  borderRadius: 10,
                                }}
                              >
                                No Image
                              </div>
                            )}

                            <CFormInput
                              className="mt-3"
                              type="file"
                              accept="image/*"
                              {...register(`gallery${index + 1}`)}
                              onChange={(e) => {
                                const file = e.target.files[0]

                                if (!validateImage(file)) {
                                  e.target.value = ''
                                  return
                                }

                                const temp = [...galleryPreview]

                                temp[index] = URL.createObjectURL(file)

                                setGalleryPreview(temp)
                              }}
                            />

                            {galleryPreview[index] && (
                              <button
                                type="button"
                                className="btn btn-outline-danger mt-2"
                                onClick={() => {
                                  const temp = [...galleryPreview]

                                  temp[index] = null

                                  setGalleryPreview(temp)

                                  setValue(`gallery${index + 1}`, null)
                                }}
                              >
                                Remove Image
                              </button>
                            )}
                          </div>
                        </CCol>
                      ))}
                    </CRow>
                  </CCol>
                </CCol>
              </CRow>

              <div className="d-flex justify-content-end mt-4">
                <CButton color="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Updating...
                    </>
                  ) : (
                    'Update Product'
                  )}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}

export default UpdateProduct
