import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { City } from '@/interfaces/IAddress';
import cities from '@/assets/address/cities.json';
import axios from 'axios';
const listProvince: City[] = [];

const searchBarItems = [
  {
    id: 'search',
    name: 'Tìm kiếm...',
    spanRate: '4',
    iconsUrl: '/images/icons/jobview/search.svg',
  },
  {
    id: 'address',
    name: 'Địa chỉ',
    spanRate: 'auto',
    iconsUrl: '/images/icons/jobview/address.svg',
  },
  {
    id: 'job',
    name: 'Công việc',
    spanRate: 'auto',
    iconsUrl: '/images/icons/jobview/job.svg',
  },
  {
    id: 'salary',
    name: 'Mức lương',
    spanRate: 'auto',
    iconsUrl: '/images/icons/jobview/salary.svg',
  },
];
const typeOfJob = [
  { label: 'Full Time Jobs', value: 1 },
  { label: 'Part Time Jobs', value: 2 },
  { label: 'Remote Jobs', value: 3 },
  { label: 'Ngoại khoá', value: 4 },
];

const Search = () => {
  const formik = useFormik({
    initialValues: {
      search: '',
      address: '',
      job: '',
      salary: '',
    },
    onSubmit: (values) => {
      document.location.href = `https://job.youth.com.vn/job/search?
      ${values.search ? `text_search=${values.search}` : ''}
      ${values.address ? `&city=${values.address}` : ''}
      ${values.salary ? `&salary=${values.salary}` : ''}
      ${values.job ? `&work=${values.job}` : ''}`;
    },
  });
 
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    const fetchProvinces = async () => {
     // const response = await axios.get('assets/address/cities.json');
      console.log(cities);
      // const data = await response.json();
      setProvinces(cities);
    };
    fetchProvinces();
  }, []);
 
  return (
    <form
      className={`${styles.search_bar}  col-12 tw-grid
      tw-grid-cols-1 md:tw-grid-cols-4 lg:tw-grid-cols-5
      tw-gap-[10px] md:!tw-gap-0 md:!tw-bg-transparent
      md:!tw-p-0 md:!tw-rounded-none md:!tw-border-none
      md:!tw-flex lg:tw-justify-center`}
      onSubmit={formik.handleSubmit}
    >
      {searchBarItems.map((item, index) => {
        return (
          <>
            <div
              className={`${styles.search_bar__input_wrap} tw-col-span-[${
                item.spanRate
              }] md:!tw-h-[70px] ${
                index == 0
                  ? 'md:first:!tw-rounded-l-[10px] md:first:!tw-rounded-r-none'
                  : 'md:!tw-rounded-none'
              } md:!tw-border-none`}
              key={index}
            >
              <div className="tw-flex tw-h-full tw-items-center">
                <img src={item.iconsUrl} alt={item.name} />
                {item.id === 'address' ? (
                  <select
                    {...formik.getFieldProps(item.id)}
                    id={item.id}
                    className={`${styles.search_bar__input_plaecholder}
                    tw-m-0 tw-border-none tw-outline-none`}
                    placeholder={item.name}
                  >
                    {provinces.length > 0 &&
                      provinces.map((pro) => (
                        <option value={pro.value} key={pro.value}>
                          {pro.value}
                        </option>
                      ))}
                  </select>
                ) : item.id === 'job' ? (
                  <select
                    id={item.id}
                    className={`${styles.search_bar__input_plaecholder}
                  tw-m-0 tw-border-none tw-outline-none`}
                    placeholder={item.name}
                    {...formik.getFieldProps(item.id)}
                  >
                    {typeOfJob.length > 0 &&
                      typeOfJob.map((job) => (
                        <option value={job.value} key={job.value}>
                          {job.label}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    {...formik.getFieldProps(item.id)}
                    type="text"
                    id={item.id}
                    className={`${styles.search_bar__input_plaecholder}
                tw-m-0 tw-border-none tw-outline-none`}
                    placeholder={item.name}
                  />
                )}
              </div>
            </div>
          </>
        );
      })}
      <Button
        className={`${styles.search_bar__button_search}
            md:!tw-h-[70px]  tw-normal-case !tw-bg-[#403ECC]
            md:!tw-rounded-l-none tw-col-auto md:!tw-max-w-[168px]
            tw-py-[22px] tw-px-[25px]`}
        variant="contained"
        type="submit"
      >
        <span className={`${styles.search_bar__button_search_text}`}>Tìm kiếm ngay</span>
      </Button>
    </form>
  );
};

export default Search;
