import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { useAuth } from "../components/context/authContext";

const useHistorialClientesLogic = () => {
  /**ACA ESTAMOS OBTENIENDO TODA LA LISTA DE CLIENTES CON UN LIMITE DE 10 */

  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const [historialClientes, setHistorialClientes] = useState([]);
  const historialClientesCollection = collection(db, "historialClientes");
  const pageSize = 10;

  const { user, loading } = useAuth();
  const usuario = loading ? "" : user ? user.uid || "" : "";

  const getHistorialClientes = useCallback(async () => {
    try {
      const primeraConsulta = query(
        collection(db, "historialClientes"),
        where("usuarioId", "==", usuario),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(primeraConsulta);

      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      const promise = documentSnapshots.docs.map(async (doc) => {
        const historialClienteData = doc.data();
        const clienteRef = historialClienteData.nombreCompletoCliente;

        const [clienteSnapshots] = await Promise.all([getDoc(clienteRef)]);

        const clienteData = clienteSnapshots.data() || {};

        const historial = {
          ...historialClienteData,
          id: doc.id,
          descripcionHistorialCliente: doc.data().descripcionHistorialCliente,
          fechaHistorial: doc.data().fechaHistorial,
          nombreCompletoCliente: clienteData.nombreCompletoCliente,
          nombreDeHistorialCliente: doc.data().nombreDeHistorialCliente,
        };
        return historial;
      });

      const historialClienteCompletos = await Promise.all(promise);

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setHistorialClientes(historialClienteCompletos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [historialClientesCollection]);

  const addHistorialCliente = async (nuevoHistorial) => {
    console.log(nuevoHistorial);
    try {
      const historialRef = doc(db, nuevoHistorial.nombreCompletoCliente);

      const historialData = {
        nombreCompletoCliente: historialRef,
        descripcionHistorialCliente: nuevoHistorial.descripcionHistorialCliente,
        fechaHistorial: nuevoHistorial.fechaHistorial,
        nombreDeHistorialCliente: nuevoHistorial.nombreDeHistorialCliente,
        usuarioId: nuevoHistorial.usuarioId,
      };

      console.log(historialClientesCollection, historialData);
      await addDoc(historialClientesCollection, historialData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistorialClientes();
  }, []);

  return {
    historialClientes,
    isLoading,
    getHistorialClientes,
    addHistorialCliente,
  };
};

export default useHistorialClientesLogic;
