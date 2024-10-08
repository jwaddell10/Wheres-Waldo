import styled from "styled-components";
import PropTypes from "prop-types";
import Counter from "./Counter";

export default function CharacterNavBar({ characters, gameEnd }) {
	return (
		<>
			<div style={{ position: "absolute", backdropFilter: "grayscale(0)" }}>
				<StyledNavBar>
					{characters &&
						characters.map((character, index) => (
							<StyledDiv
								style={{ overflow: "hidden" }}
								key={index}
							>
								<StyledImage
									src={`/${character}.jpg`}
									alt="character"
								/>
							</StyledDiv>
						))}
				</StyledNavBar>
				<Counter gameEnd={gameEnd}/>
			</div>
		</>
	);
}

const StyledNavBar = styled.section`
	display: flex;
	position: relative;
	z-index: 1;
	gap: 0.5rem;
	margin-left: 10px;
`;

const StyledDiv = styled.div`
	width: 5vw;
	height: auto;
	border: 5px solid #338aff;
	outline: 1px solid black;
	border-radius: 50%;
	background-color: white;
	background-size: contain;
`;

const StyledImage = styled.img`
	width: 100%;
	height: 90%;
`;

CharacterNavBar.propTypes = {
	characters: PropTypes.array,
	gameEnd: PropTypes.func,
};
