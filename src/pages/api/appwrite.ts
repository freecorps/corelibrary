import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://api.freecorps.xyz/v1')
    .setProject('643e97095e9289cb37d5');

const linkSucess = "localhost:3000/home"
const linkFailure = "localhost:3000"

export const api = {

    setUserAsLibrarian: async (): Promise<boolean> => {
        try {
          const account = new Account(client);
          const response = await account.updatePrefs({ isLibrarian: true });
      
          // Verifique se a resposta contém a propriedade 'isLibrarian'
          if (response.prefs && response.prefs.isLibrarian) {
            return true;
          }
          // Se a resposta não contém a propriedade 'isLibrarian', retorne false
          return false;
        } catch (error) {
          console.error(error); // Imprima o erro no console
          return false;
        }
    },
      
    checkIfUserIsLibrarian: async (): Promise<boolean> => {
        try {
          const account = new Account(client);
          const userPrefs = await account.getPrefs();
          return userPrefs.isLibrarian;
        } catch (error) {
          throw error;
        }
    },
      
    normalRegister: async (email: string, password: string) => {
        try {
            const account = new Account(client);
            const promise = account.create('unique()', email, password);
            return promise.then(function (response: any) {
                return response; // Success
            }, function (error: any) {
                throw error; // Failure
            });
        } catch (error) {
            throw error;
        }
    },

    normalLogin: async (email: string, password: string) => {
        try {
            const account = new Account(client);
            const promise = account.createEmailSession(email, password);
            return promise.then(function (response: any) {
                return response; // Success
            }, function (error: any) {
                throw error; // Failure
            });
        } catch (error) {
            throw error;
        }
    },

    loginWithGoogle: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('google', linkSucess, linkFailure);
            console.log(account);
        } catch (error) {
            throw error;
        }
    },

    loginWithGithub: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('github', linkSucess, linkFailure);
            console.log(account);
        } catch (error) {
            throw error;
        }
    },

    loginWithDiscord: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('discord', linkSucess, linkFailure);
            console.log(account);
        } catch (error) {
            throw error;
        }
    },

    getCurrentUser: async () => {
        const account = new Account(client);
        let promise = account.get();

        return promise.then(function (response: { $id: any; }) {
            return response.$id
        }, function (error: any) {
            console.log(error); // Failure
        });
    },

    userLogout: async () => {
        const account = new Account(client);
        let promise = account.deleteSession('current');

        promise.then(function (response: any) {
            console.log(response); // Success
        }, function (error: any) {
            console.log(error); // Failure
        });

    },
}