import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</>
	);
};

export default Providers;