import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useMemo,
} from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Helmet } from "react-helmet";
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	NavItem,
	TabContent,
	TabPane,
	NavLink,
	Input,
	Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HasAnyPermission from "../../common/Permission";
import hasPermission from "../../common/HasPermission";
import ReactDataTable from "../../common/ReactDataTable";
import isEmpty from "../../utils/isEmpty";
import stringToBoolean from "../../utils/stringToBoolean";
import yupValidImageSrc from "../../utils/yupValidImageSrc";
import { apiUrl } from "../../config";
import {
	create,
	update,
	remove,
	toggle,
	clearResponse,
	getNetworkInfo,
	getTokenDetails,
	getLaunchpadOptions,
	getLaunchpadDeployHistory,
	deploy,
	clearTokenResponse,
	clearNotification,
	clearStageResponse,
	toggleSwap,
	updateStage,
	toggleStageSwap,
	deployUpdatedStage,
	getUpdatedLaunchpad,
	getLauchpadStages,
} from "../../store/launchpad/actions";
import Swal from "sweetalert2";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import moment from "moment";
import "../../assets/scss/launchpad.scss";
import { Switch } from "@mui/material";
import VerifyTokenStepOne from "./VerifyTokenStepOne";
import StageDetailStepSecond from "./StageDetailStepSecond";
import AdditionalInfoStepThird from "./AdditionalInfoStepThird";
import TeamTokenomicWhitepaperInfoStepFour from "./TeamTokenomicWhitepaperInfoStepFour";
import ReviewStepFive from "./ReviewStepFive";

import ListingStageInfo from "./ListingStageInfo";
import StageModal from "./StageModal";
import TeamInfoModal from "./TeamInfoModal";
import TokenomicModal from "./TokenomicModal";
import DeployInfoModal from "./DeployInfoModal";

