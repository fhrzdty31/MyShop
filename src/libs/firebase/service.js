import { getFirestore, getDocs, collection, getDoc, doc, query, where, addDoc } from "firebase/firestore"
import bcrypt from "bcrypt"
import app from "./init"

const firestore = getFirestore(app)

export async function retrieveData(collectionName) {
    const snapshot = await getDocs(collection(firestore, collectionName))
    const data = snapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() })
    )

    return data
}

export async function retrieveDataById(collectionName, id) {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = snapshot.data()

    return data
}

export async function singUp(userdata = { email, fillname, phone, password, role }, callback) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', userdata.email)
    )

    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() })
    )

    if (data.length > 0) {
        return callback(false)
    } else {
        if (!userdata.role) {
            userdata.role = 'member'
        }

        userdata.password = await bcrypt.hash(userdata.password, 10)

        await addDoc(collection(firestore, 'users'), userdata).then(
            () => callback(true)
        ).catch(
            error => callback(error)
        )
    }
}