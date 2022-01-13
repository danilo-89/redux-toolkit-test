import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counterSlice';
import { useFetchBreedsQuery } from './features/dogs/dogsApiSlice';
import './App.css';

function App() {
	const value = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	const [numDogs, setNumDogs] = useState(10);
	const [numPage, setNumPage] = useState(0);
	const { data = [], isFetching } = useFetchBreedsQuery({
		limit: numDogs,
		page: numPage,
	});

	console.log(data);

	const handleAdd = () => {
		dispatch(incremented());
	};
	const handleAddAmount = () => {
		dispatch(amountAdded(3));
	};
	return (
		<div className='App'>
			<div>
				<div>Value: {value}</div>
				<div>
					<button onClick={handleAdd}>+</button>
					<button onClick={handleAddAmount}>Add +3</button>
				</div>
			</div>
			<hr />
			<div>
				<p>Dogs to fetch:</p>
				<select
					value={numDogs}
					onChange={(e) => setNumDogs(Number(e.target.value))}
				>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='15'>15</option>
					<option value='20'>20</option>
				</select>
				<p>Page to fetch:</p>
				<select
					value={numPage}
					onChange={(e) => setNumPage(Number(e.target.value))}
				>
					<option value='0'>0</option>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
				</select>
			</div>
			<div>
				{isFetching && <p>Loading dogs...</p>}
				<p>Number of dogs fetched: {data.length}</p>
				<hr />
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Breed Group</th>
							<th>Picture</th>
						</tr>
					</thead>
					<tbody>
						{data.map((breed) => (
							<tr key={breed.id}>
								<td>{breed.id}</td>
								<td>{breed.name}</td>
								<td>{breed.breed_group}</td>
								<td>
									<img height='250' src={breed.image.url} alt={breed.name} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
