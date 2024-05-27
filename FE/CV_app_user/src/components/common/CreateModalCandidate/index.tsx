import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  Space,
  message,
} from 'antd';
import SrcIcons from '@/assets/icons';
import styles from './indexModal.module.scss';
import TextArea from 'antd/lib/input/TextArea';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import locale from 'yup/lib/locale';
import 'dayjs/locale/zh-cn';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, setAuthUser } from '@/store';
import { useSnackbar } from '@/shared/snackbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import {
  CV_EDU_DATA_FIELD,
  CV_EXP_DATA_FIELD,
  FORM_CREATE_CANDIADTE,
  LICENSE_DATA_FIELD,
  listFeild,
  listGender,
} from '@/components/common/UploadCVModal/shared/enum';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload';

import axios from 'axios';
import cities from '../../../assets/address/cities.json';
import districts from '../../../assets/address/districts.json';
import wards from '../../../assets/address/wards.json';
import { allAPI } from '@/modules/Home/shared/AllApiService';
import { appLibrary } from '@/shared';

const CreateModalCandidate = ({ onClose, idPost }) => {
  console.log(idPost);
  const { loading, data, succeeded } = useSelector((state: any) => state.login);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const [form] = Form.useForm();
  const avatarFile = Form.useWatch<UploadChangeParam<UploadFile<any>>>(
    LICENSE_DATA_FIELD.cv_path,
    form
  );

  const [listImgEdit, setListImgEdit] = useState<string[]>([]);
  const [educationList, setEducationList] = useState([{}]);
  const [path_CV, setPathCV] = useState('');
  const [uploadCVModal, setUploadCVModal] = useState(false);
  const closeUploadCVModal = () => setUploadCVModal(false);
  const openUploadCVModal = () => setUploadCVModal(true);

  const handleFileChange = async (file) => {
    try {
      // Tạo formData để chứa tệp cần upload
      const formData = new FormData();
      formData.append('file', file);
      appLibrary.showloading();
      const upload = await allAPI.UploadCv(formData);
      const url = await axios.get(upload.getInfoUri);
      const path = upload.stringConnect + url.data.downloadTokens;
      console.log(path);

      setPathCV(path);
      console.log(path_CV);

      appLibrary.hideloading();
      message.success('UpLoadCV thành công');

      // Cập nhật trạng thái hoặc thực hiện hành động phù hợp với kết quả
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error uploading file:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      const payload = {
        job_post_id: idPost,
        user_id: data.id,
        name: formData[FORM_CREATE_CANDIADTE.name],
        email: formData[FORM_CREATE_CANDIADTE.email],
        phone: formData[FORM_CREATE_CANDIADTE.phone],
        cv_path: path_CV,
        status_id: 0,
        created_at: moment(),
      };
      console.log(payload);
      if (payload.user_id === null) {
        message.error('Hãy đăng nhập');
      } else {
        if (
          avatarFile &&
          avatarFile.file &&
          avatarFile.fileList &&
          avatarFile.fileList.length > 0
        ) {
          // Lấy đường dẫn của file từ fileList hoặc các thuộc tính khác của avatarFile tùy theo cách bạn đã lưu trữ
          const file = avatarFile.fileList[0];
          const filePath = file.originFileObj.name;

          if (filePath) {
            formData[LICENSE_DATA_FIELD.cv_path] = filePath.toString();
          }
        }

        const res = await allAPI.CreateCandidate(payload);
        message.success('Ứng tuyển thành công');
      }
      // Xác định ngày tháng năm sinh

      onClose();

      //   const response = await upLoadCVServiceService.createFormCV({
      //     fullname: formData[LICENSE_DATA_FIELD.fullname],
      //     apply_position: 'string',
      //     phone_number: formData[LICENSE_DATA_FIELD.phone_number],
      //     email: formData[LICENSE_DATA_FIELD.email],
      //     birthday: birthday,
      //     address: formData[LICENSE_DATA_FIELD.address],
      //     status: 0,
      //     created_at: '2024-03-13T03:09:47.342Z',
      //     updated_at: '2024-03-13T03:09:47.342Z',
      //     created_by: 'string',
      //     updated_by: 'string',
      //     assessment_id: getDataAssessment,
      //     assessment_result_id: 0,
      //     cv_Update_Cvs: {
      //       user_id: '6bf6efef2f074cc59c4510a5763c9662',
      //       note: 'string',
      //       position_desire: 'string',
      //       salary_desire: 'string',
      //       type_work: 'string',
      //       cv_path: path_CV,
      //       status: 0,
      //       created_at: '2024-03-13T03:09:47.342Z',
      //     },
      //     cv_edu: [
      //       {
      //         school: formData[CV_EDU_DATA_FIELD.school],
      //         major: formData[CV_EDU_DATA_FIELD.major],
      //         detail: 'string',
      //         period: period,
      //         created_at: '2024-03-13T03:09:47.342Z',
      //         updated_at: '2024-03-13T03:09:47.342Z',
      //       },
      //     ],
      //     cv_exp: [
      //       {
      //         company: formData[CV_EXP_DATA_FIELD.company],
      //         position: formData[CV_EXP_DATA_FIELD.position],
      //         detail: 'string',
      //         period: 'string',
      //         created_at: '2024-03-13T03:09:47.342Z',
      //         update_at: '2024-03-13T03:09:47.342Z',
      //       },
      //     ],
      //   });

      //   if (response) {
      //     message.success('Upload thành công');
      //   } else {
      //     message.error('Upload thất bại');
      //   }
    } catch (error) {
      console.error('Error while uploading CV:', error);
      message.error('Bạn chưa đăng nhập');
    }
  };

  return (
    <div className={styles.modal}>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
        className="py-[20px] w-[85%] h-[85%] overflow-visible rounded-[16px] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <button
          onClick={onClose}
          className="absolute z-12 cursor-pointer transition-transform transform hover:scale-105 z-10 text-white bg-[#44444F] border-solid border-[6px] border-white top-0 right-0 p-4 -translate-y-[10px] translate-x-[20px] rounded-full"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path></path>
          </svg>
        </button>

        <p className="text-[#0F0F14] text-[20px] font-bold p-[20px]">
          Tải hồ sơ của bạn lên Eztek
        </p>

        <div
          style={{ scrollbarWidth: 'thin' }}
          className="overflow-y-scroll overflow-x-none mb-[30px]  h-[80%] p-[20px]"
        >
          <style jsx global>{`
            ::-webkit-scrollbar {
              width: 10px; /* Độ dày của scrollbar cho trình duyệt WebKit (Chrome, Safari, Edge) */
            }
            ::-webkit-scrollbar-thumb {
              background-color: #ccc; /* Màu của thumb của scrollbar */
              border-radius: 6px; /* Bo tròn thumb của scrollbar */
            }
            ::-webkit-scrollbar-track {
              background-color: #f1f1f1; /* Màu của track của scrollbar */
              border-radius: 8px; /* Bo tròn track của scrollbar */
            }
          `}</style>

          {/* Thông tin các nhân */}
          <div>
            <p className="text-[#22216D] text-[18px] my-[25px] font-bold">
              Thông tin cá nhân
            </p>

            <div>
              <div className="grid tw-grid-cols-3 tw-gap-3">
                <div className="w-full">
                  <p className="text-[#44444F] py-2">
                    Họ & Tên <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={FORM_CREATE_CANDIADTE.name}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="Nguyễn Văn A"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>

                <div>
                  <p className="text-[#44444F] py-2">
                    Email <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={FORM_CREATE_CANDIADTE.email}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="nguyenvanA@gmail.com"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>

                <div>
                  <p className="text-[#44444F] py-2">
                    Số điện thoại <span className="text-[#EB4C4C]">*</span>
                  </p>
                  <FormItem
                    name={FORM_CREATE_CANDIADTE.phone}
                    className="w-full"
                    rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
                  >
                    <Input
                      size="large"
                      className="rounded-[10px] p-2"
                      placeholder="0981765379"
                      allowClear
                    ></Input>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>

          {/* Học vấn */}

          {/* Kinh nghiệm nghề nghiệp */}

          {/* Mong muốn công việc */}

          {/* Tải FILE  */}
          <div className="mt-[30px] flex flex-col w-full gap-[10px]">
            <p className="font-[400] mb-1 text-[14px] text-[#696974] ">
              (Định dạng file .doc, .docx, .pdf dung lượng không lớn hơn 5 MB)
            </p>
            <FormItem
              name={FORM_CREATE_CANDIADTE.cv_path}
              rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              className="w-full h-full"
            >
              <Dragger
                className="h-full bg-[#F1F1F5] !rounded-[10px] !border-[3px] !border-dashed border-[#D5D5DC] !overflow-hidden"
                maxCount={1}
                onChange={(info) => {
                  const file = info.file.originFileObj; // Lấy tệp từ sự kiện thay đổi
                  if (file) {
                    handleFileChange(file); // Gọi hàm xử lý khi có tệp được chọn
                  }
                }}
                // showUploadList={false}
                fileList={avatarFile?.fileList}
              >
                {listImgEdit.length > 0 ? (
                  <div className="relative w-full min-h-[52px]">
                    <Image src={listImgEdit[0]} alt="Eztek Doanh nghiệp" layout="fill" />
                  </div>
                ) : (
                  <div className="ant-upload-drag-icon flex justify-center">
                    <Image
                      src={SrcIcons.file_plus}
                      width={42}
                      height={52}
                      alt="Eztek Doanh nghiệp"
                    />
                  </div>
                )}
                <p className="ant-upload-text">
                  Kéo thả file vào đây hoặc chọn file từ máy tính
                </p>
                <p className="ant-upload-hint">
                  Kích thước: {Number(avatarFile?.file?.size / 1048576).toFixed(3)} MB
                </p>
                {avatarFile?.file?.name && (
                  <p className="ant-upload-hint">Tên file: {avatarFile?.file?.name}</p>
                )}
              </Dragger>
            </FormItem>
            <div className="flex tw-justify-center">
              <a
                href="https://15a8dbdf.resume-app-create.pages.dev/resume-builder"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[12px]"
              >
                Tạo mới CV tại đây
              </a>
            </div>
          </div>
        </div>

        <div className="flex tw-justify-end tw-pe-[30px]">
          <button
            onClick={onClose}
            className="text-white bg-[#EB4C4C] w-[110px] font-semibold p-2 mr-3 rounded-[8px]"
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            className="rounded-[8px] w-[110px] text-white font-semibold p-2 bg-[#403ECC]"
          >
            Tải lên
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateModalCandidate;
