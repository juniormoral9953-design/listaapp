// src/services/pessoasService.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const BASE = 'responsaveis';
const SUB = 'pessoas';

const pessoasRef = (responsavelId) =>
  collection(db, BASE, responsavelId, SUB);

export const pessoasService = {
  async listar(responsavelId) {
    const q = query(pessoasRef(responsavelId), orderBy('criadoEm', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async criar(responsavelId, dados) {
    const docRef = await addDoc(pessoasRef(responsavelId), {
      ...dados,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    });
    return docRef.id;
  },

  async atualizar(responsavelId, pessoaId, dados) {
    const docRef = doc(db, BASE, responsavelId, SUB, pessoaId);
    await updateDoc(docRef, {
      ...dados,
      atualizadoEm: serverTimestamp(),
    });
  },

  async excluir(responsavelId, pessoaId) {
    const docRef = doc(db, BASE, responsavelId, SUB, pessoaId);
    await deleteDoc(docRef);
  },
};
