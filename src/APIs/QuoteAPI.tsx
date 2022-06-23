import React from "react";

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = "https://quotes15.p.rapidapi.com/quotes";
// const headers = {
//     'X-RapidAPI-Key': 'x',
//     'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
//   };
// const params = { language_code: 'de' }

// type URL = string;

// const request = (url: URL) => ({
//     url,
//     headers: headers,
//     params: params
//     });

// export const QuoteAPI = createApi({
//     reducerPath: 'quoteAPI',
//     baseQuery: fetchBaseQuery({baseUrl}),
//     endpoints: (builder) => ({
//         getRandomQuote: builder.query({
//             query: () => request('/random/')
//         })
//     })
// })

// export const { useGetRandomQuoteQuery } = QuoteAPI;