import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Product = React.lazy(() => import('./views/pages/product/Product'))

const Plans = React.lazy(() => import('./views/pages/plans/Plans'))
const Polls = React.lazy(() => import('./views/pages/polls/Polls'))
const Customers = React.lazy(() => import('./views/pages/customers/Customers'))
const UpdateProduct = React.lazy(() => import('./views/pages/product/UpdateProduct'))
const ProductList = React.lazy(() => import('./views/pages/product/ProductList'))
const RegistrationList = React.lazy(() => import('./views/pages/product/RegistrationList'))
const DraftBlog = React.lazy(() => import('./views/pages/product/DraftBlog'))
const DeletedBlog = React.lazy(() => import('./views/pages/product/DeletedBlog'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/ChangePassword'))
const ContactList = React.lazy(() => import('./views/pages/contact/ContactList'))

const Users = React.lazy(() => import('./views/pages/users/Users'))
const Category = React.lazy(() => import('./views/pages/category/Category'))
const Team = React.lazy(() => import('./views/pages/team/Team'))
const TeamSection = React.lazy(() => import('./views/pages/team/TeamSection'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/product', name: 'Product', element: Product },

  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/plans', name: 'Plans', element: Plans },
  { path: '/polls', name: 'Polls', element: Polls },
  { path: '/UpdateProduct/:id', name: 'Update Product', element: UpdateProduct },
  { path: '/ProductList', name: 'Product List', element: ProductList },
  { path: '/RegistrationList', name: 'Registration List', element: RegistrationList },
  { path: '/DraftBlog', name: 'Draft Blog', element: DraftBlog },
  { path: '/DeletedBlog', name: 'Deleted Blog', element: DeletedBlog },

  { path: '/ChangePassword', name: 'Change Password', element: ChangePassword },
  { path: '/ContactList', name: 'Contact List', element: ContactList },
  { path: '/Users', name: 'Users', element: Users },
  { path: '/Category', name: 'Category', element: Category },
  { path: '/Team', name: 'Team', element: Team },
  { path: '/TeamSection', name: 'Team Section', element: TeamSection },
]
export default routes
