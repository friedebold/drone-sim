import React from "react";
import { Text, View } from "react-native";
import { AnimatedText } from "react-native-wagmi-charts";
import styled from "styled-components/native";
import { margin } from "../../constants";
import { DataboxProps } from "./DataPanel";

interface Props {
	data: DataboxProps;
}

const Databox: React.FC<Props> = ({ data }) => {
	return (
		<Background>
			<Header>{data["header"]}</Header>
			<Row>
				<Column>
					{data.titles.map((title, idx) => {
						return <Text key={idx}>{title}</Text>;
					})}
				</Column>
				<View style={{ width: margin / 2 }} />
				<Column style={{ width: 70 }}>
					{data.values.map((value, idx) => {
						return <AnimatedText text={value} key={idx} />;
					})}
				</Column>
			</Row>
		</Background>
	);
};

const Background = styled.View`
	padding: ${margin / 3}px ${margin / 2}px;
	border-width: 1px;
	border-color: #00000015;
	border-radius: 25px;
`;

const Header = styled.Text`
	font-size: 20px;
`;

const Row = styled.View`
	flex-direction: row;
`;

const Column = styled.View``;

export default Databox;
