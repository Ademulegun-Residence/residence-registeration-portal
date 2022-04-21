export const getStreets = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/houses/streets`
  )
    .then((res) => res.json())
    .then((data) => {
      const response = data.data
      return response
    })
  return response
}

export const getHouses = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/houses`)
    .then((res) => res.json())
    .then((data) => {
      const response = data.data
      return response
    })
  return response
}

export const createResident = async (data) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/residents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      const response = data.data
      return response
    })

  return response
}

export const updateResident = async (id, data) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/residents/:${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.residentName,
        houseId: data.houseNumber,
        gender: data.gender,
        unitType: data.unitType,
        dateOfBirth: data.dateOfBirth,
        residentialStatus: data.status,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const response = data.data
      return response
    })
    .catch((err) => {
      return err
    })

  return response
}

export const addDependant = async (id, data) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/residents/:${id}/dependants`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.dependantName,
        gender: data.gender,
        dateOfBirth: data.dependantDateOfBirth,
        email: data.dependantEmail,
        phoneNumber: data.dependantPhoneNumber,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const response = data.data
      return response
    })
    .catch((err) => {
      return err
    })

  return response
}
