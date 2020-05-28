import { gql } from 'apollo-boost';
import { client } from './Apollo';
import { useDispatch } from 'react-redux';

const useUserData = () => {
  const USER_QUERY = gql`
    query Users($address: String!) {
      user(id: $address) {
        id
        amount
        timeJoined
        votes {
          id
        }
      }
    }
  `;

  const USER_DAI_DEPOSIT_QUERY = gql`
    query Users($address: String!) {
      user(id: $address) {
        amount
      }
    }
  `;

  const USER_PROJECTS_QUERY = gql`
    query Users($address: String!) {
      user(id: $address) {
        projects
      }
    }
  `;

  // const getProjects = async () => {
  //   const result = await client.query({
  //     query: gql`
  //       {
  //         projects() {
  //           id
  //           benefactor
  //           projectDataIdentifier
  //           projectState
  //         }
  //       }
  //     `,
  //   });
  //   console.log('projects');
  //   console.log(result);
  // };

  const getUserDaiDeposit = async (address) => {
    try {
      const result = await client.query({
        query: USER_DAI_DEPOSIT_QUERY,
        variables: { address },
      });
      return result['data']['user']['amount'];
    } catch {
      console.warn('User not found');
      return 0;
    }
  };

  const getUserProjects = async (address) => {
    try {
      const result = await client.query({
        query: USER_PROJECTS_QUERY,
        variables: { address },
      });
      return result['data']['user']['projects'];
    } catch {
      console.warn('User not found while searching if they have projects');
      return 0;
    }
  };

  return { getUserDaiDeposit, getUserProjects };
};

export default useUserData;