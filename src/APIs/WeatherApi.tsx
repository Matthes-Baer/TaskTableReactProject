import React from "react";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// const baseUrl = "https://weatherbit-v1-mashape.p.rapidapi.com";

// const header = {
//     'X-RapidAPI-Key': 'x',
//     'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
//   }

// const param = {
//     lat: '54.32', 
//     lon: '10.12'
// }

// const request = (url: string) => ({
//     url,
//     headers: header,
//     params: param
// });

// export const WeatherApi = createApi({
//     reducerPath: 'WeatherApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//         get5DayForecast: builder.query({
//             query: () => request(`/forecast/3hourly`)
//         })
//     })});

//     export const { useGet5DayForecastQuery } = WeatherApi;