import React, { useEffect, useState, useRef, useMemo } from "react";
//Import Breadcrumb
const Web3 = require("web3");
import Moment from "react-moment";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Helmet } from "react-helmet";
import MUIDataTable from "mui-datatables";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    FormFeedback,
    Form,
    Label,
    Input,
    CardTitle,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
//redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HasAnyPermission from "../../common/Permission";
import hasPermission from "../../common/HasPermission";
import ReactDataTable from "../../common/ReactDataTable";
import isEmpty from "../../utils/isEmpty";
import { apiUrl } from "../../config";
import { getAllTransactions } from "../../store/bridge/actions"

import Swal from "sweetalert2";


const Bridge = (props) => {
    const dispatch = useDispatch();
    const { responseData } = useSelector((state) => ({
        responseData: state.bridge.responseData,
    }));
    console.log("🚀 ~ file: index.js:42 ~ const{responseData}=useSelector ~ responseData:", responseData)
    const [txData, setTxData] = useState();

    useEffect(() => {
        dispatch(getAllTransactions());
        getTransactions()
    }, []);

    useEffect(() => {       
        getTransactions()
    }, [responseData]);



    const datatableOptions = {
        filterType: "dropdown",
        selectableRows: false,
        responsive: "standard",
        sort: true,
        filter: false,
        download: false,
        // onTableChange: (action, state) => {
        //   console.error(action);
        //   console.dir(state);
        // }
    };

    const columns = [
        {
            name: "Created at",
            label: "Created at",
        },
        {
            name: "Amount",
            label: "Amount (LFI)",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "From Network",
            label: "From Network",
        },
        {
            name: "To Network",
            label: "To Network",
        },
        {
            name: "Status",
            label: "Status",
        },
        {
            name: "TX",
            label: "TX",
        },
    ];


    function getTransactions() {
        setTxData([]);

        if (responseData) {
            let allTx = responseData;
            let tempTable = [];

            for (let i = 0; i < allTx.length; i++) {
                tempTable.push([
                    <Moment format="D MMM YYYY - hh:mm A" key={i}>
                        {allTx[i].createdAt}
                    </Moment>,

                    (Web3.utils.fromWei(allTx[i].walletToBridge.amount) *
                        10 ** 10).toFixed(4),
                    // allTx[i].walletToBridge.amount,

                   allTx[i].walletToBridge.network,

                
                    allTx[i].walletToBridge.chainID,

                    <span key={i}>{(allTx[i].isCompleted == true) ? <span className="badge bg-success rounded-pill">Completed</span> : <span className="badge bg-danger rounded-pill">Failed</span>}</span>,

                    <span key={i} >{allTx[i].bridgeToWallet.transactionHash ?
                        <div className="d-flex align-items-center gap-1">
                            {allTx[i].bridgeToWallet.transactionHash.slice(0, 10)}
                            {"..."}
                            {allTx[i].bridgeToWallet.transactionHash.slice(
                                allTx[i].bridgeToWallet.transactionHash.length - 6
                            )}
                           
                        </div>
                        : "Not available"}</span>

                  
                ]);
            }
            // console.log(tempTable);
            setTxData(tempTable);
        }

    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Helmet>
                    <title>Bridge Settings | LFinance</title>
                </Helmet>


                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Bridge Settings" breadcrumbItem="Transactions" />
                    <Row>
                        <Col lg="12">
                            <CardBody className="px-0">
                                <div className="table-responsive">
                                    {txData ? (
                                        <MUIDataTable
                                            data={txData}
                                            columns={columns}
                                            options={datatableOptions}
                                        />
                                    ) : (
                                        "No transactions to show"
                                    )}
                                </div>
                            </CardBody>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Bridge;
