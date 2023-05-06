import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://api.freecorps.xyz/v1')
    .setProject('643e97095e9289cb37d5');

export const api = {
    loginWithGoogle: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('google', 'https://corelibrary.vercel.app', 'https://corelibrary.vercel.app');
            console.log(account);
        } catch (error) {
            throw error;
        }
    },

    loginWithGithub: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('github', 'https://corelibrary.vercel.app', 'https://corelibrary.vercel.app');
            console.log(account);
        } catch (error) {
            throw error;
        }
    },

    loginWithDiscord: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('discord', 'https://corelibrary.vercel.app', 'https://corelibrary.vercel.app');
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