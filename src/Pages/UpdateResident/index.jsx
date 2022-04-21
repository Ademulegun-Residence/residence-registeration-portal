import { useEffect, useState } from 'react'
import { getStreets, getHouses, updateResident } from '../../api'
import { updateResidentValidation } from '../../utils/validation'
import Dependant from '../Dependant'

import { unitType } from './data'

import '../Home/home.css'

const UpdateResident = ({ residentId, goBack }) => {
  const [streets, setStreets] = useState([])
  const [houses, setHouses] = useState([])
  const [filteredHouses, setFilteredHouses] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [addDependant, setAddDependant] = useState(false)

  const [inputs, setInputs] = useState({
    residentName: '',
    dateOfBirth: '',
    street: '',
    houseNumber: '',
    status: '',
    gender: '',
    unitType: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const streets = await getStreets()
      const houses = await getHouses()
      setStreets(streets)
      setHouses(houses)
      setFilteredHouses(houses)
    }
    fetchData()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === 'street') {
      let filteredHouse = houses?.filter((house) =>
        house.streetName.includes(value)
      )
      setFilteredHouses(filteredHouse)
    }

    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateResidentValidation
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        setLoading(true)
        const response = await updateResident(residentId, inputs)
        if (response !== undefined) {
          setLoading(false)
          setInputs({})
          goBack()
        }
      })
      .catch((err) => {
        let errList = {}
        err.inner.forEach((e) => {
          errList = { ...errList, [e.path]: e.message }
        })
        setErrors(errList)
      })
  }

  console.log(inputs)
  return (
    <div>
      {addDependant ? (
        <Dependant residentId={residentId} goBack={goBack} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1 className='home-logo' onClick={() => goBack()}>
              ASRA
            </h1>
            <button
              className='transparent-btn-style'
              onClick={() => setAddDependant(true)}
            >
              Add Dependant
            </button>
          </div>
          <form
            className='inputs-container'
            style={{ marginTop: '50px' }}
            onSubmit={handleSubmit}
          >
            <input
              className='input-style'
              type='text'
              name='residentName'
              placeholder='Enter your name'
              onChange={handleInputChange}
            />
            <span className='errorStyle'>{errors?.residentName}</span>
            <span className='floating-label'>Date of birth</span>
            <input
              className='input-style'
              type='date'
              name='dateOfBirth'
              placeholder='Date of birth'
              onChange={handleInputChange}
            />
            <span className='errorStyle'>{errors?.dateOfBirth}</span>
            <select
              className='input-style'
              style={{ width: '100%' }}
              name='street'
              onChange={handleInputChange}
            >
              <option value='' selected disabled>
                Street
              </option>
              {streets?.map((street) => {
                return <option value={street}>{street}</option>
              })}
            </select>
            <span className='errorStyle'>{errors?.street}</span>
            <select
              className='input-style'
              style={{ width: '100%' }}
              name='houseNumber'
              onChange={handleInputChange}
            >
              <option value='' selected disabled>
                House No
              </option>

              {filteredHouses?.map((house) => {
                return <option value={house.id}>{house.houseNo}</option>
              })}
            </select>
            <span className='errorStyle'>{errors?.houseNumber}</span>
            <select
              className='input-style'
              style={{ width: '100%' }}
              name='status'
              onChange={handleInputChange}
            >
              <option value='' selected disabled>
                Status of Residence
              </option>
              <option value='tenant'>Tenant</option>
              <option value='landlord'>Landlord</option>
            </select>
            <span className='errorStyle'>{errors?.status}</span>
            <select
              className='input-style'
              style={{ width: '100%' }}
              name='gender'
              onChange={handleInputChange}
            >
              <option value='' selected disabled>
                Gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <span className='errorStyle'>{errors?.gender}</span>
            <select
              className='input-style'
              style={{ width: '100%' }}
              name='unitType'
              onChange={handleInputChange}
            >
              <option value='' selected disabled>
                Unit Type
              </option>
              {unitType.map((unitType) => {
                return <option value={unitType}>{unitType}</option>
              })}
            </select>
            <span className='errorStyle'>{errors?.unitType}</span>
            <button className='button-style'>
              {loading ? (
                <div className='LoadingWrapper'>
                  <div className='BtnLoading'></div>
                </div>
              ) : (
                'Update Residents Info'
              )}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default UpdateResident
