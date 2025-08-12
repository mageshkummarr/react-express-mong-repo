import { Button } from '@mui/material';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thTdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
};

const FlightTable = ({ flights, onUpdate, onDelete, onAdd }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={{ ...thTdStyle, ...headerStyle }}>Flight No</th>
        <th style={{ ...thTdStyle, ...headerStyle }}>From</th>
        <th style={{ ...thTdStyle, ...headerStyle }}>To</th>
        <th style={{ ...thTdStyle, ...headerStyle }}>Airline</th>
        <th style={{ ...thTdStyle, ...headerStyle }}>Price</th>
        <th style={{ ...thTdStyle, ...headerStyle }}>Update</th>
        <th style={{ ...thTdStyle, ...headerStyle }}>Delete</th>
      </tr>
    </thead>
    <tbody>
      {flights.map((f) => (
        <tr key={f.flightNumber}>
          <td style={thTdStyle}>{f.flightNumber}</td>
          <td style={thTdStyle}>{f.departureCity}</td>
          <td style={thTdStyle}>{f.arrivalCity}</td>
          <td style={thTdStyle}>{f.airline}</td>
          <td style={thTdStyle}>${f.price}</td>
          <td style={thTdStyle}>
            <Button
              onClick={() => onUpdate(f.flightNumber)}
              variant="outlined"
              size="small"
            >
              Update
            </Button>
          </td>
          <td style={thTdStyle}>
            <Button
              onClick={() => onDelete(f.flightNumber)}
              variant="outlined"
              size="small"
              color="error"
            >
              Delete
            </Button>
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan="7" style={{ ...thTdStyle, textAlign: 'center' }}>
          <Button
            onClick={onAdd}
            type="button"
            variant="contained"
            color="primary"
            size="medium"
          >
            Add Flight
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
);

export default FlightTable;



// import { Button } from '@mui/material';

// const FlightTable = ({ flights, onUpdate ,onDelete,onAdd}) => (
//   <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//     <thead>
//       <tr>
//         <th>Flight No</th><th>From</th><th>To</th><th>Airline</th><th>Price</th><th>Update</th>
//       </tr>
//     </thead>
//     <tbody>
//       {flights.map((f) => (
//         <tr key={f.id}>
//           <td>{f.flightNumber}</td>
//           <td>{f.departureCity}</td>
//           <td>{f.arrivalCity}</td>
//           <td>{f.airline}</td>
//           <td>${f.price}</td>
//           <td>
//             <Button onClick={() => onUpdate(f.flightNumber)} variant="outlined" size="small">
//               Update
//             </Button>
//           </td>
//           <td>
              
//               <Button   onClick={() => onDelete(f.flightNumber)} variant="outlined" size="small" type="submit">delete</Button>
//             </td>
//         </tr>
//       ))}
//       <tr>
//            <td styles={"colspan:2"}>              
//               <Button   onClick={() => onAdd()} type="submit" variant="outlined" size="small" >Add Flight</Button>
//             </td>
//       </tr>
//     </tbody>
//   </table>
// );

// export default FlightTable;
