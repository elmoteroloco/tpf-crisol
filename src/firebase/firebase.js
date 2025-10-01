import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth"
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

export const iniciarSesionConGoogle = () => {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                resolve(result.user)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const crearOrdenDeCompra = async (orden) => {
    try {
        const ordenesCollection = collection(db, "ordenes")
        const docRef = await addDoc(ordenesCollection, {
            ...orden,
            fecha: serverTimestamp(),
        })
        return docRef.id
    } catch (error) {
        console.error("Error al crear la orden de compra en Firebase: ", error)
        throw error
    }
}

export const crearUsuario = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const iniciarSesion = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const obtenerProductosFirebase = async () => {
    const productosCollectionRef = collection(db, "productos")
    const querySnapshot = await getDocs(productosCollectionRef)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const obtenerProductoPorIdFirebase = async (id) => {
    const docRef = doc(db, "productos", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    } else {
        throw new Error("Producto no encontrado en Firebase.")
    }
}

export const obtenerCategoriasFirebase = async () => {
    const categoriasCollectionRef = collection(db, "categorias")
    const querySnapshot = await getDocs(categoriasCollectionRef)
    const categorias = querySnapshot.docs.map((doc) => doc.data().nombre)
    return categorias.sort((a, b) => a.localeCompare(b))
}
