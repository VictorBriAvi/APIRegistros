import { useState, useEffect, useCallback } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { useAuth } from "../components/context/authContext";

const useTiposDeGastosLogic = () => {
  const [tiposDeGastos, setTiposDeGastos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState([]);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const tiposDeGastosCollection = collection(db, "tiposDeGastos");

  const pageSize = 10;

  const { user } = useAuth();
  const usuario = user.uid;

  /** ACA ESOTOY HACIENDO CONSULTA DE LA COLECCION tiposDeServicios (DATABASE) */
  const getTiposDeGasto = async () => {
    const primeraConsulta = query(
      collection(db, "tiposDeGastos"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      limit(pageSize)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    const tiposDeGastoData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setTiposDeGastos(tiposDeGastoData);
    setIsLoading(false);
  };

  /** paginaSiguiente : Esta funcion cuando le dan al boton Siguiente y avanzo a los 4 valores siguientes */

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "tiposDeGastos"),
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

      const tipoDeGastoData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setTiposDeGastos(tipoDeGastoData);
    } else {
      console.log("no existen mas datos");
    }
  };

  /** paginaAnterior : Esta funcion cuando le dan al boton Anterior retorna a los 4 valores anteriores */

  const paginaAnterior = async () => {
    console.log(primerDocVisible);
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "tiposDeGastos"),
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

        const tipoDeGastoData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setTiposDeGastos(tipoDeGastoData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const addTipoDeGasto = async (nuevoTipoDeGasto) => {
    try {
      await addDoc(tiposDeGastosCollection, nuevoTipoDeGasto);
      getTiposDeGasto();
    } catch (error) {
      console.log(error);
    }
  };
  const getTipoDeGastoById = async (id) => {
    const tipoDeGastoDoc = doc(db, "tiposDeGastos", id);
    const tipoDeGastoEncontrado = await getDoc(tipoDeGastoDoc);
    if (tipoDeGastoEncontrado.exists()) {
      return {
        id: tipoDeGastoEncontrado.id,
        ...tipoDeGastoEncontrado.data(),
      };
    } else {
      return null;
    }
  };

  const updateTipoDeGasto = async (id, tipoDeGastoActualizado) => {
    try {
      const tipoDePagoDoc = doc(db, "tiposDeGastos", id);
      await updateDoc(tipoDePagoDoc, tipoDeGastoActualizado);
      getTiposDeGasto();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTipoDeGasto = async (id) => {
    const tipoDeGastoDoc = doc(db, "tiposDeGastos", id);
    await deleteDoc(tipoDeGastoDoc);
    getTiposDeGasto();
  };

  useEffect(() => {
    getTiposDeGasto();
  }, []);

  return {
    tiposDeGastos,
    isLoading,
    addTipoDeGasto,
    getTipoDeGastoById,
    updateTipoDeGasto,
    deleteTipoDeGasto,
    paginaSiguiente,
    paginaAnterior,
  };
};

export default useTiposDeGastosLogic;
