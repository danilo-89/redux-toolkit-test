import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const DOGS_API_KEY = 'defb95ec-2f36-4668-98d5-31eb96950f3a';

interface Breed {
	id: string;
	name: string;
	breed_group: string;
	image: {
		url: string;
	};
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.thedogapi.com/v1',
		prepareHeaders(headers) {
			headers.set('x-api-key', DOGS_API_KEY);

			return headers;
		},
	}),
	endpoints(builder) {
		return {
			fetchBreeds: builder.query<
				Breed[],
				{ limit?: number | void; page?: number | void }
			>({
				query({ limit = 10, page = 0 }) {
					return `/breeds?limit=${limit}&page=${page}`;
				},
			}),
		};
	},
});

export const { useFetchBreedsQuery } = apiSlice;
