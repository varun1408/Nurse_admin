import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Modal, Button, Spinner } from 'react-bootstrap';
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import IMG01 from "../../assets/images/doctor-thumb-01.jpg";
import IMG02 from "../../assets/images/doctor-thumb-02.jpg";
import IMG03 from "../../assets/images/doctor-thumb-03.jpg";
import IMG04 from "../../assets/images/doctor-thumb-04.jpg";
import IMG05 from "../../assets/images/doctor-thumb-01.jpg";
import IMG06 from "../../assets/images/doctor-thumb-02.jpg";
import IMG07 from "../../assets/images/doctor-thumb-03.jpg";
import IMG08 from "../../assets/images/doctor-thumb-04.jpg";

import { getNurses, deleteNurse, importNurses } from "../../redux/actions/NurseActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import CSVReader from "react-csv-reader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import sampleNurseImportFormat from '../../assets/nurse-imoort-format.csv';

class Nurses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modelShow: null,
      selectedRecord: null,
      rowsPerPage: 10,
      page: 1,
    };
  }
  
  componentDidMount(){
    this.props.getNurses({ 'limit': this.state.rowsPerPage, 'page': (this.state.page) })
  }

  handleModelClose=()=>{
    this.setState({
      modelShow: false,
      selectedRecord: null
    });
  }

  handleModelShow=(operation, recordId = '')=>{
    this.setState({
      modelShow: operation
    });
    if (recordId) {
      this.setState({selectedRecord: recordId})
    }
  }

  handleChange = (pagination, filters, sorter, extra: { action: paginate | sort | filter }) => {
    /* console.log('pagination: ', pagination)
    console.log('filters: ', filters)
    console.log('sorter: ', sorter)
    console.log('extra: ', extra) */
    if (extra.action == 'sort') {
      this.props.getNurses({ 'sortBy': sorter.field, 'sortOrder': sorter.order=='ascend' ? 'asc' : 'desc' ,'limit': this.state.rowsPerPage, 'page': (this.state.page) }) 
    }
  }

  handleChangePage = (page, rowsPerPage) => {
    this.setState({ 'page': page, 'rowsPerPage': rowsPerPage })
    this.props.getNurses({ 'limit': rowsPerPage, 'page': page })
  }

  handleFileUpload = (data, fileInfo) => {
    // console.log(data, fileInfo);
    // console.log(data.length)
    this.setState({fileUploadErrorMessage: ''});
    if (data.length > 100) {
      this.setState({fileUploadErrorMessage: 'You can only import at max 100 records at a time.'});
    } else {
      this.props.importNurses(data).then(()=>{
        if(this.props.nurse.importNurseSuccess) {
          this.handleModelClose();
          toast('Records have been imported successfully!', {type: 'success'});
          this.props.getNurses();
        }
      });
    }
  }

  fileUploadParseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    //transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  handleDeleteNurse=(nurseId)=>{
    this.props.deleteNurse(this.state.selectedRecord); 
    this.handleModelClose();
  }

  render() {
    const data = (this.props.nurse.NurseList && this.props.nurse.NurseList.results) ? this.props.nurse.NurseList.results : [];

    const columns = [
      {
        title: "Name",
        render: (text, record) => (
          <h2 className="table-avatar">
            <Link to="#" className="avatar avatar-sm mr-2">
              <img alt="" src={record.image || IMG01} />
            </Link>
            <Link to="#">{record.firstName} {record.lastName}</Link>
          </h2>
        ),
        sorter: true,
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: "Email",
        dataIndex: "email",
        key: 'email',
        sorter: true,
      },
      {
        title: "Hospital / Facility",
        dataIndex: "hospitalOrFacility",
        key: 'hospitalOrFacility'
      },
      /* {
        title: "Phone",
        dataIndex: "phone",
        sorter: (a, b) => a.Phone.length - b.Phone.length,
      }, */
			{
			  title: 'Actions',
			  render: (text, record) => (
          <div className="actions">
            <a href="#0" className="btn btn-sm bg-success-light" disabled><i className="fe fe-pencil"></i> Edit</a>
            <a href="#0" className="btn btn-sm bg-danger-light" onClick={()=>this.handleModelShow('delete', record.id)}><i className="fe fe-trash"></i> Delete</a>
          </div>
        ),
			}
    ];

    return (
      <>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <ToastContainer />
            <div className="page-header">
              <div className="row">
                <div className="col-sm-7 col-auto">
                  <h3 className="page-title">List of Nurses</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Nurses</li>
                  </ul>
                </div>
                <div className="col-sm-5 col text-right">
                  <Link to="/nurses/add" className="btn btn-primary mt-2">
                  Add</Link>
                  <a href="#" className="btn btn-info mt-2" onClick={()=>this.handleModelShow('import')}>Import</a>
							</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table
                        className="table-striped"
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={data}
                        rowKey={(record) => record.id}
                        showSizeChanger={true}
                        loading={(this.props.nurse && this.props.nurse.nurseLoading) ? true : false}
                        pagination={{
                          total: (this.props.nurse.NurseList && this.props.nurse.NurseList.totalResults) ? this.props.nurse.NurseList.totalResults : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                          current: this.state.page,
                          pageSize: this.state.rowsPerPage,
                          showLessItems: true,
                          onChange: this.handleChangePage,
                        }}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
				  <Modal show={this.state.modelShow === 'delete'} onHide={this.handleModelClose} centered animation={false}>            
            <Modal.Body className="text-center">
							<div className="form-content p-2">
								<h4 className="modal-title">Delete</h4>
								<p className="mb-4">Are you sure want to delete?</p>
								<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>this.handleDeleteNurse(this.state.selectedRecord)}>Yes</button>
                <button type="button" className="btn btn-primary" onClick={this.handleModelClose}>No</button>
							</div>
            </Modal.Body>
          </Modal>
				  {/* Delete Modal */}

          {/* Import Modal */}
				  <Modal show={this.state.modelShow === 'import'} onHide={this.handleModelClose} centered animation={false}>            
            <Modal.Body className="text-center">
							<div className="form-content p-2">
                <div className="container">
                {this.props.nurse.importNurseLoading ? (
                  <div className="d-flex justify-content-center"><Spinner animation="grow" variant="dark" /></div>
                ) : (
                  <>
                  <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV : "
                    onFileLoaded={this.handleFileUpload.bind(this)}
                    parserOptions={this.fileUploadParseOptions}
                  />
                  <p className="text-danger">{this.state.fileUploadErrorMessage}</p>
                  <p>
                    <i className="fas fa-exclamation-triangle" />
                    CSV file of customers data should be like: <a href={sampleNurseImportFormat} download="nurse-import-format">Sample file</a>
                  </p>
                  </>
                )}
          </div>
							</div>
            </Modal.Body>
          </Modal>
				  {/* Import Modal */}

        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  getNurses: PropTypes.func.isRequired,
  deleteNurse: PropTypes.func.isRequired,
  importNurses: PropTypes.func.isRequired,
  nurse: state.nurse
});

export default withRouter(
  connect(
    mapStateToProps,
    { getNurses, deleteNurse, importNurses }
  )(Nurses)
);