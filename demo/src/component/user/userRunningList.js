import React from "react";
import "./userRunningList.css";
import Userrunningitem from "./userRunningItem";

function Userrunninglist(props) {
  const stateChanege = (id, state) => {
    props.changeState(id, state);
  };
  return (
    <>
      {props.mLoader ? (
        <h2>Loading...</h2>
      ) : props.runningItems.length === 0 ? (
        <div>
          <small>
            <u>This is Running Task</u>
          </small>
          <br />
          <br />
          no Task Found
        </div>
      ) : (
        <div>
          <small>
            <u>This is Done TASK</u>
          </small>
          <ul>
            {props.runningItems.map((ele) => (
              <Userrunningitem key={ele._id} data={ele} cState={stateChanege} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
            }
//   if (props.runningItems.length === 0) {
//     return (
//       <div>
//         <small>
//           <u>This is Done Task</u>
//         </small>
//         <br />
//         <br />
//         no Task Found
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <small>
//           <u>This is Done TASK</u>
//         </small>
//         <ul>
//           {props.runningItems.map((ele) => (
//             <Userrunningitem key={ele._id} data={ele} cState={stateChanege} />
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   // return (
//   //   <>

//   //     {props.mLoader ? (

//   //       <h2>loding...</h2>
//   //     ) : props.runningItems.length === 0 ? (
//   //       <div>
//   //         <small>
//   //           <u>This is Running State</u>
//   //         </small>
//   //         <br />
//   //         <br />
//   //         no Task Found
//   //       </div>
//   //     ) : (
//   //       <div>
//   //         <small>
//   //           <u>This is Running State</u>
//   //         </small>
//   //         <ul>
//   //           {props.runningItems.map((ele) => (
//   //             <Userrunningitem key={ele._id} data={ele} cState={stateChanege} />
//   //           ))}
//   //         </ul>
//   //       </div>
//   //     )}
//   //   </>
//   // );
// }
export default Userrunninglist;
