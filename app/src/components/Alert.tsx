import React from 'react';

import { CustomError } from 'types/common';

function Alert(props: { errors: CustomError[] | null }) {
  const { errors } = props;

  if (!errors) {
    return null;
  }

  return (
    <div className="my-2">
      {errors.map((error, index) => (
        <div key={index} className="bg-red-100 rounded-md text-red-800 p-2 font-small">
          {error.message}
        </div>
      ))}
    </div>
  );
}

export default Alert;
