import { useState } from "react";
import { addDependant } from "../../api";
import { addDependantValidation } from "../../utils/validation";
import { useNotificationCtx } from "../../context/notification";

import "../Home/home.css";

const Dependant = ({ residentId, goBack }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setNotification } = useNotificationCtx();
  const [inputs, setInputs] = useState({
    dependantName: "",
    dependantDateOfBirth: "",
    gender: "",
    dependantEmail: "",
    dependantPhoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDependantValidation
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        setLoading(true);
        const response = await addDependant(residentId, inputs);
        if (response !== undefined) {
          setNotification({
            type: "success",
            message: "Dependant created successfully",
          });
          setLoading(false);
          setInputs({});
          goBack();
        }
      })
      .catch((err) => {
        let errList = {};
        err.inner.forEach((e) => {
          errList = { ...errList, [e.path]: e.message };
        });
        setErrors(errList);
      });
  };
  return (
    <div>
      <h1 className='home-logo' onClick={() => goBack()}>
        ASRA
      </h1>

      <form
        className='inputs-container'
        style={{ marginTop: "50px" }}
        onSubmit={handleSubmit}
      >
        <input
          className='input-style'
          type='text'
          name='dependantName'
          placeholder='Enter your name'
          onChange={handleInputChange}
        />
        <span className='errorStyle'>{errors?.dependantName}</span>

        <span className='floating-label' style={{ top: "248px" }}>
          Date of birth
        </span>
        <input
          className='input-style'
          type='date'
          name='dependantDateOfBirth'
          placeholder='Date of birth'
          onChange={handleInputChange}
        />
        <span className='errorStyle'>{errors?.dependantDateOfBirth}</span>

        <select
          className='input-style'
          style={{ width: "100%" }}
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

        <input
          className='input-style'
          type='email'
          name='dependantEmail'
          placeholder='Enter Email (Optional)'
          onChange={handleInputChange}
        />
        <input
          className='input-style'
          type='tel'
          name='dependantPhoneNumber'
          placeholder='Enter Phone (Optional)'
          onChange={handleInputChange}
        />
        <button className='button-style'>
          {loading ? (
            <div className='LoadingWrapper'>
              <div className='BtnLoading'></div>
            </div>
          ) : (
            "Add Dependant"
          )}
        </button>
      </form>
    </div>
  );
};

export default Dependant;
