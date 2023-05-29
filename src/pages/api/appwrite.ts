import { Client, Account, ID, Databases, Teams, Query } from "appwrite";

const client = new Client()
    .setEndpoint('https://api.freecorps.xyz/v1')
    .setProject('643e97095e9289cb37d5')

const url = "https://corelibrary.freecorps.xyz/"
const linkSucess = url+"/home"
const linkFailure = url

const teamId = "6471496a16b67e5cfb66"
const BoookCollectionId = "647221b8c6ab14ed6b60"
const BoookDatabaseId = "647221aecaa4096eb85f"
const ReserveBookDatabaseId = "647221a5440c0935f5a6"
const ReserveBookCollectionId = "647222636c48f479048d"
const userCollectionId = "64738beb5bcf8792ae7c"
const userDatabaseId = "64738bdf4c8a01f4d8ec"
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
    done: boolean,
}

interface UserCadastro {
    user: string,
    blocked: boolean,
    blockedCount: number,
    isLibrarian: boolean,
    name: string,
    approved: boolean,
    photoURL?: string,
}

interface reservationData extends Reservation {
    book: BookCardProps
}

interface User {
    id: string,
    user: string,
    blocked: boolean,
    blockedCount: number,
    isLibrarian: boolean,
    name: string,
    approved: boolean,
    photoURL?: string,
}

let check = 0;

