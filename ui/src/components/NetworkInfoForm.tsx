import { JSONSchema7 as JSONSchema } from 'json-schema';
import * as React from 'react';
import { Button, Flex, Form, Heading, RenditionUiSchema } from 'rendition';
import { Network, NetworkInfo, Iface } from './App';
import { RefreshIcon } from './RefreshIcon';

const getSchema = (availableNetworks: Network[]): JSONSchema => ({
	type: 'object',
	properties: {
		ssid: {
			title: 'Nome da rede',
			type: 'string',
			default: availableNetworks[0]?.ssid,
			oneOf: availableNetworks.map((network) => ({
				const: network.ssid,
				title: network.ssid,
			})),
		},
		identity: {
			title: 'User',
			type: 'string',
			default: '',
		},
		passphrase: {
			title: 'Senha',
			type: 'string',
			default: '',
		},
	},
	required: ['ssid'],
});

const getUiSchema = (isEnterprise: boolean): RenditionUiSchema => ({
	ssid: {
		'ui:placeholder': 'Select SSID',
		'ui:options': {
			emphasized: true,
		},
	},
	identity: {
		'ui:options': {
			emphasized: true,
		},
		'ui:widget': !isEnterprise ? 'hidden' : undefined,
	},
	passphrase: {
		'ui:widget': 'password',
		'ui:options': {
			emphasized: true,
		},
	},
});

const isEnterpriseNetwork = (
	networks: Network[],
	selectedNetworkSsid?: string,
) => {
	return networks.some(
		(network) =>
			network.ssid === selectedNetworkSsid && network.security === 'enterprise',
	);
};

interface NetworkInfoFormProps {
	fetchNetworks: () => void;
	availableNetworks: Network[];
	secondaryWifi: Iface | undefined;
	onSubmit: (data: NetworkInfo) => void;
	onRepeat: (data: NetworkInfo) => void;
}

export const NetworkInfoForm = ({
	fetchNetworks,
	availableNetworks,
	secondaryWifi,
	onSubmit,
	onRepeat,
}: NetworkInfoFormProps) => {
	const [data, setData] = React.useState<NetworkInfo>({});

	const isSelectedNetworkEnterprise = isEnterpriseNetwork(
		availableNetworks,
		data.ssid,
	);

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			m={4}
			mt={5}
		>
			<Heading.h3 align="center" mb={4}>
				<Flex flexDirection={['column', 'row']} flexWrap="wrap">
					Olá! Por favor selecione o WiFi
					<Button
						ml={[0, 3]}
						tertiary
						plain
						icon={<RefreshIcon />}
						onClick={fetchNetworks}
					>
						Rescanear
					</Button>
				</Flex>
			</Heading.h3>

			<Form
				width={['100%', '80%', '60%', '40%']}
				onFormChange={({ formData }) => {
					setData(formData);
				}}
				onFormSubmit={({ formData }) => onSubmit(formData)}
				value={data}
				schema={getSchema(availableNetworks)}
				uiSchema={getUiSchema(isSelectedNetworkEnterprise)}
				secondaryButtonProps={{
					onClick: () => onRepeat(data),
					children: 'Repetir',
					width: '45%',
					mx: '20%',
					mt: 3,
					disabled: !secondaryWifi,
				}}
				submitButtonProps={{
					width: '45%',
					mx: '20%',
					mt: 3,
					disabled: availableNetworks.length <= 0,
				}}
				submitButtonText={'Conectar'}
			/>
		</Flex>
	);
};