let editor;
let whitePaperEditor;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const Launchpad = (props) => {
	const dispatch = useDispatch();
	const refreshTableData = useRef(null);
	const getLoaderStatus = useRef(null);
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

	useEffect(() => {
		dispatch(getNetworkInfo());
	}, []);

	const [listingStageInfo, setListingStageInfo] = useState({
		isOpenModal: false,
	});

	const { response, notifications, networkInfo } = launchpad;
	const [isOpenAddEditModal, toggleAddEditModal] = useState(false);
	const [stageModalDetails, toggleStageModal] = useState({
		active: false,
		action: "add",
		isDirectInsert: false,
	});
	const [teamInfoModalDetails, toggleTeamInfoModal] = useState({
		active: false,
		action: "add",
	});
	const [teamInfoIndex, setTeamInfoIndex] = useState(0);

	const [tokenomicModalDetails, toggleTokenomicModal] = useState({
		active: false,
		action: "add",
	});

	const [networkDetails, setNetworkDetails] = useState({});

	const [tokenomicDetailsIndex, setTokenomicDetailsIndex] = useState(0);

	const [stageDetailIndex, setStageDetailIndex] = useState(0);
	const [activeTabFormStep, setActiveTabFormStep] = useState(1);
	const [currencyFeeOptions, setCurrencyFeeOptions] = useState([]);

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

	const [teamInfo, handleTeamInfoFormData] = useState([
		{
			name: "",
			linkedin: "",
			image: "",
			url: "",
			designation: "",
			active: false,
		},
	]);

	const [tokenomicDetails, handleTokenomicFormData] = useState([
		{
			name: "",
			value: "",
			active: false,
		},
	]);

	const [whitepaper, handleWhitePapersFormData] = useState({
		path: "",
		url: "",
		uploadFile: null,
	});

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

	const [deployInfo, setDeployInfo] = useState({
		isOpenModal: false,
		launchpad: {},
	});

	const [launchpadOptions, setLaunchpadOption] = useState({});

	const [deployDetails, setDeployDetails] = useState({
		isOpenModal: false,
		details: {},
	});

	useEffect(() => {
		dispatch(getLaunchpadOptions());
	}, [dispatch]);

	const handleChangeNetwork = (e) => {
		e.preventDefault();
		const networkDetails = networkInfo?.find(
			(network) => network.name === e.target.value
		);

		const nativeCurrency = networkDetails?.currencies?.find(
			(curr) => curr.isNative
		);
		const currency = getSelectedCurrencyOption(
			[nativeCurrency.name, "USDT"],
			e.target.value
		);

		validationForFirstStep?.setFieldValue("currency", currency);
		setNetworkDetails({ ...networkDetails });
	};

	const handleChangeCurrency = (values, action) => {
		if (action.action === "clear") {
			toast.error("You can't remove all selected currencies.");
		} else if (
			(action.action === "remove-value" &&
				action?.removedValue?.isNative === true) ||
			action?.removedValue?.value === "USDT"
		) {
			toast.error("You can't remove this selected currencies.");
		} else {
			validationForFirstStep.setFieldValue("currency", values);
		}
	};

	useEffect(() => {
		const options = {};
		launchpad.launchpadOptions.forEach((launchpadOption, index) => {
			options[launchpadOption.type] = launchpadOption;
			if (launchpadOption.type === "currency") {
				handleformData({
					...details,
					// currency: [],
					feeOption: launchpadOption.data[0].feeOption[0],
				});
				setCurrencyFeeOptions(launchpadOption.data[0].feeOption);
				// validationForFirstStep.setFieldValue("currency", []);
				validationForFirstStep.setFieldValue(
					"feeOption",
					launchpadOption.data[0].feeOption[0]
				);
			}
		});
		setLaunchpadOption(options);
	}, [launchpad.launchpadOptions]);

	useEffect(() => {
		let { tokenSymbol, tokenDecimal, tokenName, tokenTotalSupply } =
			launchpad.tokenDetailResponse?.data ?? {};
		tokenName = tokenName ? tokenName : null;
		tokenSymbol = tokenSymbol ? tokenSymbol : null;
		tokenDecimal = tokenDecimal ? tokenDecimal : null;
		tokenTotalSupply = tokenTotalSupply ? tokenTotalSupply : null;
		validationForFirstStep.setFieldValue("tokenName", tokenName);
		validationForFirstStep.setFieldValue("tokenSymbol", tokenSymbol);
		validationForFirstStep.setFieldValue("tokenDecimal", tokenDecimal);
		validationForFirstStep.setFieldValue(
			"tokenTotalSupply",
			tokenTotalSupply
		);
	}, [launchpad.tokenDetailResponse]);

	const onEditorChange = (data) => {
		validationForThirdStep.setFieldValue("description", data);
	};

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

	useEffect(() => {
		if (deployStageResponse && deployStageResponse.code === "200") {
			if (deployStageResponse?.data) {
				setDeployInfo({
					isOpenModal: deployInfo.isOpenModal,
					launchpad: deployStageResponse.data,
				});
			}
			Swal.close();
			toast.success(deployStageResponse.msg, {
				onOpen: () => {
					dispatch(clearStageResponse());
				},
			});
		} else if (deployStageResponse && deployStageResponse?.msg) {
			Swal.close();
			toast.error(deployStageResponse.msg, {
				onOpen: () => {
					dispatch(clearStageResponse());
				},
			});
		}
	}, [dispatch, deployStageResponse]);

	useEffect(() => {
		// dispatch(getLaunchpadOptions());
	}, [dispatch]);

	const toggleTab = async (tab, previous = false) => {
		if (activeTabFormStep !== tab) {
			if (previous) setActiveTabFormStep(tab);
			else {
				if (tab >= 1 && tab <= 5) {
					if (tab === 2) {
						const result =
							await validationForFirstStep.validateForm();
						if (
							isEmpty(result) &&
							isEmpty(
								launchpad.tokenDetailResponse?.errors
									?.tokenAddress
							)
						) {
							setActiveTabFormStep(tab);
						} else {
							validationForFirstStep.handleSubmit();
						}
					} else if (tab === 3) {
						const result =
							await validationForSecondStep.validateForm();
						if (isEmpty(result)) {
							if (stageDetails.length && stageDetails[0].active) {
								setActiveTabFormStep(tab);
							} else {
								toast.error("Please add atleast one stage");
							}
						} else {
							validationForSecondStep.handleSubmit();
						}
					} else if (tab === 4) {
						const result =
							await validationForThirdStep.validateForm();
						if (isEmpty(result)) {
							setActiveTabFormStep(tab);
						} else {
							validationForThirdStep.handleSubmit();
						}
					} else {
						setActiveTabFormStep(tab);
					}
				}
			}
		}
	};

	const removeItem = (id) => {
		if (!isEmpty(id)) {
			Swal.fire({
				title: "Are you sure?",
				text: "Do you really want to delete?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Confirm",
			}).then((result) => {
				if (result.value) {
					dispatch(remove(id));
				}
			});
		}
	};

	const getInitialValueForFirstStep = useMemo(() => {
		let initialValues = {
			tokenAddress:
				details && details.tokenAddress ? details.tokenAddress : "",
			tokenName: details && details.tokenName ? details.tokenName : "",
			network: details && details.network ? details.network : "",
			tokenSymbol:
				details && details.tokenSymbol ? details.tokenSymbol : "",
			tokenDecimal:
				details && details.tokenDecimal ? details.tokenDecimal : "",
			tokenTotalSupply:
				details && details.tokenTotalSupply
					? details.tokenTotalSupply
					: "",
			tokenOwnerAddress:
				details && details.tokenOwnerAddress
					? details.tokenOwnerAddress
					: "",
			feeOption:
				details && details.feeOption ? details.feeOption.fee : "",
			fee: details && details.fee ? details.fee : "",
			listingOption:
				details && details.listingOption ? details.listingOption : "",
		};
		initialValues["currency"] =
			details && details.currency ? details.currency : [];
		return initialValues;
	}, [isOpenAddEditModal, listingStageInfo.isOpenModal]);

	const useFormikOptionsForFirstStep = {
		enableReinitialize: true,
		initialValues: getInitialValueForFirstStep,
		validationSchema: Yup.object({
			tokenAddress: Yup.string().required(),
			tokenOwnerAddress: Yup.string().required(),
			network: Yup.string().required(),
			// feeOption: Yup.string().required(),
			fee: Yup.string().required(),
			currency: Yup.array().required(),
		}),
		onSubmit: (values) => {},
	};

	const validationForFirstStep = useFormik(useFormikOptionsForFirstStep);

	const useFormikOptionsForSecondStep = {
		enableReinitialize: true,
		initialValues: {},
		validationSchema: Yup.object({}),
		onSubmit: (values) => {},
	};

	const validationForSecondStep = useFormik(useFormikOptionsForSecondStep);

	const useFormikOptionsForThirdStep = {
		enableReinitialize: true,
		initialValues: {
			logoURL: details.additionalInfo?.logoURL
				? details.additionalInfo.logoURL
				: "",
			websiteURL: details.additionalInfo?.websiteURL
				? details.additionalInfo.websiteURL
				: "",
			facebook: details.additionalInfo?.facebook
				? details.additionalInfo.facebook
				: "",
			twitter: details.additionalInfo?.twitter
				? details.additionalInfo.twitter
				: "",
			github: details.additionalInfo?.github
				? details.additionalInfo.github
				: "",
			telegram: details.additionalInfo?.telegram
				? details.additionalInfo.telegram
				: "",
			instagram: details.additionalInfo?.instagram
				? details.additionalInfo.instagram
				: "",
			reddit: details.additionalInfo?.reddit
				? details.additionalInfo.reddit
				: "",
			discord: details.additionalInfo?.discord
				? details.additionalInfo.discord
				: "",
			linkedin: details.additionalInfo?.linkedin
				? details.additionalInfo.linkedin
				: "",
			description: details.additionalInfo.description
				? details.additionalInfo.description
				: "",
			embeddedURL: details.additionalInfo.embeddedURL
				? details.additionalInfo.embeddedURL
				: "",
			mainPictureURL: details.additionalInfo.mainPictureURL
				? details.additionalInfo.mainPictureURL
				: "",
			projectTitle: details.additionalInfo.projectTitle
				? details.additionalInfo.projectTitle
				: "",
			projectSubTitle: details.additionalInfo.projectSubTitle
				? details.additionalInfo.projectSubTitle
				: "",
		},
		validationSchema: Yup.object({
			logoURL: Yup.string().test(
				"valid-image-url",
				"Must use valid image URL",
				(value) =>
					yupValidImageSrc(value, 1000).then(
						(status) => status === "success"
					)
			),
			websiteURL: Yup.string().required(),
		}),
		onSubmit: (values) => {},
	};

	const validationForThirdStep = useFormik(useFormikOptionsForThirdStep);

	const initialValuesForStage = {
		stage: stageDetails[stageDetailIndex]?.stage
			? stageDetails[stageDetailIndex].stage
			: "",
		isExchangeList: stageDetails[stageDetailIndex]?.isExchangeList
			? stringToBoolean(stageDetails[stageDetailIndex].isExchangeList)
			: false,
		presaleRate: stageDetails[stageDetailIndex]?.presaleRate
			? stageDetails[stageDetailIndex].presaleRate
			: "",
		refundType: stageDetails[stageDetailIndex]?.refundType
			? stageDetails[stageDetailIndex].refundType
			: "",
		listingRate: stageDetails[stageDetailIndex]?.listingRate
			? stageDetails[stageDetailIndex].listingRate
			: "",
		router: stageDetails[stageDetailIndex]?.router
			? stageDetails[stageDetailIndex].router
			: "",
		liquidity: stageDetails[stageDetailIndex]?.liquidity
			? stageDetails[stageDetailIndex].liquidity
			: "",
		softcap: stageDetails[stageDetailIndex]?.softcap
			? stageDetails[stageDetailIndex].softcap
			: "",
		hardcap: stageDetails[stageDetailIndex]?.hardcap
			? stageDetails[stageDetailIndex].hardcap
			: "",
		minimumBuy: stageDetails[stageDetailIndex]?.minimumBuy
			? stageDetails[stageDetailIndex].minimumBuy
			: "",
		maximumBuy: stageDetails[stageDetailIndex]?.maximumBuy
			? stageDetails[stageDetailIndex].maximumBuy
			: "",
		liquidityLockup: stageDetails[stageDetailIndex]?.liquidityLockup
			? stageDetails[stageDetailIndex].liquidityLockup
			: "",

		vesting: stageDetails[stageDetailIndex]?.vesting
			? stageDetails[stageDetailIndex].vesting
			: "",
		vestingTime: stageDetails[stageDetailIndex]?.vestingTime
			? stageDetails[stageDetailIndex].vestingTime
			: "",
		totalDays: stageDetailIndex[stageDetailIndex]?.totalDays
			? stageDetails[stageDetailIndex].totalDays
			: "",
		cliffing: stageDetails[stageDetailIndex]?.cliffing
			? stageDetails[stageDetailIndex].cliffing
			: "",
		cliffingTime: stageDetails[stageDetailIndex]?.cliffingTime
			? stageDetails[stageDetailIndex].cliffingTime
			: "",
		releaseDate: stageDetails[stageDetailIndex]?.releaseDate
			? stageDetails[stageDetailIndex]?.releaseDate.replace("Z", "")
			: "",
		startDate: stageDetails[stageDetailIndex]?.startDate
			? stageDetails[stageDetailIndex]?.startDate.replace("Z", "")
			: "",
		endDate: stageDetails[stageDetailIndex]?.endDate
			? stageDetails[stageDetailIndex]?.endDate.replace("Z", "")
			: "",
		isVesting: stageDetails[stageDetailIndex]?.isVesting ? true : false,
	};

	if (stageDetails[stageDetailIndex]?.currencyRateDetails) {
		stageDetails[stageDetailIndex]?.currencyRateDetails.forEach(
			(currencyRateDetail) => {
				initialValuesForStage[currencyRateDetail.currency] =
					currencyRateDetail.rate;
			}
		);
	}

	const useFormikOptionsForStage = {
		enableReinitialize: true,
		initialValues: initialValuesForStage,
		validationSchema: Yup.object()
			.shape({
				stage: Yup.string().required(),
				refundType: Yup.string().required(),
				liquidity: Yup.number()
					.required()
					.when(["hardcap", "USDT"], (hardcap, USDT, schema) => {
						return schema.min(
							hardcap / USDT,
							"liquidity >= Hardcap/Rate in USDT"
						);
					}),
				startDate: Yup.date().required(),
			})
			.when((values, schema) => {
				if (values.isExchangeList) {
					return schema.shape({
						listingRate: Yup.string().required(),
						router: Yup.string().required(),
					});
				} else {
					let validationData = {
						// presaleRate: Yup.string().required(),
						softcap: Yup.number()
							.required()
							.when(["hardcap"], (hardcap, schema) => {
								const minSoftcap = parseFloat(hardcap) * 0.5;
								return schema
									.min(
										minSoftcap,
										"Softcap must be >=50% of Hardcap."
									)
									.max(
										hardcap,
										"Softcap should not exceed Hardcap."
									);
							}),
						hardcap: Yup.number().required(),
						minimumBuy: Yup.number()
							.required()
							.min(0.01, "MinimumBuy must be greater than of 0"),
						maximumBuy: Yup.number()
							.required()
							.when(["minimumBuy"], (minimumBuy, schema) => {
								return schema.min(
									minimumBuy + 1,
									"MaximumBuy must be greater than of MinimumBuy."
								);
							}),
						// liquidityLockup: Yup.string().required(),
						endDate: Yup.date()
							.min(
								Yup.ref("startDate")
								// "End date must be grater than start date"
							)
							.required(),
					};
					if (validationForFirstStep.values?.currency) {
						validationForFirstStep.values?.currency?.map(
							(item) =>
								(validationData[item.name] =
									Yup.number().required(
										`Rate in ${item.name} is required.`
									))
						);
					}
					if (values.isVesting) {
						validationData["vesting"] = Yup.string().required();
						validationData["cliffing"] = Yup.string().required();
						validationData["totalDays"] = Yup.string().required();
					} else {
						validationData["releaseDate"] = Yup.date()
							.min(Yup.ref("startDate"))
							.required();
					}
					return schema.shape(validationData);
				}
			}),
		onSubmit: (values) => {
			let currencyRateDetails = [];
			if (validationForFirstStep.values?.currency) {
				validationForFirstStep.values?.currency.forEach((curr) => {
					if (values?.[curr.name] !== undefined) {
						currencyRateDetails.push({
							currency: curr.name,
							rate: values[curr.name],
							isNative: curr.isNative,
							address: curr.address,
						});
					}
				});
			}
			let stageNumber = stageDetails.length;
			if (stageDetails?.[stageDetailIndex]) {
				stageNumber = stageDetailIndex;
				stageDetails[stageDetailIndex] = {
					...stageDetails[stageDetailIndex],
					...values,
					stageNumber: stageDetailIndex,
					currencyRateDetails: currencyRateDetails,
					isExchangeList: stringToBoolean(values.isExchangeList),
					active: true,
				};
				handleStageFormData([...stageDetails]);
				if (stageModalDetails.isDirectInsert === false)
					toast.success("stage updated successfully.");
			} else {
				handleStageFormData([
					...stageDetails,
					{
						...values,
						stageNumber: stageNumber,
						currencyRateDetails: currencyRateDetails,
						active: true,
					},
				]);
				if (stageModalDetails.isDirectInsert === false)
					toast.success("stage add successfully.");
			}
			if (stageModalDetails.isDirectInsert === true) {
				Swal.fire({
					title: "Updating",
					html: "Please wait...",
					allowEscapeKey: false,
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				const startDate = values.startDate.replace("Z", "");
				const endDate = values.endDate.replace("Z", "");
				let myDateStartDate = new Date(startDate + "Z");
				let myDateEndDate = new Date(endDate + "Z");
				let startDateFormat = myDateStartDate.toUTCString();
				let endDateFormat = myDateEndDate.toUTCString();

				let releaseDateFormat = values.releaseDate;
				if (values.releaseDate) {
					const releaseDate = values.releaseDate?.replace("Z", "");
					let myDateReleaseDate = new Date(releaseDate + "Z");
					releaseDateFormat = myDateReleaseDate.toUTCString();
				}
				dispatch(
					updateStage({
						...values,
						startDate: startDateFormat,
						endDate: endDateFormat,
						releaseDate: releaseDateFormat,
						stageNumber: stageNumber,
						currencyRateDetails: currencyRateDetails,
						active: true,
						_id: details?._id,
					})
				);
			}
			toggleStageModal({
				...stageModalDetails,
				active: false,
				isDirectInsert: false,
			});
		},
	};

	const validationForStage = useFormik(useFormikOptionsForStage);

	const useFormikOptionsForTeamInfoStep = {
		enableReinitialize: true,
		initialValues: {
			name: teamInfo[teamInfoIndex]?.name
				? teamInfo[teamInfoIndex].name
				: "",
			designation: teamInfo[teamInfoIndex]?.designation
				? teamInfo[teamInfoIndex].designation
				: "",
			url: teamInfo[teamInfoIndex]?.url
				? teamInfo[teamInfoIndex].url
				: "",
			image: "",
			linkedin: teamInfo[teamInfoIndex]?.linkedin
				? teamInfo[teamInfoIndex].linkedin
				: "",
			active: teamInfo[teamInfoIndex]?.active
				? teamInfo[teamInfoIndex].active
				: "",
		},
		validationSchema: Yup.object({}),
		onSubmit: (values) => {
			if (teamInfo?.[teamInfoIndex]) {
				teamInfo[teamInfoIndex] = {
					...teamInfo[teamInfoIndex],
					...values,
					active: true,
				};
				handleTeamInfoFormData([...teamInfo]);
				toast.success("Team updated successfully.");
			} else {
				handleTeamInfoFormData([
					...teamInfo,
					{
						...values,
						active: true,
					},
				]);
				toast.success("Team add successfully.");
			}
			toggleTeamInfoModal({ ...teamInfoModalDetails, active: false });
		},
	};

	const validationForTeamInfoStep = useFormik(
		useFormikOptionsForTeamInfoStep
	);

	const useFormikOptionsForTokenomicStep = {
		enableReinitialize: true,
		initialValues: {
			name: tokenomicDetails[tokenomicDetailsIndex]?.name
				? tokenomicDetails[tokenomicDetailsIndex].name
				: "",
			value: tokenomicDetails[tokenomicDetailsIndex]?.value
				? tokenomicDetails[tokenomicDetailsIndex].value
				: "",
			active: tokenomicDetails[tokenomicDetailsIndex]?.active
				? tokenomicDetails[tokenomicDetailsIndex].active
				: "",
		},
		validationSchema: Yup.object({}),
		onSubmit: (values) => {
			if (tokenomicDetails?.[tokenomicDetailsIndex]) {
				tokenomicDetails[tokenomicDetailsIndex] = {
					...tokenomicDetails[tokenomicDetailsIndex],
					...values,
					active: true,
				};

				handleTokenomicFormData([...tokenomicDetails]);
				toast.success("Tokenomics updated successfully.");
			} else {
				handleTokenomicFormData([
					...tokenomicDetails,
					{
						...values,
						active: true,
					},
				]);
				toast.success("Tokenomics add successfully.");
			}

			toggleTokenomicModal({ ...tokenomicModalDetails, active: false });
		},
	};

	const validationForTokenomicStep = useFormik(
		useFormikOptionsForTokenomicStep
	);

	const getCurrencyOption = useMemo(() => {
		const result = networkDetails?.currencies?.map((item) => ({
			label: `${item.name}`,
			value: item.name,
			isNative: item.isNative,
			name: item.name,
			address: item.address,
		}));
		return result ?? [];
	}, [networkDetails]);

	const getSelectedCurrencyOption = (currencies, selectedNetwork) => {
		const networkDetails = networkInfo?.find(
			(network) => network.name === selectedNetwork
		);
		const result = [];
		networkDetails?.currencies?.forEach((item) => {
			if (currencies.includes(item.name)) {
				result.push({
					label: `${item.name}`,
					value: item.name,
					isNative: item.isNative,
					name: item.name,
					address: item.address,
				});
			}
		});
		return result ?? [];
	};

	const handleAddEditModal = (data = null, isOnlyForStage = false) => {
		setActiveTabFormStep(1);
		validationForFirstStep.resetForm();
		validationForSecondStep.resetForm();
		validationForThirdStep.resetForm();

		if (!isEmpty(data) && data?._id) {
			if (data?.network) {
				const networkDetails = networkInfo?.find(
					(network) => network.name === data.network
				);
				setNetworkDetails({ ...networkDetails });
			}
			const currency = getSelectedCurrencyOption(
				data.currency,
				data.network
			);
			handleformData({ ...data, currency: currency });
			handleStageFormData(data.stages);
			handleTokenomicFormData(data.tokenomics ?? [{ active: false }]);
			handleTeamInfoFormData(data.teamInfo ?? [{ active: false }]);
			handleWhitePapersFormData(
				data.whitepaper
					? { ...data.whitepaper, uploadFile: null }
					: { path: "", url: "", uploadFile: null, active: false }
			);
		} else {
			dispatch(clearTokenResponse());
			handleformData({
				tokenAddress: "",
				tokenName: "",
				network: "",
				tokenSymbol: "",
				tokenDecimal: "",
				tokenOwnerAddress: "",
				currency: [],
				feeOption: "",
				listingOption: "",
				additionalInfo: {},
			});
			setStageDetailIndex(0);

			handleStageFormData([
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
					vestingTime: "",
					cliffing: "",
					cliffingTime: "",
					releaseDate: "",
					startDate: "",
					endDate: "",
					currencyRateDetails: [],
					active: false,
				},
			]);
		}
		if (isOnlyForStage === false) toggleAddEditModal(!isOpenAddEditModal);
	};

	const selectedFile = (selectedFiles) => {
		if (isEmpty(selectedFiles)) {
			return false;
		} else {
			let droppedFile = {};
			selectedFiles.map((file) => {
				droppedFile = file;
				return true;
			});
			handleWhitePapersFormData({
				...whitepaper,
				uploadFile: droppedFile,
			});
		}
	};

	const selectedTeamFile = (selectedFiles, index) => {
		if (isEmpty(selectedFiles)) {
			validationForTeamInfoStep.setFieldValue("image", null);
			return false;
		} else {
			let droppedFile = {};
			selectedFiles.map((file) => {
				droppedFile = file;
				return true;
			});
			validationForTeamInfoStep.setFieldValue("image", droppedFile);
		}
	};

	const handleFinalFormSubmit = async () => {
		let feeOption = {};
		if (validationForFirstStep.values.feeOption) {
			feeOption = currencyFeeOptions.find(
				(feeOp) =>
					parseInt(feeOp.fee) ===
					parseInt(validationForFirstStep.values.feeOption)
			);
		}
		if (isEmpty(feeOption)) {
			feeOption = details.feeOption;
		}
		let whitePaperFile = null;
		if (whitepaper.uploadFile) {
			whitePaperFile = whitepaper.uploadFile;
		}
		let teamInfoImages = [];
		let formatTeamInfo = teamInfo.map((team, index) => {
			const { image, ...rest } = team;
			teamInfoImages.push({ name: `teamInfoImages_${index}`, image });
			return rest;
		});

		const formatCurrency = validationForFirstStep.values.currency.map(
			(currency) => currency.name
		);

		const formatStageDetails = stageDetails.map((stage) => {
			const startDate = stage.startDate.replace("Z", "");
			const endDate = stage.endDate.replace("Z", "");
			let myDateStartDate = new Date(startDate + "Z");
			let myDateEndDate = new Date(endDate + "Z");
			let startDateFormat = myDateStartDate.toUTCString();
			let endDateFormat = myDateEndDate.toUTCString();
			let releaseDateFormat = stage.releaseDate;

			if (stage.releaseDate) {
				const releaseDate = stage.releaseDate?.replace("Z", "");
				let myDateReleaseDate = new Date(releaseDate + "Z");
				releaseDateFormat = myDateReleaseDate.toUTCString();
			}
			return {
				...stage,
				startDate: startDateFormat,
				endDate: endDateFormat,
				releaseDate: releaseDateFormat,
			};
		});

		const formatData = {
			...details,
			...validationForFirstStep.values,
			currency: formatCurrency,
			feeOption: feeOption,
			...validationForSecondStep.values,
			additionalInfo: validationForThirdStep.values,
			stages: formatStageDetails,
			tokenomics: tokenomicDetails,
			teamInfo: formatTeamInfo,
			whitePaperFile: whitePaperFile,
			teamInfoImages: teamInfoImages,
		};
		if (details._id) {
			dispatch(update(formatData));
		} else {
			dispatch(create(formatData));
		}
		Swal.fire({
			title: "Updating",
			html: "Please wait...",
			allowEscapeKey: false,
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

	const getMinDateForStage = useCallback(
		(currentIndex) => {
			let minDate = moment().toDate();
			if (currentIndex === 0) {
				minDate = moment().subtract(5, "days").toDate();
			} else {
				const preIndex = currentIndex - 1;
				if (stageDetails?.[preIndex]?.endDate) {
					if (
						moment(stageDetails[preIndex].endDate, true).isValid()
					) {
						minDate = moment(stageDetails[preIndex].endDate)
							.add(1, "days")
							.toDate();
					}
				}
			}
			return minDate;
		},
		[stageModalDetails]
	);

	const getCurrencyName = useMemo(() => {
		const currency = validationForFirstStep.values.currency?.map(
			(curr) => curr.name
		);
		return currency ?? [];
	}, [validationForFirstStep.values?.currency]);

	const handleAddNewStage = (isDirectInsert = false) => {
		if (stageDetails[0].active === true) {
			setStageDetailIndex(stageDetails.length);
		}
		toggleStageModal({
			action: "add",
			active: true,
			isDirectInsert: isDirectInsert,
		});
		validationForStage.resetForm();
	};

	const handleEditStage = (stageDetailIndex, isDirectInsert = false) => {
		setStageDetailIndex(stageDetailIndex);
		toggleStageModal({
			action: "edit",
			active: true,
			isDirectInsert: isDirectInsert,
		});
	};

	const handleAddNewTeamInfo = () => {
		if (teamInfo[0].active === true) {
			setTeamInfoIndex(teamInfo.length);
		} else {
			if (teamInfo.length === 1) setTeamInfoIndex(0);
		}
		toggleTeamInfoModal({ action: "add", active: true });
		validationForTeamInfoStep.resetForm();
	};

	const handleEditTeamInfo = (index) => {
		setTeamInfoIndex(index);
		toggleTeamInfoModal({ action: "edit", active: true });
	};

	const handleDeleteTeamInfo = (index) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to delete?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				if (index === 0) {
					teamInfo[index].active = false;
				} else {
					teamInfo.splice(index, 1);
				}
				handleTeamInfoFormData([...teamInfo]);
			}
		});
	};

	const handleAddNewTokenomic = () => {
		if (tokenomicDetails[0].active === true) {
			setTokenomicDetailsIndex(tokenomicDetails.length);
		} else {
			if (tokenomicDetails.length === 1) setTokenomicDetailsIndex(0);
		}
		toggleTokenomicModal({ action: "add", active: true });
		validationForTokenomicStep.resetForm();
	};

	const handleEditTokenomic = (index) => {
		setTokenomicDetailsIndex(index);
		toggleTokenomicModal({ action: "edit", active: true });
	};

	const handleDeleteTokenomic = (index) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to delete?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				if (index === 0) {
					tokenomicDetails[index].active = false;
					tokenomicDetails[index].name = "";
					tokenomicDetails[index].value = "";
				} else {
					tokenomicDetails.splice(index, 1);
				}
				handleTokenomicFormData([...tokenomicDetails]);
			}
		});
	};

	const getAddressTokenDetails = () => {
		const { tokenAddress, network } = validationForFirstStep.values;
		if (tokenAddress && network) {
			dispatch(getTokenDetails({ tokenAddress, network }));
		}
	};

	const handleDeleteStage = (stageDetailIndex) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to delete?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				if (stageDetailIndex === 0) {
					stageDetails[stageDetailIndex].active = false;
				} else {
					stageDetails.splice(stageDetailIndex, 1);
					for (
						let stageIndex = stageDetailIndex;
						stageIndex < stageDetails.length;
						stageIndex++
					) {
						stageDetails[stageIndex]["stageNumber"] = stageIndex;
					}
				}
				handleStageFormData([...stageDetails]);
			}
		});
	};

	const handleDeployLunchpad = (data) => {
		if (data?._id) {
			dispatch(getLauchpadStages({ _id: data._id }));
			dispatch(getLaunchpadDeployHistory({ _id: data._id }));
		}
		setDeployInfo({
			isOpenModal: !deployInfo.isOpenModal,
			launchpad: data,
		});
	};

	const handleListingStageInfo = (data) => {
		handleAddEditModal(data, true);
		if (listingStageInfo.isOpenModal === true) refreshTableData.current();
		setListingStageInfo({
			isOpenModal: !listingStageInfo.isOpenModal,
		});
	};

	const handleDeployAllStep = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to deploy?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				dispatch(deploy({ _id: data._id }));
				// Swal.fire({
				// 	title: "Deploying",
				// 	html: "Please wait...",
				// 	allowEscapeKey: false,
				// 	allowOutsideClick: false,
				// 	didOpen: () => {
				// 		Swal.showLoading();
				// 	},
				// });
			}
		});
	};

	const handleDeployUpdatedStage = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to deploy?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				dispatch(deployUpdatedStage(data));
				Swal.fire({
					title: "Deploying",
					html: "Please wait...",
					allowEscapeKey: false,
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
			}
		});
	};

	const handleToggleSwap = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to update?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				Swal.fire({
					title: "Updating",
					html: "Please wait...",
					allowEscapeKey: false,
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				dispatch(toggleSwap({ _id: data._id }));
			}
		});
	};

	const handleToggle = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you really want to update?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				Swal.fire({
					title: "Updating",
					html: "Please wait...",
					allowEscapeKey: false,
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				dispatch(toggle(data._id));
			}
		});
	};

	const handleToggleStageSwap = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: `Do you really want to ${
				data.isSwapEnable === true ? "disable swap" : "enable swap"
			}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
		}).then((result) => {
			if (result.value) {
				Swal.fire({
					title: "Updating",
					html: "Please wait...",
					allowEscapeKey: false,
					allowOutsideClick: false,
					didOpen: () => {
						Swal.showLoading();
					},
				});
				dispatch(toggleStageSwap({ ...data, _id: details._id }));
			}
		});
	};

	const columns = () => [
		{
			label: "Token Name",
			name: "tokenName",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			label: "Token Address",
			name: "tokenAddress",
			options: {
				filter: false,
				sort: false,
			},
		},

		{
			label: "Currency",
			name: "currency",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (currency) => {
					return currency?.toString(",  ");
				},
			},
		},

		{
			label: "No. of stages",
			name: "stages",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (stages) => {
					return (
						<div className="text-center">
							{/* <div className="d-flex flex-wrap gap-2 font-size-16">
								{stages &&
									stages.map((stage) => (
										<Link
											to="#"
											className="badge badge-soft-primary"
										>
											{`Stage ${stage.stageNumber + 1}`}
										</Link>
									))}
							</div> */}
							<div className="badge badge-soft-success font-size-14">
								{stages.length}
							</div>
						</div>
					);
				},
			},
		},

		{
			name: "status",
			label: "Status",
			options: {
				filter: false,
				sort: false,
				download: false,
				customBodyRender: (status) => {
					return status === "draft" ? (
						<div className="badge badge-soft-primary font-size-12">
							Draft
						</div>
					) : status === "pending" ? (
						<div className="badge badge-soft-warning font-size-12">
							Pending
						</div>
					) : status === "live" ? (
						<div className="badge badge-soft-success font-size-12">
							Live
						</div>
					) : (
						<div className="badge badge-soft-danger font-size-12">
							Finished
						</div>
					);
				},
			},
		},

		{
			label: "Swap Enable",
			name: "isSwapEnable",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (isSwapEnable) => {
					return isSwapEnable?.launchPadDetails?.address &&
						isSwapEnable.status !== "finished" ? (
						<div className="square-switch">
							<Input
								type="checkbox"
								id={`swap-launchpad-${isSwapEnable._id}`}
								switch="none"
								checked={isSwapEnable.isSwapEnable}
								onClick={() => {
									handleToggleSwap({
										_id: isSwapEnable._id,
									});
								}}
								onChange={() => {
									handleToggleSwap({
										_id: isSwapEnable._id,
									});
								}}
							/>
							<Label
								htmlFor={`swap-launchpad-${isSwapEnable._id}`}
								data-on-label="Yes"
								data-off-label="No"
							></Label>
						</div>
					) : (
						<div className="text-center">-</div>
					);
				},
			},
		},
		{
			label: "Active",
			name: "active",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (active) => {
					return (
						<div className="d-flex flex-wrap gap-2 text-center">
							<div className="square-switch">
								<Input
									type="checkbox"
									id={`active-launchpad-${active._id}`}
									switch="none"
									checked={active.active}
									onClick={() => {
										handleToggle(active);
									}}
									onChange={() => {
										handleToggle(active);
									}}
								/>
								<Label
									htmlFor={`active-launchpad-${active._id}`}
									data-on-label="Yes"
									data-off-label="No"
								></Label>
							</div>
						</div>
					);
				},
			},
		},
		{
			label: "Actions",
			name: "action",
			options: {
				filter: false,
				sort: false,
				empty: true,
				download: false,
				display: hasPermission(
					["launchpad update", "launchpad delete", "launchpad view"],
					auth.currentUserRolePermissions
				),
				viewColumns: hasPermission(
					["launchpad update", "launchpad delete", "launchpad view"],
					auth.currentUserRolePermissions
				),
				customBodyRender: (data) => {
					return (
						<div className="d-flex flex-wrap gap-2 text-center">
							{data.status !== "finished" && (
								<HasAnyPermission
									permission={[
										"launchpad update",
										"launchpad view",
									]}
								>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											handleListingStageInfo(data);
										}}
										className=" btn btn-sm btn-primary waves-effect waves-light"
									>
										<i className="bx bx bx-info-circle font-size-16 align-middle me-2"></i>{" "}
										Manage Stages
									</button>
								</HasAnyPermission>
							)}

							{data.status !== "finished" && (
								<HasAnyPermission
									permission={[
										"launchpad update",
										"launchpad view",
									]}
								>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											handleDeployLunchpad(data, true);
										}}
										className=" btn btn-sm btn-success waves-effect waves-light"
									>
										<i className="bx bx-rocket font-size-16 align-middle me-2"></i>{" "}
										Deploy
									</button>
								</HasAnyPermission>
							)}
							{data.status !== "finished" && (
								<HasAnyPermission
									permission={[
										"launchpad update",
										"launchpad view",
									]}
								>
									<button
										type="button"
										onClick={(e) =>
											handleAddEditModal(data)
										}
										className=" btn btn-sm btn-primary waves-effect waves-light"
									>
										<i className="bx bx-edit-alt font-size-16 align-middle me-2"></i>{" "}
										Edit
									</button>
								</HasAnyPermission>
							)}
							{data.status === "draft" && (
								<HasAnyPermission
									permission={["launchpad delete"]}
								>
									<button
										type="button"
										onClick={(e) => removeItem(data._id)}
										className=" btn btn-sm btn-danger waves-effect waves-light"
									>
										<i className="bx bx-trash font-size-16 align-middle me-2"></i>{" "}
										Delete
									</button>
								</HasAnyPermission>
							)}
							{data.status === "finished" && (
								<HasAnyPermission
									permission={["launchpad delete"]}
								>
									<button
										type="button"
										className=" btn btn-sm btn-danger waves-effect waves-light"
										disabled
									>
										Finished
									</button>
								</HasAnyPermission>
							)}
						</div>
					);
				},
			},
		},
	];

	const resultFormatter = (result) => {
		return result.docs.map((item) => {
			return {
				...item,
				active: item,
				isSwapEnable: item,
				action: item,
			};
		});
	};

	const couldHaveAddUpdatePermission = () => {
		const isUpdatePermission = hasPermission(
			["launchpad update"],
			auth.currentUserRolePermissions
		);
		const isAddPermission = hasPermission(
			["launchpad add"],
			auth.currentUserRolePermissions
		);
		if (isUpdatePermission && isAddPermission) return true;
		else if (isUpdatePermission && !isEmpty(details._id)) return true;
		else if (isAddPermission && isEmpty(details._id)) return true;
		else return false;
	};
	return (
		<React.Fragment>
			<div className="page-content">
				<Helmet>
					<title>Launchpad | LFinance</title>
				</Helmet>
				<Container fluid>
					{/* Render Breadcrumbs */}
					<Breadcrumbs
						title="Launchpad Option"
						breadcrumbItem="List"
					/>

					{deployInfo.isOpenModal === true && (
						<DeployInfoModal
							handleDeployLunchpad={handleDeployLunchpad}
							// lauchpadDeployHistory={lauchpadDeployHistory}
							updatedLaunchpadStages={updatedLaunchpadStages}
							deployInfo={deployInfo}
							deployDetails={deployDetails}
							setDeployDetails={setDeployDetails}
							handleDeployAllStep={handleDeployAllStep}
							handleDeployUpdatedStage={handleDeployUpdatedStage}
							isDeploying={isDeploying}
						/>
					)}

					{listingStageInfo.isOpenModal === true && (
						<ListingStageInfo
							handleListingStageInfo={handleListingStageInfo}
							listingStageInfo={listingStageInfo}
							stageDetails={stageDetails}
							handleAddNewStage={handleAddNewStage}
							handleEditStage={handleEditStage}
							// handleDeleteStage={handleDeleteStage}
							handleToggleStageSwap={handleToggleStageSwap}
						/>
					)}

					<StageModal
						stageModalDetails={stageModalDetails}
						toggleStageModal={toggleStageModal}
						validationForStage={validationForStage}
						validationForFirstStep={validationForFirstStep}
						couldHaveAddUpdatePermission={
							couldHaveAddUpdatePermission
						}
						launchpadOptions={launchpadOptions}
					/>
					<TeamInfoModal
						teamInfoModalDetails={teamInfoModalDetails}
						toggleTeamInfoModal={toggleTeamInfoModal}
						validationForTeamInfoStep={validationForTeamInfoStep}
						selectedTeamFile={selectedTeamFile}
					/>
					<TokenomicModal
						tokenomicModalDetails={tokenomicModalDetails}
						toggleTokenomicModal={toggleTokenomicModal}
						validationForTokenomicStep={validationForTokenomicStep}
						couldHaveAddUpdatePermission={
							couldHaveAddUpdatePermission
						}
					/>
					<Row>
						<Col lg="12">
							<Card>
								<CardBody>
									<Row>
										<Col xl="12">
											<div className="table-rep-plugin">
												<div className="table-responsive">
													<HasAnyPermission
														permission={[
															"launchpad list",
														]}
													>
														<ReactDataTable
															url={`${apiUrl}/admin/launchpad/pagination`}
															columns={columns()}
															resultFormatter={
																resultFormatter
															}
															setRefresh={
																refreshTableData
															}
															getLoaderStatus={
																getLoaderStatus
															}
															// disableFilterIcon={
															// 	true
															// }
															// disableSearchIcon={
															// 	true
															// }
															origin={
																<div className="row">
																	<div className="col-auto h4">
																		Launchpad
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
																		</HasAnyPermission>
																	</div>
																</div>
															}
															rowsPerPage={10}
														/>
													</HasAnyPermission>

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
																: "Add Launchpad"}
														</ModalHeader>
														<ModalBody>
															<fieldset
																disabled={
																	!couldHaveAddUpdatePermission()
																}
															>
																<div
																	id="basic-pills-wizard"
																	className="twitter-bs-wizard"
																>
																	<ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
																		<NavItem>
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
																		</NavItem>
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
																			<VerifyTokenStepOne
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
																			/>
																		</TabPane>

																		<TabPane
																			tabId={
																				2
																			}
																		>
																			<StageDetailStepSecond
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
																			/>
																		</TabPane>

																		<TabPane
																			tabId={
																				3
																			}
																		>
																			<AdditionalInfoStepThird
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
																			/>
																		</TabPane>

																		<TabPane
																			tabId={
																				4
																			}
																		>
																			<TeamTokenomicWhitepaperInfoStepFour
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
																			/>
																		</TabPane>

																		<TabPane
																			tabId={
																				5
																			}
																		>
																			<ReviewStepFive
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
																			/>
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
																				onClick={(
																					e
																				) => {
																					e.preventDefault();
																					activeTabFormStep ===
																					5
																						? handleFinalFormSubmit()
																						: toggleTab(
																								activeTabFormStep +
																									1
																						  );
																				}}
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
											</div>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Launchpad;
