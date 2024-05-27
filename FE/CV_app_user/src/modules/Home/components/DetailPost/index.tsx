import SrcIcons from '@/assets/icons';
import SrcImages from '@/assets/image';
import { ScaleId } from '@/components';
import { numberWithCommas } from '@/helpers';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { TruncateLines } from 'react-truncate-lines';
import { FaTiktok } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import {
  MASTER_DATA_EXPERIENCE_MAP,
  MASTER_DATA_GENDER_MAP,
  MASTER_DATA_LEVEL_MAP,
  MASTER_DATA_PROBATION_PERIOD_MAP,
  MASTER_DATA_WORKING_METHOD_MAP,
} from '../../shared/constance';
import { RECRUITMENT_UPDATE_DATA_FIELD } from '../../shared/enums';
import { DetailEnterprise, accountAPI } from '../../shared/api';
import { useSelector } from 'react-redux';

import { Detail, recruitmentsAPI } from '../../shared/api2';
import { Button, Form } from 'antd';
import moment from 'moment';
import styles from './styles.module.scss';
import UploadCVModal from '@/components/common/UploadCVModal';
import CreateModalCandidate from '@/components/common/CreateModalCandidate';

interface IProps {
  id: string;
}
const DetailPostModule = (props: IProps) => {
  const [form] = Form.useForm();

  const { id } = props;
  console.log(id);
  const [data, setData] = useState({});
  const [currentAccountInfo, setCurrentAccountInfo] = useState<any>({});
  const [careers, setCareers] = useState<any>({});
  const [Fields, setFields] = useState<any>({});
  const [uploadCVModal, setUploadCVModal] = useState(false);
  const closeUploadCVModal = () => setUploadCVModal(false);
  const openUploadCVModal = () => setUploadCVModal(false);
  const [Img, setImageUrl] = useState('');
  const [formValues, setFormValues] = useState<any>(form?.getFieldsValue());
  const [post, setPost] = useState<any>({});
  const side1 = useMemo(
    () => [
      {
        title: 'Kinh nghiệm',
        subTitle: MASTER_DATA_EXPERIENCE_MAP.get(
          Number(formValues[RECRUITMENT_UPDATE_DATA_FIELD.experience])
        )?.label,
      },
      {
        title: 'Cấp bậc',
        subTitle: MASTER_DATA_LEVEL_MAP.get(
          Number(formValues[RECRUITMENT_UPDATE_DATA_FIELD.level])
        )?.label,
      },
      {
        title: 'Hình thức',
        subTitle: MASTER_DATA_WORKING_METHOD_MAP.get(
          Number(formValues[RECRUITMENT_UPDATE_DATA_FIELD.form_of_work])
        )?.label,
      },
      {
        title: 'Mức lương',
        subTitle: formValues[RECRUITMENT_UPDATE_DATA_FIELD.salary_min]
          ? `${numberWithCommas(formValues[RECRUITMENT_UPDATE_DATA_FIELD.salary_min])} -
          ${numberWithCommas(formValues[RECRUITMENT_UPDATE_DATA_FIELD.salary_max])}`
          : 'Thỏa thuận',
      },
    ],
    [Img]
  );
  const handleToggle = () => {
    setUploadCVModal(true);
  };
  const Enterprise = async (payload: DetailEnterprise) => {
    const Post = await recruitmentsAPI.getRecruitmentById(id);
    const rqEnterprise: DetailEnterprise = {
      id: Post.enterprise_id,
    };
    const user = await accountAPI.getEnterpriseByIdEnterprise(Post.enterprise_id);
    setFormValues(Post);
    console.log(user);
    const rqCaree: Detail = {
      id: Post.career_id,
    };
    const reFields: Detail = {
      id: Post.career_field_id,
    };
    const Caree = await recruitmentsAPI.getCareeeDetail(rqCaree);
    setCareers(Caree);
    const Fields = await recruitmentsAPI.getCareeeFields(reFields);
    setFields(Fields);

    setPost(Post);

    setImageUrl(user.avatar);

    form.setFieldsValue({ ...user });

    setCurrentAccountInfo(user);
    return user;
  };
  const rqEnterprise: DetailEnterprise = {
    id: '',
  };
  useEffect(() => {
    Enterprise(rqEnterprise);
    const Post = recruitmentsAPI.getRecruitmentById(id).then((res) => {
      setFormValues(res);
      console.log(res);
    });
  }, [Img]);

  const side2 = useMemo(
    () => [
      {
        title: 'Giới tính',
        subTitle: MASTER_DATA_GENDER_MAP.get(
          Number(formValues[RECRUITMENT_UPDATE_DATA_FIELD.gender])
        )?.label,
      },
      {
        title: 'Bằng cấp',
        subTitle: MASTER_DATA_LEVEL_MAP.get(
          Number(formValues[RECRUITMENT_UPDATE_DATA_FIELD.level])
        )?.label,
      },
      {
        title: 'Thời hạn thử việc',
        subTitle: MASTER_DATA_PROBATION_PERIOD_MAP.get(
          Number(formValues[RECRUITMENT_UPDATE_DATA_FIELD.probationary_period])
        )?.label,
      },
      {
        title: 'Hạn nhận hồ sơ',
        subTitle: moment(formValues[RECRUITMENT_UPDATE_DATA_FIELD.deadline]).format(
          'YYYY-MM-DD'
        ),
      },
    ],
    [Img]
  );

  return (
    <div className="ml-20">
      <div className="bg-white rounded-[10px] flex flex-col xl:flex-row xl:bg-transparent gap-5 ">
        <div className="rounded-[10px] flex flex-col w-full overflow-hidden bg-white xl:card !shadow-none">
          <div className="cover relative h-[173px] md:h-[266px] ">
            <img src={post.image_url} alt="" className="h-full w-full object-fill" />
          </div>
          <div className="flex flex-col contentpt-0 ">
            <div className="recruitment  p-[15px] md:p-[24px] ">
              {/* title and subinfo */}
              <div className="title flex justify-between items-center flex-col-reverse md:flex-row">
                <div className="w-full ">
                  <h1 className="leading-[32px] text-primary font-[500] text-[24px] xl:text-[24px] mb-5">
                    {formValues[RECRUITMENT_UPDATE_DATA_FIELD.title]}
                  </h1>
                </div>
                <div className="icons flex w-fit items-center -translate-y-[40%] text-left">
                  <div className="sm:hidden relative border-[4px] border-solid border-[#FAFAFB] bg-[#FAFAFB] rounded-[10px] overflow-hidden h-16 w-16"></div>
                  <div className="flex gap-4 ml-auto">
                    <div className="bg-white relative ml-auto p-2 rounded-[10px] h-[34px] w-[34px] drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
                      <Image
                        width={20}
                        height={20}
                        src={SrcIcons.bookmark}
                        alt="Eztek Doanh nghiệp"
                      />
                    </div>
                    <div className="bg-white relative p-2 rounded-[10px] h-[34px] w-[34px] drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
                      <Image
                        width={20}
                        height={20}
                        src={SrcIcons.attachment}
                        alt="Eztek Doanh nghiệp"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {Array.from([
                  `${formValues[RECRUITMENT_UPDATE_DATA_FIELD.district]} - ${
                    formValues[RECRUITMENT_UPDATE_DATA_FIELD.city]
                  }`,
                ]).map((item, index) =>
                  index !== 2 ? (
                    <p
                      className={clsx(
                        index % 2 === 0 ? '' : 'sm:ml-auto',
                        'font-[300] text-[18px] leading-[28px] text-[#44444F]'
                      )}
                    >
                      <div className="flex justify-between">
                        <div className="m-4"> Địa điểm : {item}</div>
                        <div className="m-4"> Ngành: {careers.name}</div>
                        <div className="m-4"> Lĩnh vực: {Fields.name}</div>
                      </div>
                    </p>
                  ) : (
                    <div className={clsx('flex items-end')}>
                      <div className="flex flex-nowrap">
                        {Array.from({ length: 5 }, (_, index) => {
                          if (index < 3) {
                            return (
                              <div
                                className="h-8 w-8 rounded-full border-[1px] border-solid border-[#E2E2EA] relative overflow-hidden bg-white"
                                style={{
                                  zIndex: 100 - index * 10,
                                  transform: `translateX(${-index * 8}px)`,
                                }}
                              >
                                <Image
                                  layout="fill"
                                  objectFit="contain"
                                  src={SrcImages.defaultAvatar}
                                  alt="Principal UX Designer"
                                />
                              </div>
                            );
                          }
                          if (index === 3) {
                            return (
                              <div
                                className="flex h-8 w-8 rounded-full border-[1px] border-solid border-[#E2E2EA] relative overflow-hidden justify-center items-center"
                                style={{
                                  zIndex: 0,
                                  transform: `translateX(${-index * 8}px)`,
                                }}
                              >
                                <span className="text-[#696974] text-[12px] font-[400] text-center">
                                  +{5 - index}
                                </span>
                              </div>
                            );
                          }
                        })}
                      </div>
                      <span className="text-[#92929D] leading-[26px] text-[16px] font-[300] relative -left-4 whitespace-nowrap">
                        5 người bạn làm việc ở đây
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="flex  md:flex-col">
                {/* main  */}
                <div className="rounded-r-none rounded-l-[10px] md:rounded-[10px] w-full border border-[#F1F1F5] border-solid mt-5">
                  <div className="grid grid-flow-row md:gap-4 md:grid-cols-4">
                    {Array.from(side1).map((item, index) => (
                      <div
                        className={clsx(
                          'flex flex-col gap-3 p-[15px] md:!py-[20px] md:border-r md:border-r-[#F1F1F5] md:border-solid'
                        )}
                      >
                        <p className="font-[400] text-[14px] md:text-[16px] leading-[10px] md:leading-[22px] text-[#B5B5BE]">
                          {item.title}{' '}
                          {index === 3 && <span className="text-[12px]">/Tháng</span>}
                        </p>
                        <p className="font-[500] text-[16px] md:text-[16px] leading-[16px] md:leading-[28px] text-[#44444F]">
                          {item.subTitle}{' '}
                          {index === 3 && <span className="text-[12px]">VNĐ</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* main  */}
                <div className="rounded-l-none rounded-r-[10px] md:rounded-[10px] w-full border border-[#F1F1F5] border-solid mt-5">
                  <div className="grid grid-flow-row md:gap-4 md:grid-cols-4">
                    {Array.from(side2).map((item, index) => (
                      <div
                        className={clsx(
                          'flex flex-col gap-3 p-[15px] md:!py-[20px] md:border-r md:border-r-[#F1F1F5] md:border-solid'
                        )}
                      >
                        <p className="font-[400] text-[14px] md:text-[16px] leading-[10px] md:leading-[22px] text-[#B5B5BE]">
                          {item.title}
                        </p>
                        <p className="font-[500] text-[16px] md:text-[16px] leading-[16px] md:leading-[28px] text-[#44444F]">
                          {item.subTitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="leading-[24px] text-primary font-[500] text-[16px] mt-5  mb-[8px]">
                Tổng quan
              </p>

              <div
                className="text-[#696974] font-[300] text-[15px] md:text-[16px]"
                dangerouslySetInnerHTML={{
                  __html: formValues[RECRUITMENT_UPDATE_DATA_FIELD.overview],
                }}
              ></div>
              {/* title with list */}
              {Array(2)
                .fill('')
                .map((item, index) => (
                  <>
                    <p className="leading-[24px] text-primary font-[500] text-[16px] mt-5  mb-[8px]">
                      {index == 1 ? 'Lợi ích' : 'Yêu cầu công việc'}
                    </p>
                    <div
                      className="text-[#696974] font-[300] text-[15px] md:text-[16px]"
                      dangerouslySetInnerHTML={{
                        __html:
                          index === 1
                            ? formValues[RECRUITMENT_UPDATE_DATA_FIELD.benefit]
                            : formValues[RECRUITMENT_UPDATE_DATA_FIELD.requirement],
                      }}
                    ></div>
                    <ul className="pl-[20px] ">
                      <li className="flex items-center gap-[14px]">
                        <span className="h-[8px] w-[8px] rounded-full border border-[#50B5FF] border-solid block"></span>
                        <p className="text-[#696974] font-[300] text-[15px] md:text-[17px]">
                          Provide clear user flow and wireframe
                        </p>
                      </li>
                      <li className="flex items-center gap-[14px]">
                        <span className="h-[8px] w-[8px] rounded-full border border-[#50B5FF] border-solid block"></span>
                        <p className="text-[#696974] font-[300] text-[15px] md:text-[17px]">
                          Build prototype and do usability testing to solve user problems.
                        </p>
                      </li>
                      <li className="flex items-center gap-[14px]">
                        <span className="h-[8px] w-[8px] rounded-full border border-[#50B5FF] border-solid block"></span>
                        <p className="text-[#696974] font-[300] text-[15px] md:text-[17px]">
                          Follow design system guidelines.
                        </p>
                      </li>
                      <li className="flex items-center gap-[14px]">
                        <span className="h-[8px] w-[8px] rounded-full border border-[#50B5FF] border-solid block"></span>
                        <p className="text-[#696974] font-[300] text-[15px] md:text-[17px]">
                          Explore best practice approach to execute comprehensive
                          documentation
                        </p>
                      </li>
                    </ul>
                  </>
                ))}
              <div className="my-5 flex flex-col md:flex-row md:justify-between gap-4">
                <p className="text-primary font-semibold text-4 md:text-[18px]">
                  Bạn thấy phù hợp với công việc?
                </p>
                <div className={styles.side_bar_items__buttons}>
                  <Button
                    className="hover:!tw-bg-white hover:!tw-text-[#403ECC] nav-button tw-normal-case !tw-w-full !tw-text-white !px-2 !tw-py-2 !tw-bg-[#403ECC] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
                    // hover:!tw-bg-white hover:!tw-text-[#403ECC]
                    onClick={handleToggle}
                  >
                    Ứng tuyển
                  </Button>
                </div>
              </div>

              {/* <div className="w-full flex gap-[1rem] flex-row items-center">
              <p className="text-primary font-[400] text-[13px] md:text-[16px]">Tag:</p>
              {Array.from<string>(formValues[RECRUITMENT_UPDATE_DATA_FIELD.tags]).map((tag) => (
                <div
                  className={
                    'bg-[#F1F1F5] p-3  rounded-[5px]  flex items-center justify-center'
                  }
                >
                  <p>{tag}</p>
                </div>
              ))}
            </div> */}
            </div>
          </div>
        </div>

        {/* company info */}
        <div className="w-full flex flex-col xl:gap-5  xl:w-[400px] ">
          <div className="bg-white  px-[15px] md:px-[20px] rounded-[10px] ">
            <div className="flex flex-col  gap-4">
              <p className="leading-[34px] text-primary font-[500] text-[24px] mt-5  mb-[8px] xl:font[400] xl:text-[18px] xl:leading-[24px]">
                {currentAccountInfo.enterprise_name}
              </p>
              <p className="font-semibold text-[16px] leading-[24px] text-[#22216D]">
                Thông tin công ty
              </p>

              <TruncateLines
                lines={4}
                ellipsis={
                  <Link href={'#'} legacyBehavior>
                    <span>...Xem thêm</span>
                  </Link>
                }
                className="text-[#696974] font-[300] text-[17px] md:text-[16px] "
              >
                {currentAccountInfo.introduce}
              </TruncateLines>
              <div className="map ">
                <p className="font-semibold text-[16px] leading-[24px] text-[#22216D] mb-5">
                  Vi trí
                </p>
                {currentAccountInfo.address}, {currentAccountInfo.city_id},{' '}
                {currentAccountInfo.district_id},{currentAccountInfo.ward_id}
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-[16px] leading-[24px] text-[#22216D]">
                  Website
                </p>
                <Link href="#" legacyBehavior>
                  <span> {currentAccountInfo.website_url}</span>
                </Link>
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-[16px] leading-[24px] text-[#22216D]">
                  Quy mô
                </p>
                {currentAccountInfo.scale_id && (
                  <p>{ScaleId[`STR_SCALE_${currentAccountInfo.scale_id}`]}&nbsp; người</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center bg-white rounded-[10px]  p-[15px] md:px-[20px]  xl:flex-col xl:items-start xl:card !shadow-none md:pt-0 xl:pt-[20px]">
            <p className="font-semibold text-[16px] leading-[24px] text-[#22216D]">
              Chia sẻ ngay:
            </p>
            <ul className="list-inline flex social-list-icon gap-3">
              <li className="list-inline-item social">
                <a
                  className="social-icon text-xs-center"
                  href="https://www.facebook.com/youthvn11"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center">
                    <FaFacebook />
                    <p className="pl-1">Facebook</p>
                  </div>
                </a>
              </li>
              <li className="list-inline-item social">
                <a
                  className="social-icon text-xs-center"
                  href="https://www.instagram.com/youth.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center">
                    <FaInstagram />
                    <p className="pl-1">Instagram</p>
                  </div>
                </a>
              </li>
              <li className="list-inline-item social">
                <a
                  className="social-icon text-xs-center"
                  href="https://www.instagram.com/youth.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center">
                    <FaTiktok />
                    <p className="pl-1">Tiktok</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {uploadCVModal && (
        <CreateModalCandidate
          onClose={closeUploadCVModal}
          idPost={id}
        ></CreateModalCandidate>
      )}
    </div>
  );
};

export default DetailPostModule;
