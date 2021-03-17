import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Button, Form, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { addNurse } from "../../redux/actions/NurseActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter, Redirect } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.nurse && this.props.nurse.success) {
      this.props.history.push('/nurses')
    }
  }

  render() {
    //if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    const formValidationSchema = Yup.object({
      firstName: Yup.string().required('Please enter first name'),
      lastName: Yup.string().required('Please enter last name'),
      email: Yup.string().email('Invalid email address').required('Please enter email'),
      password: Yup.string().required('Please enter password').min(8, 'Password must be 8 characters long').matches(
        /\d/,
        "Password must contain at least 1 letter and 1 number"
      ).matches(/[a-zA-Z]/, "Password must contain at least 1 letter and 1 number"),
      hospitalOrFacility: Yup.string().required('Please enter hospital/facility'),
      about: Yup.string()
    });
    return (
      <>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <ToastContainer />
            <div className="page-header">
              <div className="row">
                <div className="col-sm-7 col-auto">
                  <h3 className="page-title">Add New Nurse</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/nurses">Nurses</Link>
                    </li>
                    <li className="breadcrumb-item active">Add New Nurse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <Formik
                      validationSchema={formValidationSchema}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                          this.props.addNurse(values).then((resp) => {
                            console.log(resp)
                          }).catch((err) => {
                            console.log(err)
                            setSubmitting(false);
                            toast('There is some issue in processing your request!', {type: 'error'});
                          })
                          //console.log(isSubmitting) CAN`T ACCESS IN FORMIKBAG
                          //setTimeout(() => {
                              //alert(JSON.stringify(values, null, 2));
                              //setSubmitting(false);
                              //storeUserProfile(values);
                          //}, 4000);
                      }}
                      //onSubmit={function(values) { console.log('v: ', values) }}
                      initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        hospitalOrFacility: '',
                        about: ''
                      }}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isInvalid,
                        errors,
                        isSubmitting
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Form.Row>
                            <Form.Group as={Col} sm="6" controlId="formFirstName">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                                placeholder="Enter first name"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="6" controlId="formLastName">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                                placeholder="Enter last name"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col} sm="6" controlId="formEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control 
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                placeholder="Enter email"
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="6" controlId="formPassword">
                              <Form.Label>Password</Form.Label>
                              <Form.Control 
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                placeholder="Enter password" 
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Form.Row>
                          <div className="row form-row">
                            <div className="col-12 col-sm-6">
                              <Form.Group controlId="hospitalOrFacility">
                                <Form.Label>Hospital / Facility</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  name="hospitalOrFacility"
                                  value={values.hospitalOrFacility}
                                  onChange={handleChange}
                                  isInvalid={!!errors.hospitalOrFacility}
                                  placeholder="Enter hospital/facility" 
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.hospitalOrFacility}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-12 col-sm-6">
                              <Form.Group controlId="about">
                                <Form.Label>About</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter about" name="about" onChange={handleChange} rows={3} />
                              </Form.Group>
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  addNurse: PropTypes.func.isRequired,
  nurse: state.nurse
});

export default withRouter(
  connect(
    mapStateToProps,
    { addNurse }
  )(AddNurse)
);