import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { useCallback } from "react";
import { useEffect } from "react";
import { useAuth } from "../components/context/authContext";

const useCategoriasServiciosLogic = () => {
  const [categoriasServicios, setCategoriasServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const categoriaServicioCollection = collection(db, "categoriasServicios");

  const usuario = user.uid;
  const getCategoriasServicios = useCallback(async () => {
    setIsLoading(true);
    const primeraConsulta = query(
      collection(db, "categoriasServicios"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario)
    );

    const documentSnapshots = await getDocs(primeraConsulta);

    const categoriaServicioData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setCategoriasServicios(categoriaServicioData);
    setIsLoading(false);
  }, [categoriaServicioCollection]);

  const getCategoriasServiciosById = async (id) => {
    const categoriasDoc = doc(db, "categoriasServicios", id);
    const categoriaEncontrada = await getDoc(categoriasDoc);

    if (categoriaEncontrada.exists()) {
      return {
        id: categoriaEncontrada.id,
        ...categoriaEncontrada.data(),
      };
    } else {
      return null;
    }
  };
  const addCategoriaServicios = async (nuevaCategoria) => {
    try {
      setIsLoading(true);
      await addDoc(categoriaServicioCollection, nuevaCategoria);
      getCategoriasServicios();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategoriaServicio = async (id, categoriaActualizada) => {
    try {
      const categoriaDoc = doc(db, "categoriasServicios", id);
      await updateDoc(categoriaDoc, categoriaActualizada);
      getCategoriasServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategoriaServicio = async (id) => {
    const categoriaServicioDoc = doc(db, "categoriasServicios", id);
    await deleteDoc(categoriaServicioDoc);
    getCategoriasServicios();
  };

  useEffect(() => {
    getCategoriasServicios();
  }, []);

  return {
    categoriasServicios,
    addCategoriaServicios,
    isLoading,
    getCategoriasServiciosById,
    updateCategoriaServicio,
    deleteCategoriaServicio,
  };
};

export default useCategoriasServiciosLogic;
