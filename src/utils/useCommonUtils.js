import useRouter from './useRouter';
import useWeb3Connect from './useWeb3Connect';
import { useEffect } from 'react';

export const useRedirectHomeIfNoEthAccount = () => {
  const router = useRouter();
  const web3Connect = useWeb3Connect();

  useEffect(() => {
    if (web3Connect.loaded && !web3Connect.connected) {
      router.history.push('/');
    }
  }, [web3Connect, router.history]);
};
