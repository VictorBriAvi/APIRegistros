import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  startAfter,
  limit,
  query,
  endBefore,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import moment from "moment";
import { useAuth } from "../components/context/authContext";

const useColaboradoresLogic = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradoresAll, setColaboradoresAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const colaboradoresCollection = collection(db, "colaboradores");
  const pageSize = 10;

  const usuario = user.uid;

  const getColaboradores = async () => {
    setIsLoading(true);
    const paginacionSiguiente = query(
      collection(db, "colaboradores"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),

      limit(pageSize)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      const colaboradoresData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setColaboradores(colaboradoresData);
    } else {
      console.log("no existen mas datos");
    }
    setIsLoading(false);
  };
  const getColaboradoresAll = async () => {
    setIsLoading(true);
    const paginacionSiguiente = query(
      collection(db, "colaboradores"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const colaboradoresData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setColaboradoresAll(colaboradoresData);
    } else {
      console.log("no existen mas datos");
    }
    setIsLoading(false);
  };

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "colaboradores"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      startAfter(ultimoDoc),
      limit(pageSize)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const colaboradoresData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setColaboradores(colaboradoresData);
    } else {
      console.log("no existen mas datos");
    }
  };

  const paginaAnterior = async () => {
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "colaboradores"),
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

        const colaboradoresData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setColaboradores(colaboradoresData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const getColaboradorById = async (id) => {
    const colaboradorDoc = doc(db, "colaboradores", id);
    const colaboradorEncontrado = await getDoc(colaboradorDoc);
    if (colaboradorEncontrado.exists()) {
      return { id: colaboradorEncontrado.id, ...colaboradorEncontrado.data() };
    } else {
      return null;
    }
  };

  const addColaborador = async (nuevoColaborador) => {
    console.log(nuevoColaborador);
    try {
      const { fechaNacimiento, ...restosDatos } = nuevoColaborador;
      const fechaNacimientoMoment = moment(fechaNacimiento, "YYYY-MM-DD");

      const fechaNacimientoFormateada =
        fechaNacimientoMoment.format(fechaNacimiento);

      const colaborador = {
        ...restosDatos,
        fechaNacimiento: fechaNacimientoFormateada,
      };
      console.log(colaborador);
      await addDoc(colaboradoresCollection, colaborador);
      getColaboradores();
    } catch (error) {
      console.log(error);
    }
  };

  const updateColaborador = async (id, colaboradorActualizado) => {
    try {
      const colaboradorDoc = doc(db, "colaboradores", id);
      await updateDoc(colaboradorDoc, colaboradorActualizado);
      getColaboradores();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColaborador = async (id) => {
    const productoDoc = doc(db, "colaboradores", id);
    await deleteDoc(productoDoc);
    getColaboradores();
  };

  useEffect(() => {
    getColaboradores();
    getColaboradoresAll();
  }, []);

  return {
    colaboradores,
    isLoading,
    addColaborador,
    getColaboradorById,
    updateColaborador,
    deleteColaborador,
    paginaSiguiente,
    paginaAnterior,
    colaboradoresAll,
  };
};

export default useColaboradoresLogic;
