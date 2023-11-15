import { useState, useEffect, useCallback } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  query,
  startAfter,
  endBefore,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { useAuth } from "../components/context/authContext";

const useTiposDePagoLogic = () => {
  const [tiposDePago, setTiposDePago] = useState([]);
  const [tiposDePagoAll, setTiposDePagoAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const tiposDePagoCollection = collection(db, "tiposDePago");

  const pageSize = 10;

  const { user } = useAuth();
  const usuario = user.uid;

  const getTiposDePago = useCallback(async () => {
    setIsLoading(true);
    const paginacionSiguiente = query(
      collection(db, "tiposDePago"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      limit(pageSize)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      const tipoDePagoData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setTiposDePago(tipoDePagoData);
    } else {
      console.log("no existen mas datos");
    }
    setIsLoading(false);
  }, [tiposDePagoCollection]);

  const getTiposDePagoAll = useCallback(async () => {
    setIsLoading(true);
    const paginacionSiguiente = query(
      collection(db, "tiposDePago"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const tipoDePagoData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTiposDePagoAll(tipoDePagoData);
    } else {
      console.log("no existen mas datos");
    }
    setIsLoading(false);
  }, [tiposDePagoCollection]);

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "tiposDePago"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      startAfter(ultimoDoc),
      limit(pageSize)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const primerVisible = documentSnapshots.docs[0];
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const tipoDePagoData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerDocVisible);
      setTiposDePago(tipoDePagoData);
    } else {
      console.log("no existen mas datos");
    }
  };

  const paginaAnterior = async () => {
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "tiposDePago"),
        orderBy("usuarioId"),
        where("usuarioId", "==", usuario),
        endBefore(primerDocVisible),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const tipoDePagoData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setTiposDePago(tipoDePagoData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const addTipoDePago = async (nuevoTipoDePago) => {
    try {
      await addDoc(tiposDePagoCollection, nuevoTipoDePago);
      getTiposDePago();
    } catch (error) {
      console.log(error);
    }
  };
  const getTipoDePagoById = async (id) => {
    const tipoDePagoDoc = doc(db, "tiposDePago", id);
    const tipoDePagoEncontrado = await getDoc(tipoDePagoDoc);
    if (tipoDePagoEncontrado.exists()) {
      return {
        id: tipoDePagoEncontrado.id,
        ...tipoDePagoEncontrado.data(),
      };
    } else {
      return null;
    }
  };

  const updateTipoDePago = async (id, tipoDePagoActualizado) => {
    try {
      const tipoDePagoDoc = doc(db, "tiposDePago", id);
      await updateDoc(tipoDePagoDoc, tipoDePagoActualizado);
      getTiposDePago();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTipoDePago = async (id) => {
    const tipoDePagoDoc = doc(db, "tiposDePago", id);
    await deleteDoc(tipoDePagoDoc);
    getTiposDePago();
  };

  useEffect(() => {
    getTiposDePago();
    getTiposDePagoAll();
  }, []);

  return {
    tiposDePago,
    isLoading,
    addTipoDePago,
    getTipoDePagoById,
    updateTipoDePago,
    deleteTipoDePago,
    paginaSiguiente,
    paginaAnterior,
    tiposDePagoAll,
  };
};

export default useTiposDePagoLogic;
