import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    id,
    labelName,
    classNames,
    defaultValue,
    change,
    checkStat,
  } = props;

  return (
    <div className={`form-check ${classNames}`}>
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="checkbox"
          name={id}
          checked={defaultValue}
          value={defaultValue}
          onChange={change}
          disabled={checkStat}
        />
        {labelName}
      </label>
    </div>
  );
}

Input.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.number,
  labelName: PropTypes.string,
  classNames: PropTypes.string,
  defaultValue: PropTypes.bool,
  checkStat: PropTypes.bool,
  change: PropTypes.func,
};

Input.defaultProps = {
  checked: false,
  id: '',
  labelName: 'checkbox',
  classNames: '',
  defaultValue: false,
  checkStat: false,
  change: () => {},
};

export default Input;
