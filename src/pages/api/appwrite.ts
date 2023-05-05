import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://api.freecorps.xyz/v1') // Your API Endpoint
    .setProject('643e97095e9289cb37d5');               // Your project ID

export const api = {

    loginWithGoogle: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('github', 'http://corelibrary.vercel.app/', 'http://corelibrary.vercel.app/');
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