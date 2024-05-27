import { Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { includes, isString } from 'lodash';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { memo, ReactNode, useCallback, useMemo, useState } from 'react';

interface IProps {
  mutiple?: boolean;
  withCheckbox?: boolean;
  defaultValue?: string;
  leading?: React.ReactNode;
  options?: { label: string; value: any }[];
  iconStyles?: string;
  defaultLabel?: React.ReactNode;
  customIcon?: React.ReactNode;
  checkBoxStyle?: React.CSSProperties;
  onChange: (value: any) => void;
  renderSelectItem?: (selected: any) => React.ReactNode;
  renderSelectedItem?: (selected: any) => React.ReactNode;
}
/*
    Render selected element for single select
    @param selected: string[] - selected items
  */
const renderSingle = (selected: string[], label?: React.ReactNode) => {
  if (selected[0] == '') {
    return label;
  }
  return (
    <Tooltip title={selected[0]} arrow>
      <div className="tw-text-[#44444F] tw-text-sm tw-mr-2  tw-items-center tw-inline tw-w-full tw-text-ellipsis tw-overflow-hidden">
        {selected[0]}
      </div>
    </Tooltip>
  );
};
/*
    Render selected element for multiple select
    @param selected: string[] - selected items
  */
const renderMutiple = (selected: string[]) => selected.join(', ');

const renderDefaultLabel = (label?: string[]) => {
  return <div className="tw-text-sm tw-text-[#44444F] tw-mr-2">{label}</div>;
};

const CustomSelector: React.FC<IProps> = (props: IProps) => {
  const {
    mutiple,
    withCheckbox,
    defaultValue,
    leading,
    options,
    iconStyles,
    defaultLabel: label,
    customIcon,
    checkBoxStyle,
    onChange,
    renderSelectItem,
    renderSelectedItem,
  } = props;
  // const defaultValue = ['Lựa chọn'];
  const [selectedItem, setSelectedItem] = useState<any>([{ label: '', value: '' }]);

  const handleChange = useMemo(
    () => (event: any) => {
      const {
        target: { value },
      } = event;
      // const currentSelect = isString(value) ? value.split(',') : value;
      const currentS = options.filter((item) => item.value === value);
      setSelectedItem(currentS);
      props.onChange(currentS);
    },
    [selectedItem]
  );
  const handleRender = useCallback(
    (selected: string[]) => {
      /* render default label */
      if (selected[0] === '') return label ?? renderDefaultLabel(['Lựa chọn']);
      const onlyLabel = selectedItem.find((item) => item.value === selected[0]).label;
      const render = renderSelectedItem
        ? renderSelectedItem
        : mutiple
        ? renderMutiple
        : label
        ? () =>
            renderSingle(
              selectedItem.map((item) => item.label),
              label
            )
        : renderSingle;
      return render(onlyLabel);
    },
    [selectedItem]
  );

  return (
    <div className="tw-w-full">
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
            '& .MuiSelect-outlined': {
              padding: '0 auto',
              display: 'flex',
              alignItems: 'center',
            },
            '& fieldset': { top: 0 },
            fontFamily: 'Lexend Deca',
          }}
          minRows={1}
          defaultValue={defaultValue ?? ['Lựa chọn']}
          multiple={mutiple}
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
          value={selectedItem.map((item) => item.value)}
          onChange={handleChange}
          IconComponent={(inputProps) => {
            return (
              <div
                className={`${
                  iconStyles
                    ? iconStyles
                    : ' tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-b-0 tw-border-[#F1F1F5] tw-border-solid '
                } tw-w-[28px] tw-h-9 tw-flex tw-items-center tw-fixed tw-justify-center tw-right-0 tw-transform`}
                style={{ transition: 'transform 600ms ease' }}
              >
                <Image
                  src="/images/icons/dropdown.svg"
                  height={16}
                  width={16}
                  alt=""
                  className={`${
                    includes(inputProps.className, 'MuiSelect-iconOpen')
                      ? 'tw-rotate-180'
                      : ''
                  }`}
                  style={{ transition: 'transform 600ms ease' }}
                />
              </div>
            );
          }}
          input={
            <OutlinedInput
              className="tw-flex tw-items-center tw-p-0 tw-bg-amber-700"
              label=""
            />
          }
          inputProps={{ MenuProps: { disableScrollLock: true } }}
          renderValue={handleRender}
        >
          {props.options.map((item, index) => (
            <MenuItem key={index} value={item.value} className="tw-flex tw-items-center ">
              {props.withCheckbox && (
                <Checkbox
                  style={props.checkBoxStyle}
                  checked={includes(
                    selectedItem.map((item) => item.value),
                    item.value
                  )}
                />
              )}
              <div
                className="tw-text-[#696974] !tw-text-sm "
                style={{ fontFamily: 'Lexend Deca' }}
              >
                {item.label}
              </div>
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

CustomSelector.propTypes = {
  mutiple: PropTypes.bool.isRequired,
};
CustomSelector.defaultProps = {
  mutiple: false,
  checkBoxStyle: { color: '#30AB7E' },
  options: [{ label: '', value: '' }],
  withCheckbox: false,
};
export default memo(CustomSelector);
