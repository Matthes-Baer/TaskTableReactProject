import React from "react";

// import 'chart.js/auto'
// import { Chart } from "react-chartjs-2";

// import { useGet5DayForecastQuery } from '../APIs/WeatherApi';

// export const DoughnutChartComp = () => {
//     const {data, error, isFetching} = useGet5DayForecastQuery(null);

//     if (error) {
//         return (
//             <div>Error</div>
//         )
//     } else if (isFetching) {
//         return (
//             <div>Lädt</div>
//         )
//     } else {
//         const dataTest = {
//             labels: data.data.map((data:any, idx: number) => idx + 1),
//             datasets: [{
//                 data: data.data.map((data:any) => data.temp),
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                   ],
//                   borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                   ],
//                   borderWidth: 2,
//             },
//         ],
//         }
    
//         return (
//             <div style={{width: '750px', margin: "0 auto"}}>
//                  {error ? (
//                     <>Error</>
//                 ) : isFetching ? (
//                     <>Loading</>
//                 ) : data ? (
//                     <Chart type='bar' data={dataTest}/>
//                 ) : null}
//             </div>
//         )
//     }
// }