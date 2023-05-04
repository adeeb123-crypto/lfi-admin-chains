import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useMemo,
} from "react";
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
  NavItem,
  NavLink,
  TabContent,
  TabPane,
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
import { apiChainsUrl } from "../../config";
import { apiUrl } from "../../config";

import { getAllChains } from "../../store/chains/actions";

import Swal from "sweetalert2";
import classnames from "classnames";
import { Link } from "react-router-dom";

const Chains = (props) => {
  const dispatch = useDispatch();
  const { responseData } = useSelector((state) => ({
    responseData: state.chains.responseData,
  }));
  console.log(
    "🚀 ~ file: index.js:42 ~ const{responseData}=useSelector ~ responseData:",
    responseData
  );

  const [chainData, setChainData] = useState();
  const [activeTabFormStep, setActiveTabFormStep] = useState(1);
  const [isOpenAddEditModal, toggleAddEditModal] = useState(false);
  const { auth, launchpad } = useSelector((state) => ({
    auth: state.auth,
    launchpad: state.launchpad,
}));
const {
    lauchpadDeployHistory,
    isLoading,
    isDeploying,
    stageResponse,
    deployStageResponse,
    updatedLaunchpadResponse,
    updatedLaunchpadStages,
} = launchpad;

const { response, notifications, networkInfo } = launchpad;

  useEffect(() => {
    dispatch(getAllChains());
    getChainDetails();
  }, []);

  useEffect(() => {
    getChainDetails();
  }, [responseData]);

  useEffect(() => {
    if (stageResponse && stageResponse.code === "200") {
        if (stageResponse?.data) {
            handleStageFormData(stageResponse.data);
        }
        Swal.close();
        toast.success(stageResponse.msg, {
            onOpen: () => {
                dispatch(clearStageResponse());
            },
        });
    } else if (stageResponse && stageResponse?.msg) {
        Swal.close();
        toast.error(stageResponse.msg, {
            onOpen: () => {
                dispatch(clearStageResponse());
            },
        });
    }
}, [dispatch, stageResponse]);

"tokenTotalSupply",
useEffect(() => {
		if (notifications && notifications.code === "200") {
			Swal.close();
			refreshTableData.current();
			if (isOpenAddEditModal) toggleAddEditModal(!isOpenAddEditModal);
			toast.success(notifications.msg, {
				onOpen: () => {
					dispatch(clearNotification());
				},
			});
		} else if (notifications && notifications?.msg) {
			Swal.close();
			refreshTableData.current();
			toast.error(notifications.msg, {
				onOpen: () => {
					dispatch(clearNotification());
				},
			});
		}
	}, [dispatch, notifications]);

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

  const [details, handleformData] = useState({
    tokenAddress: "",
    network: "",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimal: "",
    tokenTotalSupply: "",
    tokenOwnerAddress: "",
    currency: [],
    fee: "",
    feeOption: "",
    listingOption: "",
    additionalInfo: {},
});


const [stageDetails, handleStageFormData] = useState([
    {
        stage: "",
        isExchangeList: false,
        presaleRate: "",
        listingRate: "",
        liquidity: "",
        softcap: "",
        hardcap: "",
        minimumBuy: "",
        maximumBuy: "",
        refundType: "",
        router: "",
        liquidityLockup: "",
        vesting: "",
        cliffing: "",
        totalDays: "",
        startDate: "",
        endDate: "",
        currencyRateDetails: [],
        active: false,
    },
]);


  const columns = [
    {
      name: "Name",
      label: "Name",
    },
    {
      name: "Slug",
      label: "Slug",
      // options: {
      //     filter: true,
      //     sort: false,
      // },
    },
    {
      name: "Symbol",
      label: "Symbol",
    },
    {
      name: "Bridge Address",
      label: "Bridge Address",
    },
    {
      name: "Chain ID",
      label: "Chain ID",
    },
    {
      name: "Active",
      label: "Active",
    },
  ];

  function getChainDetails() {
    setChainData([]);

    if (responseData) {
      let allTx = responseData;
    
      console.log("Data: ", responseData);
      let tempTable = [];

      for (let i = 0; i < allTx.length; i++) {
        tempTable.push([
          allTx[i].name,

          allTx[i].slug, 
          // allTx[i].walletToBridge.amount,

          allTx[i].symbol,

          allTx[i].bridgeAddress?.slice(0,6) + "..." + allTx[i].bridgeAddress?.slice(37,),
          allTx[i].chainID, 

          <span key={i}>{(allTx[i].active == true) ? <span className="badge bg-success rounded-pill">✔</span> : <span className="badge bg-danger rounded-pill">✖</span>}</span>


         
        ]);
      }

      // console.log(tempTable);
      setChainData(tempTable);
    }
  }

//   const getInitialValueForFirstStep = useMemo(() => {
//     let initialValues = {
//         tokenAddress:
//             details && details.tokenAddress ? details.tokenAddress : "",
//         tokenName: details && details.tokenName ? details.tokenName : "",
//         network: details && details.network ? details.network : "",
//         tokenSymbol:
//             details && details.tokenSymbol ? details.tokenSymbol : "",
//         tokenDecimal:
//             details && details.tokenDecimal ? details.tokenDecimal : "",
//         tokenTotalSupply:
//             details && details.tokenTotalSupply
//                 ? details.tokenTotalSupply
//                 : "",
//         tokenOwnerAddress:
//             details && details.tokenOwnerAddress
//                 ? details.tokenOwnerAddress
//                 : "",
//         feeOption:
//             details && details.feeOption ? details.feeOption.fee : "",
//         fee: details && details.fee ? details.fee : "",
//         listingOption:
//             details && details.listingOption ? details.listingOption : "",
//     };
//     initialValues["currency"] =
//         details && details.currency ? details.currency : [];
//     return initialValues;
// }, [isOpenAddEditModal, listingStageInfo.isOpenModal]);

//   const useFormikOptionsForFirstStep = {
//     enableReinitialize: true,
//     initialValues: getInitialValueForFirstStep,
//     validationSchema: Yup.object({
//         tokenAddress: Yup.string().required(),
//         tokenOwnerAddress: Yup.string().required(),
//         network: Yup.string().required(),
//         // feeOption: Yup.string().required(),
//         fee: Yup.string().required(),
//         currency: Yup.array().required(),
//     }),
//     onSubmit: (values) => {},
// };

// const validationForFirstStep = useFormik(useFormikOptionsForFirstStep);

// const useFormikOptionsForSecondStep = {
//     enableReinitialize: true,
//     initialValues: {},
//     validationSchema: Yup.object({}),
//     onSubmit: (values) => {},
// };

// const validationForSecondStep = useFormik(useFormikOptionsForSecondStep);

// const useFormikOptionsForThirdStep = {
//     enableReinitialize: true,
//     initialValues: {
//         logoURL: details.additionalInfo?.logoURL
//             ? details.additionalInfo.logoURL
//             : "",
//         websiteURL: details.additionalInfo?.websiteURL
//             ? details.additionalInfo.websiteURL
//             : "",
//         facebook: details.additionalInfo?.facebook
//             ? details.additionalInfo.facebook
//             : "",
//         twitter: details.additionalInfo?.twitter
//             ? details.additionalInfo.twitter
//             : "",
//         github: details.additionalInfo?.github
//             ? details.additionalInfo.github
//             : "",
//         telegram: details.additionalInfo?.telegram
//             ? details.additionalInfo.telegram
//             : "",
//         instagram: details.additionalInfo?.instagram
//             ? details.additionalInfo.instagram
//             : "",
//         reddit: details.additionalInfo?.reddit
//             ? details.additionalInfo.reddit
//             : "",
//         discord: details.additionalInfo?.discord
//             ? details.additionalInfo.discord
//             : "",
//         linkedin: details.additionalInfo?.linkedin
//             ? details.additionalInfo.linkedin
//             : "",
//         description: details.additionalInfo.description
//             ? details.additionalInfo.description
//             : "",
//         embeddedURL: details.additionalInfo.embeddedURL
//             ? details.additionalInfo.embeddedURL
//             : "",
//         mainPictureURL: details.additionalInfo.mainPictureURL
//             ? details.additionalInfo.mainPictureURL
//             : "",
//         projectTitle: details.additionalInfo.projectTitle
//             ? details.additionalInfo.projectTitle
//             : "",
//         projectSubTitle: details.additionalInfo.projectSubTitle
//             ? details.additionalInfo.projectSubTitle
//             : "",
//     },
//     validationSchema: Yup.object({
//         logoURL: Yup.string().test(
//             "valid-image-url",
//             "Must use valid image URL",
//             (value) =>
//                 yupValidImageSrc(value, 1000).then(
//                     (status) => status === "success"
//                 )
//         ),
//         websiteURL: Yup.string().required(),
//     }),
//     onSubmit: (values) => {},
// };

// const validationForThirdStep = useFormik(useFormikOptionsForThirdStep);

//   const toggleTab = async (tab, previous = false) => {
//     if (activeTabFormStep !== tab) {
//         if (previous) setActiveTabFormStep(tab);
//         else {
//             if (tab >= 1 && tab <= 5) {
//                 if (tab === 2) {
//                     const result =
//                         await validationForFirstStep.validateForm();
//                     if (
//                         isEmpty(result) &&
//                         isEmpty(
//                             launchpad.tokenDetailResponse?.errors
//                                 ?.tokenAddress
//                         )
//                     ) {
//                         setActiveTabFormStep(tab);
//                     } else {
//                         validationForFirstStep.handleSubmit();
//                     }
//                 } else if (tab === 3) {
//                     const result =
//                         await validationForSecondStep.validateForm();
//                     if (isEmpty(result)) {
//                         if (stageDetails.length && stageDetails[0].active) {
//                             setActiveTabFormStep(tab);
//                         } else {
//                             toast.error("Please add atleast one stage");
//                         }
//                     } else {
//                         validationForSecondStep.handleSubmit();
//                     }
//                 } else if (tab === 4) {
//                     const result =
//                         await validationForThirdStep.validateForm();
//                     if (isEmpty(result)) {
//                         setActiveTabFormStep(tab);
//                     } else {
//                         validationForThirdStep.handleSubmit();
//                     }
//                 } else {
//                     setActiveTabFormStep(tab);
//                 }
//             }
//         }
//     }
// };

  const handleAddEditModal = (data = null, isOnlyForStage = false) => {
    console.log("Clicked!!!, New Modal Opened");
    // setActiveTabFormStep(1);
    // validationForFirstStep.resetForm();
    // validationForSecondStep.resetForm();
    // validationForThirdStep.resetForm();

    // if (!isEmpty(data) && data?._id) {
    //     if (data?.network) {
    //         const networkDetails = networkInfo?.find(
    //             (network) => network.name === data.network
    //         );
    //         setNetworkDetails({ ...networkDetails });
    //     }
    //     const currency = getSelectedCurrencyOption(
    //         data.currency,
    //         data.network
    //     );
    //     handleformData({ ...data, currency: currency });
    //     handleStageFormData(data.stages);
    //     handleTokenomicFormData(data.tokenomics ?? [{ active: false }]);
    //     handleTeamInfoFormData(data.teamInfo ?? [{ active: false }]);
    //     handleWhitePapersFormData(
    //         data.whitepaper
    //             ? { ...data.whitepaper, uploadFile: null }
    //             : { path: "", url: "", uploadFile: null, active: false }
    //     );
    // } else {
    //     dispatch(clearTokenResponse());
    //     handleformData({
    //         tokenAddress: "",
    //         tokenName: "",
    //         network: "",
    //         tokenSymbol: "",
    //         tokenDecimal: "",
    //         tokenOwnerAddress: "",
    //         currency: [],
    //         feeOption: "",
    //         listingOption: "",
    //         additionalInfo: {},
    //     });
    //     setStageDetailIndex(0);

    //     handleStageFormData([
    //         {
    //             stage: "",
    //             isExchangeList: false,
    //             presaleRate: "",
    //             listingRate: "",
    //             liquidity: "",
    //             softcap: "",
    //             hardcap: "",
    //             minimumBuy: "",
    //             maximumBuy: "",
    //             refundType: "",
    //             router: "",
    //             liquidityLockup: "",
    //             vesting: "",
    //             vestingTime: "",
    //             cliffing: "",
    //             cliffingTime: "",
    //             releaseDate: "",
    //             startDate: "",
    //             endDate: "",
    //             currencyRateDetails: [],
    //             active: false,
    //         },
    //     ]);
    // }
    if (isOnlyForStage === false) toggleAddEditModal(!isOpenAddEditModal);
};

  return (
    <React.Fragment>
      <div className="page-content">
        <Helmet>
          <title>Chain Details | LFinance</title>
        </Helmet>

        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Chain Details" breadcrumbItem="Details" />
          <div className="col-auto h4">
																		Chains
																		&nbsp;
																		<HasAnyPermission
																			permission={[
																				"launchpad add",
																			]}
																		>
																			<button
																				onClick={() => {
																					handleAddEditModal();
																				}}
																				type="button"
																				className="btn btn-primary waves-effect waves-light"
																			>
																				<i className="bx bx-plus-medical font-size-16 align-middle"></i>
																			</button>
                                                                            <span className="mx-2"></span>
                                                                            <button
																				onClick={() => {
																					handleAddEditModal();
																				}}
																				type="button"
																				className="btn btn-danger waves-effect waves-light"
																			>
																				<i className="bx bx-minus font-size-16 align-middle"></i>
																			</button>
																		</HasAnyPermission>
																	</div>
          <Row>
                        <Col lg="12">
                            <CardBody className="px-0">
                                <div className="table-responsive">
                                
														
													
                                    {chainData ? (
                                        <MUIDataTable
                                            data={chainData}
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


        <Modal
														isOpen={
															isOpenAddEditModal
														}
														// toggle={
														// 	handleAddEditModal
														// }
														size="xl"
														centered={true}
													>
														<ModalHeader
															toggle={
																handleAddEditModal
															}
															tag="h4"
														>
															{details?._id
																? "Edit Launchpad"
																: "Add Chain"}
														</ModalHeader>
														<ModalBody>
															<fieldset
																// disabled={
																// 	!couldHaveAddUpdatePermission()
																// }
															>
																<div
																	id="basic-pills-wizard"
																	className="twitter-bs-wizard"
																>
																	<ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
																		{/* <NavItem>
																			<NavLink
																				href="#"
																				className={classnames(
																					{
																						active:
																							activeTabFormStep ===
																							1,
																					}
																				)}
																				// onClick={() => {
																				// 	setActiveTabFormStep(
																				// 		1
																				// 	);
																				// }}
																			>
																				<div
																					className="step-icon"
																					data-bs-toggle="tooltip"
																					data-bs-placement="top"
																					title="Token Details"
																				>
																					1
																				</div>
																			</NavLink>
																		</NavItem>
																		<NavItem>
																			<NavLink
																				href="#"
																				className={classnames(
																					{
																						active:
																							activeTabFormStep ===
																							2,
																					}
																				)}
																			>
																				<div
																					className="step-icon"
																					data-bs-toggle="tooltip"
																					data-bs-placement="top"
																					title="DeFi Launchpad Info"
																				>
																					2
																				</div>
																			</NavLink>
																		</NavItem>

																		<NavItem>
																			<NavLink
																				href="#"
																				className={classnames(
																					{
																						active:
																							activeTabFormStep ===
																							3,
																					}
																				)}
																				onClick={() => {
																					setActiveTabFormStep(
																						3
																					);
																				}}
																			>
																				<div
																					className="step-icon"
																					data-bs-toggle="tooltip"
																					data-bs-placement="top"
																					title="Team Info"
																				>
																					3
																				</div>
																			</NavLink>
																		</NavItem>
																		<NavItem>
																			<NavLink
																				href="#"
																				className={classnames(
																					{
																						active:
																							activeTabFormStep ===
																							4,
																					}
																				)}
																				// onClick={() => {
																				// 	setActiveTabFormStep(
																				// 		4
																				// 	);
																				// }}
																			>
																				<div
																					className="step-icon"
																					data-bs-toggle="tooltip"
																					data-bs-placement="top"
																					title="Add Additional Info"
																				>
																					4
																				</div>
																			</NavLink>
																		</NavItem>
																		<NavItem>
																			<NavLink
																				href="#"
																				className={classnames(
																					{
																						active:
																							activeTabFormStep ===
																							5,
																					}
																				)}
																				// onClick={() => {
																				// 	setActiveTabFormStep(
																				// 		4
																				// 	);
																				// }}
																			>
																				<div
																					className="step-icon"
																					data-bs-toggle="tooltip"
																					data-bs-placement="top"
																					title="Add Additional Info"
																				>
																					5
																				</div>
																			</NavLink>
																		</NavItem> */}
																	</ul>

																	<TabContent
																		className="twitter-bs-wizard-tab-content"
																		activeTab={
																			activeTabFormStep
																		}
																	>
																		<TabPane
																			tabId={
																				1
																			}
																		>
																			{   
                                                                                // <div>
                                                                                //     <span>Address</span>
                                                                                //     <input></input>
                                                                                //     <span>Address</span>
                                                                                //     <input></input>
                                                                                //     <span>Address</span>
                                                                                //     <input></input>
                                                                                //     <span>Address</span>
                                                                                //     <input></input>
                                                                                //     <span>Address</span>
                                                                                //     <input></input>
                                                                                // </div>
                                                                                <div>
                                                                                <div class="mb-4">
                                                                                    <label for="bridge-address" class="form-label">Bridge Address</label>
                                                                                    <input type="text" class="form-control" id="bridge-address" placeholder="Enter bridge address" />
                                                                                    
                                                                                </div>
                                                                                <div class="mb-4">
                                                                                    <label for="name" class="form-label">Name</label>
                                                                                    <input type="text" class="form-control" id="name" placeholder="Enter bridge name" />
                                                                                    
                                                                                </div>
                                                                                <div class="mb-4">
                                                                                    <label for="chain-id" class="form-label">Chain ID</label>
                                                                                    <input type="number" class="form-control" id="chain-id" placeholder="Enter chainID" />
                                                                                    
                                                                                </div>
                                                                                <div class="mb-4">
                                                                                    <label for="ws-url" class="form-label">WS URL</label>
                                                                                    <input type="text" class="form-control" id="ws-url" placeholder="Enter WS URL" />
                                                                                    
                                                                                </div>
                                                                                <div class="form-check form-switch">
                                                                                <input class="form-check-input" type="checkbox" id="activeToggle"/>
                                                                                <label class="form-check-label" for="activeToggle">Active</label>
                                                                                </div>
                                                                                </div>
                                                                                
                                                                              
                                                                              



                                                                            /* <VerifyTokenStepOne
																				networkInfo={
																					networkInfo
																				}
																				validationForFirstStep={
																					validationForFirstStep
																				}
																				getAddressTokenDetails={
																					getAddressTokenDetails
																				}
																				clearTokenResponse={
																					clearTokenResponse
																				}
																				handleChangeNetwork={
																					handleChangeNetwork
																				}
																				launchpad={
																					launchpad
																				}
																				details={
																					details
																				}
																				handleChangeCurrency={
																					handleChangeCurrency
																				}
																				getCurrencyOption={
																					getCurrencyOption
																				}
																				getCurrencyName={
																					getCurrencyName
																				}
																			/> */}
																		</TabPane>

																		<TabPane
																			tabId={
																				2
																			}
																		>
																			{/* <StageDetailStepSecond
																				validationForSecondStep={
																					validationForSecondStep
																				}
																				validationForFirstStep={
																					validationForFirstStep
																				}
																				handleAddNewStage={
																					handleAddNewStage
																				}
																				stageDetails={
																					stageDetails
																				}
																				handleDeleteStage={
																					handleDeleteStage
																				}
																				handleEditStage={
																					handleEditStage
																				}
																			/> */}
																		</TabPane>

																		<TabPane
																			tabId={
																				3
																			}
																		>
																			{/* <AdditionalInfoStepThird
																				validationForThirdStep={
																					validationForThirdStep
																				}
																				getCurrencyName={
																					getCurrencyName
																				}
																				onEditorChange={
																					onEditorChange
																				}
																				editor={
																					editor
																				}
																			/> */}
																		</TabPane>

																		<TabPane
																			tabId={
																				4
																			}
																		>
																			{/* <TeamTokenomicWhitepaperInfoStepFour
																				handleAddNewTeamInfo={
																					handleAddNewTeamInfo
																				}
																				teamInfo={
																					teamInfo
																				}
																				handleDeleteTeamInfo={
																					handleDeleteTeamInfo
																				}
																				handleEditTeamInfo={
																					handleEditTeamInfo
																				}
																				handleAddNewTokenomic={
																					handleAddNewTokenomic
																				}
																				tokenomicDetails={
																					tokenomicDetails
																				}
																				handleDeleteTokenomic={
																					handleDeleteTokenomic
																				}
																				handleEditTokenomic={
																					handleEditTokenomic
																				}
																				selectedFile={
																					selectedFile
																				}
																				whitepaper={
																					whitepaper
																				}
																			/> */}
																		</TabPane>

																		<TabPane
																			tabId={
																				5
																			}
																		>
																			{/* <ReviewStepFive
																				validationForThirdStep={
																					validationForThirdStep
																				}
																				getCurrencyName={
																					getCurrencyName
																				}
																				validationForFirstStep={
																					validationForFirstStep
																				}
																				stageDetails={
																					stageDetails
																				}
																			/> */}
																		</TabPane>
																	</TabContent> 

																	<ul className="pager wizard twitter-bs-wizard-pager-link">
																		{activeTabFormStep !==
																			1 && (
																			<li
																				className={
																					activeTabFormStep ===
																					1
																						? "previous disabled"
																						: "previous"
																				}
																			>
																				<Link
																					to="#"
																					className={
																						activeTabFormStep ===
																						1
																							? "btn btn-primary disabled"
																							: "btn btn-primary"
																					}
																					onClick={() => {
																						toggleTab(
																							activeTabFormStep -
																								1,
																							true
																						);
																					}}
																				>
																					<i className="bx bx-chevron-left me-1"></i>{" "}
																					Previous
																				</Link>
																			</li>
																		)}

																		<li
																			className={
																				activeTabFormStep ===
																				5
																					? "next disabled"
																					: "next"
																			}
																		>
																			<Link
																				to="#"
																				className="btn btn-primary"
																				disabled={
																					isLoading
																				}
																				// onClick={(
																				// 	e
																				// ) => {
																				// 	e.preventDefault();
																				// 	activeTabFormStep ===
																				// 	5
																				// 		? handleFinalFormSubmit()
																				// 		: toggleTab(
																				// 				activeTabFormStep +
																				// 					1
																				// 		  );
																				// }}
																			>
																				{activeTabFormStep ===
																				5
																					? "Submit"
																					: "Next"}
																				<i className="bx bx-chevron-right ms-1"></i>
																			</Link>
																		</li>
																	</ul>
																</div>
															</fieldset>
														</ModalBody>
													</Modal>

      </div>
    </React.Fragment>
  );
};

export default Chains;
