import { Client, Account, ID, Databases, Teams } from "appwrite";

const client = new Client()
    .setEndpoint('https://api.freecorps.xyz/v1')
    .setProject('643e97095e9289cb37d5');

let url;
switch(process.env.NEXT_PUBLIC_REACT_APP_ENV) {
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
url = "https://corelibrary.vercel.app"
const linkSucess = url+"/home"
const linkFailure = url

const teamId = "6471496a16b67e5cfb66"
const BoookCollectionId = "647221b8c6ab14ed6b60"
const BoookDatabaseId = "647221aecaa4096eb85f"
const ReserveBookDatabaseId = "647221a5440c0935f5a6"
const ReserveBookCollectionId = "647222636c48f479048d"
const database = new Databases(client)
//const teams = new Teams(client);

interface BookCardProps {
    id: string,
    title: string, 
    author: string, 
    resume: string, 
    quantity: number, 
    imageUrl: string,
    date: string
}
interface Reservation {
    user: string,
    bookId: string,
    date: string,
}

interface reservationData extends Reservation {
    book: BookCardProps
}

export const api = {

    getCurrentUser: async () => {
        const account = new Account(client);
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    addBook: async (title: string, author: string, resume: string, quantity: number, imageUrl: string): Promise<{id: string}> => {
        try {
            const response = await database.createDocument(BoookDatabaseId, BoookCollectionId, ID.unique(), {
                title: title,
                author: author,
                resume: resume,
                quantity: quantity,
                imageUrl: imageUrl,
                date: new Date().toISOString(),
            });
            return { id: response.$id };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateBook: async (id: string, title: string, author: string, resume: string, quantity: number, imageUrl: string): Promise<{id: string}> => {
        try {
            const response = await database.updateDocument(BoookDatabaseId, BoookCollectionId, id, {
                title: title,
                author: author,
                resume: resume,
                quantity: quantity,
                imageUrl: imageUrl,
            });
            return { id: response.$id };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteBook: async (id: string): Promise<boolean> => {
        try {
            await database.deleteDocument(BoookDatabaseId, BoookCollectionId, id);
            return true;
        } catch (error) {
            console.error(error);
            return false
        }
    },

    reserveBook: async (id: string): Promise<boolean> => {
        const book = await database.getDocument(BoookDatabaseId, BoookCollectionId, id);

        if (book.quantity <= 0) {
            return false;
        }

        try {
            const user = await api.getCurrentUser();
            const response = await database.createDocument(ReserveBookDatabaseId, ReserveBookCollectionId, ID.unique(), {
                user: user?.$id,
                bookId: id,
                date: new Date().toISOString(),
            });
            await database.updateDocument(BoookDatabaseId, BoookCollectionId, id, {
                quantity: book.quantity - 1,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    checkIfUserHasReservedBook: async (id: string): Promise<boolean> => {
        try {
            const user = await api.getCurrentUser();
            const response = await database.listDocuments(ReserveBookDatabaseId, ReserveBookCollectionId, [
                `user=${user?.$id}`,
                `bookId=${id}`,
            ]);
            if (response.documents && response.documents.length > 0) {
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    getBookById: async (id: string): Promise<BookCardProps> => {
        try {
            const response = await database.getDocument(BoookDatabaseId, BoookCollectionId, id);
            return {
                id: response.$id,
                title: response.title,
                resume: response.resume,
                author: response.author,
                quantity: response.quantity,
                imageUrl: response.imageUrl,
                date: response.date,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getReservedBooks: async (): Promise<Array<Reservation>> => {
        try {
            const user = await api.getCurrentUser();
            const response = await database.listDocuments(ReserveBookDatabaseId, ReserveBookCollectionId, [
                `user=${user?.$id}`,
            ]);
            if (response.documents && response.documents.length > 0) {
                return response.documents.map((doc) => {
                    return {
                        user: doc["user"],
                        bookId: doc["bookId"],
                        date: doc["date"],
                    };
                });
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    getReservationData: async (): Promise<Array<reservationData>> => {
        try {
            const user = await api.getCurrentUser();
            const response = await database.listDocuments(ReserveBookDatabaseId, ReserveBookCollectionId, [
                `user=${user?.$id}`,
            ]);
            if (response.documents && response.documents.length > 0) {
                const books = await Promise.all(
                    response.documents.map(async (doc) => {
                        const book = await api.getBookById(doc["bookId"]);
                        return {
                            user: doc["user"],
                            bookId: doc["bookId"],
                            date: doc["date"],
                            book: book,
                        };
                    })
                );
                return books;
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    getAvailableBooks: async (): Promise<Array<{title: string, autor:string, resume:string, quantity: number, id: string, imageUrl: string, date: string}>> => {
        try {
            const response = await database.listDocuments(BoookDatabaseId, BoookCollectionId);
            if (response.documents && response.documents.length > 0) {
                const books = response.documents.map((doc) => {
                    return {
                        resume: doc["resume"],
                        autor: doc["author"],
                        title: doc["title"],
                        quantity: doc["quantity"],
                        id: doc["$id"],
                        imageUrl: doc["imageUrl"],
                        date: doc["date"],
                    };
                });
                return books;
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    setUserAsLibrarian: async (): Promise<boolean> => {
        try {
          const account = new Account(client);
          const response = await account.updatePrefs({ isLibrarian: true });
          if (response.prefs && response.prefs.isLibrarian) {
            return true;
          }
          return false;
        } catch (error) {
          console.error(error);
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
        } catch (error) {
            throw error;
        }
    },

    loginWithGithub: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('github', linkSucess, linkFailure);
        } catch (error) {
            throw error;
        }
    },

    loginWithDiscord: async () => {
        try {
            const account = new Account(client);
            account.createOAuth2Session('discord', linkSucess, linkFailure);
        } catch (error) {
            throw error;
        }
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