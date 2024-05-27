import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { Dialog } from '@mui/material';
import ReactCrop from 'react-image-crop';
import cx from 'classnames';

import AppContext from '../../context/AppContext';
import { fileService } from '@/shared';
import { SET_VALUE_BY_KEY } from '../../hooks/useProfileData';
import styles from './styles.module.scss';

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
// function getResizedCanvas(canvas, newWidth, newHeight) {
//   const tmpCanvas = document.createElement('canvas');
//   tmpCanvas.width = newWidth;
//   tmpCanvas.height = newHeight;

//   const ctx = tmpCanvas.getContext('2d');
//   ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

//   return tmpCanvas;
// }

const ImageCropper = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<any>();
  const { profileData, dispatchProfileData } = useContext(AppContext);

  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const onImageLoaded = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // handle when user choose image in client
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      setModalShow(true);
    }
  };

  // show file when user click image
  const onAvatarClick = () => {
    fileInputRef.current.click();
  };

  // handle when user crop image in viewer
  const onCropChange = (cropped) => {
    if (cropped.width === 0) {
      return;
    }
    setCrop(cropped);
  };

  // cancel modal
  const cancelAction = () => {
    setModalShow(false);
    fileInputRef.current.value = null;
  };

  // done modal
  const doneAction = () => {
    setIsProcessing(true);
    const previewCanvas = previewCanvasRef.current;

    // Bỏ qua crop ảnh khi lưu
    // const canvas = getResizedCanvas(
    //   previewCanvas,
    //   props.imagePreviewWidth,
    //   props.imagePreviewWidth
    // );

    previewCanvas.toBlob(
      (blob: Blob) => {
        const imageFile = new File([blob], 'avatar.jpg');

        // create form data
        const formData = new FormData();
        formData.append('image', imageFile);

        fileService
          .upload('resume', formData)
          .then((res) => {
            if (res.payload.url) {
              dispatchProfileData({
                type: SET_VALUE_BY_KEY,
                key: props.name,
                value: res.payload.url,
              });
              cancelAction();
            }
          })
          .finally(() => setIsProcessing(false));
      },
      'image/jpeg',
      1
    );
  };

  return (
    <>
      <img
        className={`avatar-image ${styles.imageViewInPage}`}
        src={profileData[props.name]}
        onClick={() => onAvatarClick()}
        alt="Ảnh đại diện"
      />
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          style={{ display: 'none' }}
        />

        <Dialog open={modalShow} maxWidth="lg">
          <header className={styles.modalHeader}>CHỈNH SỬA ẢNH</header>
          <div className={styles.modalBody}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <div className="crop-area">
                    <div className={styles.modalBody__title}>Ảnh gốc</div>
                    <ReactCrop
                      src={upImg}
                      onImageLoaded={onImageLoaded}
                      crop={crop}
                      onChange={(cropped) => onCropChange(cropped)}
                      onComplete={(croppedData) => setCompletedCrop(croppedData)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={styles.preview}>
                    <div className={styles.modalBody__title}>Ảnh hiển thị</div>
                    <div>
                      <canvas
                        className="z-2!"
                        ref={previewCanvasRef}
                        style={{ width: `${props.imagePreviewWidth}px` }}
                        // style={{
                        //   width: Math.round(completedCrop?.width ?? 0),
                        //   height: Math.round(completedCrop?.height ?? 0)
                        // }}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx(styles.actions, 'col-md-12')}>
                  <button
                    className={cx(styles.actions__btn, 'btn btn-secondary')}
                    onClick={() => cancelAction()}
                  >
                    Hủy, không lưu
                  </button>
                  <button
                    className={cx(styles.actions__btn, 'btn btn-primary')}
                    disabled={isProcessing}
                    onClick={() => doneAction()}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-grow spinner-grow-sm"></span> Đang lưu..
                      </>
                    ) : (
                      <span>Lưu ảnh vào CV</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ImageCropper;
