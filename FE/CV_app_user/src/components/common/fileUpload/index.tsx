import { FileAddOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    // Xử lý tập tin đã chấp nhận ở đây
    // Kiểm tra kích thước của file
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB
    const fileSize = acceptedFiles[0].size;
    if (fileSize > fileSizeLimit) {
      setErrorMessage('Dung lượng file phải nhỏ hơn hoặc bằng 5MB.');
      return;
    }
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-[3px] border-[#D5D5DC] p-4 text-center tw-rounded-[10px] bg-[#F1F1F5] "
    >
      <input {...getInputProps()} />
      <FileAddOutlined className="py-3 text-[56px] text-[#B5B5BE]" />
      {isDragActive ? (
        <p>Kéo tập tin vào đây...</p>
      ) : (
        <p className="text-[#44444F]">Kéo thả tập tin vào đây hoặc chọn từ máy tính</p>
      )}
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default FileUpload;
