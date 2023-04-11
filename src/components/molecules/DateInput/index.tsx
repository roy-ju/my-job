// import DatePicker from 'react-datepicker';
// import React, { useState } from 'react';
// import { ko } from 'date-fns/esm/locale';
// import Dropdown from '../Dropdown';

// export default function DateInput() {
//   const [startDate, setStartDate] = useState(new Date());
//   const [isDateInputClicked, setIsDateInputClicked] = useState(false);
//   const [dateValue, setDateValue] = useState('날짜 선택');

//   return (
//     <>
//       <Dropdown variant="outlined" value={dateValue} onClick={() => setIsDateInputClicked((prev) => !prev)} />
//       {isDateInputClicked && (
//         <DatePicker
//           dateFormat="yy-MM-dd"
//           selected={startDate}
//           locale={ko}
//           onChange={(date: Date) => {
//             const formattedDate = date
//               .toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
//               .replace(/\. /g, '-')
//               .replace(/\.$/, '');
//             setStartDate(date);
//             setDateValue(formattedDate);
//           }}
//           inline
//         />
//       )}
//     </>
//   );
// }

export {};
