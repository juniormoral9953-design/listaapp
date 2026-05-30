// src/services/responsaveisService.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION = 'responsaveis';

export const responsaveisService = {
  async listar() {
    const q = query(collection(db, COLLECTION), orderBy('criadoEm', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async buscarPorId(id) {
    const docRef = doc(db, COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw new Error('Responsável não encontrado.');
    return { id: snapshot.id, ...snapshot.data() };
  },

  async criar(dados) {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...dados,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    });
    return docRef.id;
  },

  async atualizar(id, dados) {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      ...dados,
      atualizadoEm: serverTimestamp(),
    });
  },

  async excluir(id) {
    // Excluir subcollection de pessoas primeiro
    const pessoasSnap = await getDocs(
      collection(db, COLLECTION, id, 'pessoas')
    );
    const deletePessoas = pessoasSnap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePessoas);

    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
  },
};
