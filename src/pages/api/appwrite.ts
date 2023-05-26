import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://api.freecorps.xyz/v1')
    .setProject('643e97095e9289cb37d5');

let url;
switch(process.env.REACT_APP_ENV) {
    case 'dev':
    url = 'https://corelibrary.vercel.app';
        break;
    case 'prod':
        url = 'https://corelibrary.freecorps.xyz';
        break;
    default:
        url = 'http://localhost:3000';
    break;
}

const linkSucess = url+"/home"
const linkFailure = url

const database = new Databases(client);

export const api = {

    addBook: async (title: string, author: string, resume: string, quantity: number, imageUrl: string): Promise<{id: string}> => {
        try {
            // O ID da coleção onde os livros estão armazenados
            const collectionId = "646fd1d3caab68aced07"
            const databaseId = "646fd1c7b295932a9b1b"
            // Fazendo a requisição para criar um novo documento (livro)
            const response = await database.createDocument(databaseId, collectionId, ID.unique(), {
                title: title,
                author: author,
                resume: resume,
                quantity: quantity,
                imageUrl: imageUrl,
            });
            // Retornando o ID do novo livro
            return { id: response.$id };
        } catch (error) {
            console.error(error); // Imprime o erro no console
            throw error; // Lança o erro para ser tratado posteriormente
        }
    },

    getAvailableBooks: async (): Promise<Array<{title: string, autor:string, resume:string, quantity: number, id: string, imageUrl: string}>> => {
        try {
            // O ID da coleção onde os livros estão armazenados
            const collectionId = "646fd1d3caab68aced07"
            const databaseId = "646fd1c7b295932a9b1b"
            // Fazendo a requisição para buscar os documentos (livros)
            const response = await database.listDocuments(databaseId, collectionId);
            
            // Verificando se a resposta contém documentos
            if (response.documents && response.documents.length > 0) {
                // Transformando os documentos em um array de livros
                const books = response.documents.map((doc) => {
                    return {
                        resume: doc["resume"],
                        autor: doc["author"],
                        title: doc["title"],
                        quantity: doc["quantity"],
                        id: doc["$id"],
                        imageUrl: doc["imageUrl"],
                    };
                });
                console.log(books);
                return books;
            } else {
                // Se não houver livros disponíveis, retorna um array vazio
                return [];
            }
        } catch (error) {
            console.error(error); // Imprime o erro no console
            throw error; // Lança o erro para ser tratado posteriormente
        }
    },

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