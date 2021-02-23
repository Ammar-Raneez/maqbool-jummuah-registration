import React, { useEffect, useState } from 'react';
import { AppWrapper, LoadingWrapper } from './App.styles';
import { ContactForm } from './components/ContactForm/ContactForm';
import { GlobalStyles } from './Global.styles';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setInterval(() => {
			setLoading(false);
		}, 2500)
	}, [isLoading])

	return (
		<AppWrapper>
			<GlobalStyles />
			{isLoading ? (
				<LoadingWrapper>
					<Loader 
						type="TailSpin"
						timeout={2500}
						height={100}
						width={100}
						color="black"
					/>
					<p>LOADING...</p>
				</LoadingWrapper>
			) : (
				<ContactForm />
			)}
		</AppWrapper>
	);
}

export default App;
