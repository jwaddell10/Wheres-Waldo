import styled from "styled-components";

export default function CharacterNavBar({ characters }) {
    console.log(characters, 'this is characters')
	return (
		<>
			<StyledNavBar>
				{characters &&
					characters.map((character, index) => {
						return (
							<StyledDiv
								style={{ overflow: "hidden" }}
								key={index}
							>
								<StyledImage
									src={`../src/assets/${character}.png`}
									alt=""
								/>
							</StyledDiv>
						);
					})}
			</StyledNavBar>
		</>
	);
}

const StyledNavBar = styled.section`
	display: flex;
	position: fixed;
	z-index: 1;
	gap: 0.5rem;
	margin-left: 10px;
`;

const StyledDiv = styled.div`
	width: 80px;
    height: 80px;
	border: 5px solid #338aff;
	outline: 1px solid black;
	border-radius: 50%;
	background-color: white;
	background-size: contain;
`;

const StyledImage = styled.img`
	width: 100%;
`;