export const api = {

    getCurrentUser: async () => {
        const account = new Account(client);
        try {
            const user = await account.get()
            return user;
        } catch (error) {
            return null;
        }
    },

    getUserData: async (): Promise<User|null> => {
        try {
            const user = await api.getCurrentUser();
            const userId = user?.$id;
            if (!userId) {
                return null
            }
            const response = await database.listDocuments(userDatabaseId, userCollectionId, [
                Query.equal("user", [`${user?.$id}`]),
            ]);

            if (response.documents && response.documents.length > 0) {
                return {
                    id: response.documents[0]["$id"],
                    user: response.documents[0]["user"],
                    blocked: response.documents[0]["blocked"],
                    blockedCount: response.documents[0]["blockedCount"],
                    isLibrarian: response.documents[0]["isLibrarian"],
                    name: response.documents[0]["name"],
                    approved: response.documents[0]["approved"],
                    photoURL: response.documents[0]["photoURL"],
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    getUserById: async (id: string): Promise<User> => {
        try {
            const response = await database.listDocuments(userDatabaseId, userCollectionId, [
                Query.equal("user", [`${id}`]),
            ]);
            if (response.documents && response.documents.length > 0) {
                return {
                    id: response.documents[0]["$id"],
                    user: response.documents[0]["user"],
                    blocked: response.documents[0]["blocked"],
                    blockedCount: response.documents[0]["blockedCount"],
                    isLibrarian: response.documents[0]["isLibrarian"],
                    name: response.documents[0]["name"],
                    approved: response.documents[0]["approved"],
                    photoURL: response.documents[0]["photoURL"],
                };
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getAllUsers: async (): Promise<Array<User>> => {
        try {
            const response = await database.listDocuments(userDatabaseId, userCollectionId);
            if (response.documents && response.documents.length > 0) {
                const users = response.documents.map((doc) => {
                    return {
                        id: doc["$id"],
                        user: doc["user"],
                        blocked: doc["blocked"],
                        blockedCount: doc["blockedCount"],
                        isLibrarian: doc["isLibrarian"],
                        name: doc["name"],
                        approved: doc["approved"],
                        photoURL: doc["photoURL"],
                    };
                });
                return users;
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createUser: async (user: UserCadastro): Promise<boolean> => {
        try {
            const response = await database.createDocument(userDatabaseId, userCollectionId, ID.unique(), {
                user: user.user,
                blocked: user.blocked,
                blockedCount: user.blockedCount,
                isLibrarian: user.isLibrarian,
                name: user.name,
                approved: user.approved,
                photoURL: user.photoURL,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    setUserbyId: async (user: User): Promise<boolean> => {
        try {
            const response = await database.updateDocument(userDatabaseId, userCollectionId, user.user, {
                blocked: user.blocked,
                blockedCount: user.blockedCount,
                isLibrarian: user.isLibrarian,
                name: user.name,
                approved: user.approved,
                photoURL: user.photoURL,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    setUserData: async (user: User): Promise<boolean> => {
        try {
            const response = await database.updateDocument(userDatabaseId, userCollectionId, user.user, {
                blocked: user.blocked,
                blockedCount: user.blockedCount,
                approved: user.approved,
                isLibrarian: user.isLibrarian,
                name: user.name,
                photoURL: user.photoURL,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    suspendUser: async (id: string): Promise<boolean> => {
        try {
            const data = await api.getUserData();
            const response = await database.updateDocument(userDatabaseId, userCollectionId, id, {
                approved: false,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    removeUser: async (id: string): Promise<boolean> => {
        try {
            const data = await api.getUserData();
            const response = await database.deleteDocument(userDatabaseId, userCollectionId, id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    setProfilePicture: async (id:string, url: string): Promise<boolean> => {
        try {
            const data = await api.getUserData();
            const response = await database.updateDocument(userDatabaseId, userCollectionId, id, {
                photoURL: url,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    autoBlock: async () => {
        if(check === 0) {
        const reservedBooks = await api.getReservedBooks();
        
            for(let i=0; i<reservedBooks.length; i++) {
                const reservation = reservedBooks[i];
                
                // check if the reservation date is more than 5 days ago
                const reservationDate = new Date(reservation.date);
                const currentDate = new Date();
                const diffTime = Math.abs(currentDate.getTime() - reservationDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if(diffDays > 5) {
                    // block the user if he has a reservation more than 5 days old
                    const user = await api.getUserById(reservation.user);
                    if (user.blocked) {
                        break
                    }
                    const data = await api.getUserData()
                    if (data) {
                        await api.blockUser(user.id, data.id);
                        break;
                    }
                    return
                }
            }
            check = 1;
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
                done: false,
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

    checkIfUserHasReservedBook: async (id: string): Promise<Reservation|null> => {
        try {
            const user = await api.getCurrentUser();
            const response = await database.listDocuments(ReserveBookDatabaseId, ReserveBookCollectionId, [
                Query.equal("user", [`${user?.$id}`]),
            ]);
            if (response.documents && response.documents.length > 0) {
                const book = response.documents.find((doc) => doc["bookId"] === id);
                if (book) {
                    return {
                        user: book["user"],
                        bookId: book["bookId"],
                        date: book["date"],
                        done: book["done"],
                    };
                }
            }

            return null
        } catch (error) {
            console.error(error);
            return null
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
                Query.equal("user", [`${user?.$id}`]),
            ]);
            if (response.documents && response.documents.length > 0) {
                return response.documents.map((doc) => {
                    return {
                        user: doc["user"],
                        bookId: doc["bookId"],
                        date: doc["date"],
                        done: doc["done"],
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
                Query.equal("user", [`${user?.$id}`]),
            ]);
            if (response.documents && response.documents.length > 0) {
                const books = await Promise.all(
                    response.documents.map(async (doc) => {
                        const book = await api.getBookById(doc["bookId"]);
                        return {
                            user: doc["user"],
                            bookId: doc["bookId"],
                            date: doc["date"],
                            done: doc["done"],
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

    setReservationAsDone: async (id: string): Promise<boolean> => {
        try {
            const response = await database.updateDocument(ReserveBookDatabaseId, ReserveBookCollectionId, id, {
                done: true,
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
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

    chekIfUserIsBlocked: async (): Promise<boolean> => {
        try {
            const data = await api.getUserData()
            if (!data) {
                return false
            }
            return data.blocked;    
        } catch (error) {
          console.error(error);
          return false;
        }
    },

    blockUser: async (user: string, docId: string): Promise<boolean> => {
        try {
            const data = await api.getUserById(user);
                const response = await database.updateDocument(userDatabaseId, userCollectionId, docId, {
                    blocked: true,
                    blockedCount: data.blockedCount + 1,
                }
                );
            return true;
        } catch (error) {
          console.error(error);
          return false;
        }
    },

    unblockUser: async (id: string): Promise<boolean> => {
        try {
          const data = await api.getUserData();
            const response = await database.updateDocument(userDatabaseId, userCollectionId, id, {
                blocked: false
            }
            );
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
    },

    approvUser: async (id: string): Promise<boolean> => {
        try {
            const data = await api.getUserData();
              const response = await database.updateDocument(userDatabaseId, userCollectionId, id, {
                approved: true
              }
              );
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
    },

    setUserAsLibrarian: async (user?: string): Promise<boolean> => {
        try {
            const data = await api.getUserData()
            if (!data) {
                return false
            }
            if (user) {
                const response = await database.updateDocument(userDatabaseId, userCollectionId, user, {
                    isLibrarian: true
                }
                );
                return true;
            }
            const response = await database.updateDocument(userDatabaseId, userCollectionId, data.user, {
                isLibrarian: true
            }
            );
            return true;
        } catch (error) {
            return false;
        }
    },
      
    checkIfUserIsLibrarian: async (): Promise<boolean> => {
        try {
            const data = await api.getUserData()
            if (!data) {
                return false
            }
            return data.isLibrarian;
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