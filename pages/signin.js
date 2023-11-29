import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { createUser, updateUser, deleteUser } from '../store/userSlice';
import Header from '../components/header'
import Footer from '../components/footer'
import Login from '../components/inputs/login'
import styles from '../styles/signin.module.scss'
import CircledIconBtn from '../components/buttons/circledIconBtn';
import DotLoaderSpinner from '../components/loaders/dotLoaders';

const country = {
  flag: '/images/country__flag.jpg',
  name: 'Nigeria',
  code: 'NGN'
}

// const initialValues = {
//   firstname: '',
//   lastname: '',
//   city: '',
//   street: '',
//   number: '', 
//   email: '',
//   lat: '',
//   long: '',
//   username: '',
//   password: '',
//   phone: '',
//   success: '',
//   error: '', 
// }

export default function Signin() {
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user.user)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target

    if ((name === 'firstname') || (name === 'lastname')) {
      dispatch(createUser({
        ...user, 
        name: {
          ...user.name,
          [name]: value
        }
      }))
    }

    if (
      name === 'city' || 
      name === 'street' ||
      name === 'number' ||
      name === 'zipcode' 
      // ||
      // name === 'lat' ||
      // name === 'long'
    ) {
      dispatch(createUser({
        ...user, 
        address: {
          ...user.address,
          [name]: value
        }
      }))
    }

    dispatch(createUser({
      ...user, 
      [name]: value
    }))
  }

  const loginValidation = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address is required'),
    password: Yup.string().required('Please enter a password')
  })

  const signInHandler = async () => {
    try {
      setLoading(true)

      const {data} = await axios.post('https://fakestoreapi.com/users', {
        email: user.email,
        username: user.username,
        password: user.password,
        name:{
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        },
        address:{
          city: user.address.city,
          street: user.address.street,
          number: user.address.number,
          zipcode: user.address.zipcode, 
          geolocation: user.address.geolocation,
        },
        phone: user.phone
      })
    
      if (data) {
        setError('')
        setSuccess(data.message)
        dispatch(createUser({
          ...user,
          id: data.id,
        }))
        setLoading(false)
        // setTimeout(() => router.push('/'), 3000)
      }
      
      else {
        setError('Something went wrong')
        setSuccess('')
        setLoading(false)
      }
      setTimeout(() => router.push('/'))
    } catch(e) {
      console.log(e)

      setLoading(false)
      setSuccess('')
      setError(e.response.data.message)
    }
  }

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading}/>}
      <Header country={country}/>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt/>
            </div>
            <span>
              You &#39; d be happy you joined us. <Link href={'/'}>Visit store</Link>
            </span>
          </div>
          <div className={styles.login__wrapper}>
            <div className={styles.login__form}>
              <h1>Sign in</h1>
              <p>Get access to one of the best E-Shopping in the world</p>
              <Formik
                enableReinitialize
                initialValues={{
                  email: user.email,
                  username: user.username,
                  password: user.password,
                  phone: user.phone,
                  firstname: user.name.firstname,
                  lastname: user.name.lastname,
                  city: user.address.city,
                  street: user.address.street,
                  number: user.address.number, 
                  zipcode: user.address.zipcode,
                  lat: user.address.geolocation.lat,
                  long: user.address.geolocation.long,
                }}
                validationSchema={loginValidation}
                onSubmit={() => signInHandler()}
              >
                {(form) => {
                  return <>
                    <Form>
                      <Login
                        type='text' 
                        icon='email'
                        name='email' 
                        placeholder={'Email Address'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='password' 
                        icon='password'
                        name='password' 
                        placeholder={'Password'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='firstname' 
                        placeholder={'First Name'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='lastname' 
                        placeholder={'Last Name'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='username' 
                        placeholder={'User Name'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='city' 
                        placeholder={'City'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='street' 
                        placeholder={'Street'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='number' 
                        placeholder={'Street Number'} 
                        onChange={handleChange}
                      />
                      <Login
                        type='text' 
                        icon='user'
                        name='zipcode' 
                        placeholder={'Zip Code'} 
                        onChange={handleChange}
                      />

                      <CircledIconBtn type='submit' text='Sign in'/>
                      {error && <span className={styles.error}>{error}</span>} 
                      <div className={styles.forgot}>
                        <Link href={'/'}>Forgot password ?</Link>
                      </div>
                    </Form>
                  </>
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </>
  )
}
