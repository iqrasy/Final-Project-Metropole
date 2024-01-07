import styled from "styled-components";
import Travel from "./travel/Travel";
import NewMap from "./NewMap";

const Home = () => {
	return (
		<>
			<Main>
				<TravelDiv>
					<Travel />
				</TravelDiv>
				{/* <MapDiv>
          <NewMap />
        </MapDiv> */}
			</Main>
		</>
	);
};

export default Home;

const MapDiv = styled.div`
	/* padding-left: 1em; */
`;

const Main = styled.div`
	margin: 2rem;
	/* width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 0; */
`;

const TravelDiv = styled.div`
	/* display: flex;
  justify-content: center;
  align-items: center; */
`;
