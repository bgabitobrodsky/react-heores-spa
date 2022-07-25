import { useLocation, useNavigate} from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import queryString from 'query-string';

import { getHeroesByName } from '../helpers';
import { HeroCard } from '../components'

export const SearchPage = () => {

	const navigate = useNavigate();
	const location = useLocation();

	const {q = ''} = queryString.parse(location.search)
	const heroes = getHeroesByName(q);

	const showSearchAlert = ( q.length === 0 );
	const showNotFoundAlert = ( q.length > 0 && heroes.length === 0 );

	const {searchText, onInputChange} = useForm({
		searchText: q
	});

	const onSearchSubmit = (e) => {
		e.preventDefault();		
		navigate(`?q=${searchText}`);
	}

	return (
		<div className='animate__animated animate__fadeIn'>
			<h1>Search</h1>
			<hr />
			<div className='row'>

				<div className='col-5'>
					<h4>Searching</h4>
					<hr/>
					<form>
						<input 
							type="text"
							placeholder="Search a hero"
							className='form-control'
							name='searchText'
							autoComplete='off'
							value={searchText}
							onChange={onInputChange}
						/>
						<button className='btn btn-outline-primary mt-1' onClick={onSearchSubmit}>
							Search
						</button>
					</form>
				</div>
				<div className='col-7'>
					<h4>Results</h4>
					<hr/>
					<div className='alert alert-primary animate__animated animate__fadeIn' style={{display: showSearchAlert ? '' : 'none' }}>
						Search a hero
					</div>
					<div className='alert alert-danger animate__animated animate__fadeIn' style={{display: showNotFoundAlert ? '' : 'none' }}>
						No hero with <b>{ q }</b>
					</div>

					{
						heroes.map( hero => (
							<HeroCard key={ hero.id } { ...hero }/>
						))
					}
					
				</div>
			</div>
		</div>
	)
}
