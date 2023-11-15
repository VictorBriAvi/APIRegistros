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
import moment from "moment";
import { useAuth } from "../components/context/authContext";

const useClienteLogic = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesAll, setClientesAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;
  const [ultimoDoc, setUltimoDoc] = useState([]);
  const [primerDocVisible, setPrimerDocVisible] = useState([null]);

  const clientesCollection = collection(db, "clientes");
  const { user } = useAuth();
  const usuario = user.uid;

  const getClientes = useCallback(async () => {
    const primeraConsulta = query(
      collection(db, "clientes"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      limit(pageSize)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    const clientesData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setClientes(clientesData);
    setIsLoading(false);
  }, [clientesCollection]);

  const getClientesAll = useCallback(async () => {
    const primeraConsulta = query(
      collection(db, "clientes"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const clientesData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setClientesAll(clientesData);
    setIsLoading(false);
  }, [clientesCollection, user]);

  /** paginaSiguiente : Esta funcion cuando le dan al boton Siguiente y avanzo a los 4 valores siguientes */

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "clientes"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      startAfter(ultimoDoc),
      limit(pageSize)
    );

    const documentSnapshots = await getDocs(paginacionSiguiente);

    if (documentSnapshots.docs.length > 0) {
      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const clientesData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setClientes(clientesData);
    } else {
      console.log("no existen mas datos");
    }
  };

  /** paginaAnterior : Esta funcion cuando le dan al boton Anterior retorna a los 4 valores anteriores */

  const paginaAnterior = async () => {
    console.log(primerDocVisible);
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "clientes"),
        orderBy("usuarioId"),
        where("usuarioId", "==", usuario),
        endBefore(ultimoDoc),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const clientesData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
        setClientes(clientesData);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const addCliente = async (nuevoCliente) => {
    try {
      const { fechaNacimiento, ...restosDatos } = nuevoCliente;
      const fechaNacimientoMoment = moment(fechaNacimiento, "YYYY-MM-DD");

      const fechaNacimientoFormateada =
        fechaNacimientoMoment.format(fechaNacimiento);

      const cliente = {
        ...restosDatos,
        fechaNacimiento: fechaNacimientoFormateada,
      };
      cliente;
      await addDoc(clientesCollection, cliente);
      getClientes();
    } catch (error) {
      console.log(error);
    }
  };
  const getClienteById = async (id) => {
    const clienteDoc = doc(db, "clientes", id);
    const clienteEncontrado = await getDoc(clienteDoc);
    if (clienteEncontrado.exists()) {
      return { id: clienteEncontrado.id, ...clienteEncontrado.data() };
    } else {
      return null;
    }
  };

  const updateCliente = async (id, clienteActualizado) => {
    try {
      const clienteDoc = doc(db, "clientes", id);
      await updateDoc(clienteDoc, clienteActualizado);
      getClientes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCliente = async (id) => {
    const clienteDoc = doc(db, "clientes", id);
    await deleteDoc(clienteDoc);
    getClientes();
  };

  useEffect(() => {
    getClientes();
    getClientesAll();
  }, []);

  return {
    clientes,
    isLoading,
    addCliente,
    getClienteById,
    updateCliente,
    deleteCliente,
    paginaSiguiente,
    paginaAnterior,
    clientesAll,
  };
};

export default useClienteLogic;
