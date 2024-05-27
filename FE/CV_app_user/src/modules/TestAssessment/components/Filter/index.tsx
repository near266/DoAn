import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { includes, isEqual, isString } from 'lodash';
import { useState } from 'react';

const names = ['Tất cả', 'Mới nhất', 'Phổ biến'];

export default function SearchFilter() {
  const defaultValue = ['Lựa chọn'];
  const [personName, setPersonName] = useState<string[]>(defaultValue);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      isString(value) ? value.split(',') : value
    );
  };

  return (
    <div
      className="tw-relative tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full"
      style={{
        fontFamily: 'Lexend Deca ',
        filter: 'drop-shadow(0px 0px 7px rgba(41, 41, 50, 0.1))',
      }}
    >
      <Select
        sx={{
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
          fontFamily: 'Lexend Deca',
        }}
        minRows={1}
        style={{
          margin: '0px',
          width: '100%',
          outline: 'none',
          outlineWidth: '0px',
          backgroundColor: 'transparent',
          border: '0',
          forcedColorAdjust: 'none',
          position: 'relative',
        }}
        value={personName}
        onChange={handleChange}
        IconComponent={(props) => {
          return (
            <div
              className="tw-w-[28px] tw-border-l-2
          tw-border-r-0 tw-border-t-0 tw-border-b-0 tw-border-[#F1F1F5] tw-border-solid tw-flex tw-justify-center tw-items-center tw-h-9 tw-fixed tw-right-0 tw-transform"
              style={{ transition: 'transform 600ms ease' }}
            >
              <img
                src="/images/icons/dropdown.svg"
                height={16}
                width={16}
                alt=""
                className={`${
                  includes(props.className, 'MuiSelect-iconOpen') ? 'tw-rotate-180' : ''
                }`}
                style={{ transition: 'transform 600ms ease' }}
              />
            </div>
          );
        }}
        input={<OutlinedInput label="" />}
        inputProps={{ MenuProps: { disableScrollLock: true } }}
        renderValue={(selected) => {
          return selected.map((item) => {
            return (
              <div className="tw-text-[#696974] tw-text-sm tw-mr-2">
                Sort by: <strong className="tw-text-sm tw-text-[#44444F]">{item}</strong>
              </div>
            );
          });
        }}
        // MenuProps
        // MenuProps={{ className: 'hide_scrollbar' }}
      >
        {names.map((name) => (
          <MenuItem key={name} className="tw-flex tw-h-[48px]" value={name}>
            <Checkbox
              style={{
                color: '#30AB7E',
              }}
              checked={isEqual(personName, [name])}
            />
            <div
              className="tw-text-[#696974] !tw-text-sm "
              style={{ fontFamily: 'Lexend Deca' }}
            >
              {name}
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
