import * as React from 'react';
import { Txt, Alert } from 'rendition';

export const Notifications = ({
	hasAvailableNetworks,
	attemptedConnect,
	error,
}: {
	hasAvailableNetworks: boolean;
	attemptedConnect: boolean;
	error: string;
}) => {
	return (
		<>
			{attemptedConnect && (
				<Alert m={2} info>
					<Txt.span>Aplicando mudanças... </Txt.span>
					<Txt.span>
						Em breve, seu dispositivo estará online. Se a conexão não for
						bem-sucedida, o ponto de acesso estará de volta em alguns minutos, e
						recarregar este página permitirá que você tente novamente.
					</Txt.span>
				</Alert>
			)}
			{!hasAvailableNetworks && (
				<Alert m={2} warning>
					<Txt.span>
						Não há redes wi-fi disponíveis. Clique em 'Rescanear' para pesquisar
						novamente.
					</Txt.span>
				</Alert>
			)}
			{!!error && (
				<Alert m={2} danger>
					<Txt.span>{error}</Txt.span>
				</Alert>
			)}
		</>
	);
};
