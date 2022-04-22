import { useState } from "react";
import { createResident } from "../../api";
import { createResidentValidation } from "../../utils/validation";
import UpdateResident from "../UpdateResident";
import { useNotificationCtx } from "../../context/notification";
import "./home.css";

const Home = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [residentInfo, setResidentInfo] = useState({});
  const [updateResidentInfo, setUpdateResidentInfo] = useState(false);
  const { setNotification } = useNotificationCtx();

  const [inputs, setInputs] = useState({
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (event) => {
    setErrors({});
    event.preventDefault();
    createResidentValidation
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        setLoading(true);
        const response = await createResident(inputs);
        if (response !== undefined) {
          setNotification({
            type: "success",
            message: "Resident created successfully",
          });
          setLoading(false);
        }
        setResidentInfo(response);
        setUpdateResidentInfo(true);
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
    <div className='container-style'>
      {updateResidentInfo ? (
        <UpdateResident
          residentId={residentInfo?.id}
          goBack={() => setUpdateResidentInfo(false)}
          residentInfo={residentInfo}
        />
      ) : (
        <>
          <h1 className='home-logo'>ASRA</h1>

          <form className='inputs-container' onSubmit={handleSubmit}>
            <input
              className='input-style'
              type='text'
              name='email'
              placeholder='Enter Email'
              onChange={handleInputChange}
            />
            <span className='errorStyle'>{errors?.email}</span>
            <input
              className='input-style'
              type='text'
              name='phoneNumber'
              placeholder='Enter Phone'
              onChange={handleInputChange}
            />
            <span className='errorStyle'>{errors?.phoneNumber}</span>
            <button className='button-style'>
              {loading ? (
                <div className='LoadingWrapper'>
                  <div className='BtnLoading'></div>
                </div>
              ) : (
                "Update Residents Info"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Home;
