import { ContainerLoading } from '@/components';
import { IAssessment } from '@/interfaces';
import { isUrl, isVietnamesePhoneNumber } from '@/shared/forms/helpers/validator';
import { useSnackbar } from '@/shared/snackbar';
import { useQuery } from '@apollo/client';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { vi } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { assessmentService, DETAIL_SIL_QUERY } from '../../shared';
import Introduce from '../TryTest/Introduce';
import styles from './styles.module.scss';
const Viral = (props) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [isDone, setIsDone] = useState(false);
  const [score, setScore] = useState('');
  const [formValue, setFormValue] = useState({
    link: '',
    phoneNumber: '',
    dob: null,
    locality: '',
  });

  const [silAssessmet, setSilAssessmet] = useState<IAssessment>({});
  const { loading } = useQuery(DETAIL_SIL_QUERY, {
    variables: {
      slug: router.query.slug,
    },
    onCompleted: (res) => {
      setSilAssessmet(res.sil);
    },
  });

  // get total score from result array
  const getTotalScore = (result: any) => {
    let totalScore = 0;
    result.forEach((item) => {
      totalScore += item.score;
    });
    return totalScore;
  };

  const getData = async (id) => {
    try {
      const res = await assessmentService.getSilResult(id);
      const submitedViral = await assessmentService.getSubmitedViral(id);
      if (submitedViral) {
        setFormValue({
          link: submitedViral.link ?? '',
          phoneNumber: submitedViral.phoneNumber ?? '',
          dob: submitedViral.dob ?? null,
          locality: submitedViral.locality ?? '',
        });
      }
      const totalScore = getTotalScore(res.payload.result);
      if (totalScore >= 0) {
        setScore(totalScore.toString());
      }
    } catch (error) {
      snackbar.showMessage(error.toString(), 'error');
    }
  };
  useEffect(() => {
    if (silAssessmet.id) {
      getData(silAssessmet.id);
    }
  }, [silAssessmet.id]);

  const onFomrSubmitRequest = async () => {
    try {
      const res = await assessmentService.submitViral(silAssessmet.id, formValue);
      if (res.code === 'SUCCESS') {
        setIsDone(true);
        snackbar.showMessage('Đã gửi!', 'success');
      }
    } catch (error) {
      snackbar.showMessage(error.toString(), 'error');
    }
  };

  const onLinkTextChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };
  const onPhoneNumberChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };
  const onDobChange = (newValue) => {
    setFormValue({ ...formValue, dob: newValue.toISOString().toString() });
  };
  const onLocalityChange = (event) => {
    setFormValue({ ...formValue, locality: event.target.value });
  };

  const onSummit = () => {
    if (!isVietnamesePhoneNumber(formValue.phoneNumber)) {
      snackbar.showMessage('Số điện thoại không hợp lệ', 'warning');
      return;
    }
    if (!isUrl(formValue.link)) {
      return snackbar.showMessage('Link không hợp lệ!', 'warning');
    }
    if (!formValue.dob) {
      return snackbar.showMessage('Ngày sinh không hợp lệ!', 'warning');
    }
    if (!formValue.locality) {
      return snackbar.showMessage('Địa điểm không hợp lệ!', 'warning');
    }

    onFomrSubmitRequest();
  };

  return (
    <>
      <ContainerLoading loading={loading}>
        <section className={styles.viral_container}>
          <div className="container">
            <Introduce assessment={silAssessmet} />
          </div>
          {isDone ? (
            <div className="container tw-text-center">Cảm ơn bạn đã hoàn thành...!</div>
          ) : (
            <div className="">
              <div className="container">
                <p>
                  <span>Điểm số của bạn là: {score}</span>
                </p>
              </div>
              <div className={`${styles.form_field} container`}>
                <form
                  name="viral_form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onFomrSubmitRequest;
                  }}
                >
                  <TextField
                    className={styles.form_field__textfield}
                    fullWidth
                    name="link"
                    value={formValue.link ?? ''}
                    label="Nhập link viral của bạn"
                    variant="standard"
                    onChange={onLinkTextChange}
                  />

                  <TextField
                    className={styles.form_field__textfield}
                    fullWidth
                    type="number"
                    value={formValue.phoneNumber ?? ''}
                    name="phoneNumber"
                    onChange={onPhoneNumberChange}
                    label="Nhập Số điện thoại của bạn"
                    variant="standard"
                  />
                  <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                    <FormControl className={styles.form_field__textfield} fullWidth>
                      <MobileDatePicker
                        label="Ngày sinh"
                        // maxDate={new Date()}
                        // defaultValue={dob}
                        inputFormat="dd/MM/yyyy"
                        value={formValue.dob}
                        onChange={onDobChange}
                        renderInput={(params) => <TextField name="dob" {...params} />}
                      />
                    </FormControl>
                  </LocalizationProvider>
                  <FormControl fullWidth>
                    <InputLabel id="locality">Vùng miền</InputLabel>
                    <Select
                      labelId="locality"
                      id="locality_select"
                      value={formValue.locality ?? ''}
                      label="Vùng miền"
                      name="locality"
                      onChange={onLocalityChange}
                    >
                      <MenuItem value={1}>Miền Bắc</MenuItem>
                      <MenuItem value={2}>Miền Trung</MenuItem>
                      <MenuItem value={3}>Miền Nam</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    className={styles.form_field__button}
                    variant="contained"
                    onClick={onSummit}
                  >
                    Hoàn Thành
                  </Button>
                </form>
              </div>
            </div>
          )}
        </section>
      </ContainerLoading>
    </>
  );
};

Viral.propTypes = {};

export default Viral;
