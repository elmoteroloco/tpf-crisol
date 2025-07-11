import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth"
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
    serverTimestamp,
    query,
    where
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
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
            fecha: serverTimestamp()
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

const productosCollectionRef = collection(db, "productos")

export const obtenerProductosFirebase = async () => {
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

export const agregarProductoFirebase = async (producto) => {
    const docRef = await addDoc(productosCollectionRef, producto)
    return { id: docRef.id, ...producto }
}

export const actualizarProductoFirebase = async (id, productoActualizado) => {
    const docRef = doc(db, "productos", id)
    await updateDoc(docRef, productoActualizado)
    return { id, ...productoActualizado }
}

export const eliminarProductoFirebase = async (id) => {
    const docRef = doc(db, "productos", id)
    await deleteDoc(docRef)
    return { message: `Producto con ID ${id} eliminado.` }
}

const categoriasCollectionRef = collection(db, "categorias")

export const obtenerCategoriasFirebase = async () => {
    const querySnapshot = await getDocs(categoriasCollectionRef)
    const categorias = querySnapshot.docs.map((doc) => doc.data().nombre)
    return categorias.sort((a, b) => a.localeCompare(b))
}

export const agregarCategoriaFirebase = async (nombreCategoria) => {
    const nuevaCategoria = { nombre: nombreCategoria }
    const docRef = await addDoc(categoriasCollectionRef, nuevaCategoria)
    return { id: docRef.id, ...nuevaCategoria }
}

export const eliminarCategoriaFirebase = async (nombreCategoria) => {
    try {
        const q = query(categoriasCollectionRef, where("nombre", "==", nombreCategoria))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            throw new Error(`No se encontró la categoría "${nombreCategoria}" para eliminar.`)
        }

        const batch = writeBatch(db)
        querySnapshot.forEach((doc) => batch.delete(doc.ref))
        await batch.commit()
    } catch (error) {
        console.error("Error al eliminar categoría en Firebase:", error)
        throw error
    }
}
