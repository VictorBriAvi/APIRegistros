import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { useAuth } from "../components/context/authContext";
import { useCallback } from "react";

const useProductoLogic = () => {
  const [productos, setProductos] = useState([]);
  const [productosAll, setProductosAll] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState(0);

  const productosColletion = collection(db, "productos");
  const pageSize = 10;

  const { user, loading } = useAuth();
  const usuario = loading ? "" : user ? user.uid || "" : "";

  /** ACA ESOTOY HACIENDO CONSULTA DE LA COLECCION tiposDeServicios (DATABASE) */

  const getProductos = useCallback(async () => {
    const primeraConsulta = query(
      collection(db, "productos"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario),
      limit(pageSize)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const ultimoVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const primerVisible = documentSnapshots.docs[0];

    const productosData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUltimoDoc(ultimoVisible);
    setPrimerDocVisible(primerVisible);
    setProductos(productosData);
    setIsLoading(false);
  }, [productosColletion]);

  const getProductosAll = async () => {
    /** ACA ESOTOY HACIENDO CONSULTA DE LA COLECCION tiposDeServicios (DATABASE) */

    const primeraConsulta = query(
      collection(db, "productos"),
      orderBy("usuarioId"),
      where("usuarioId", "==", usuario)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const productosData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProductosAll(productosData);
    setIsLoading(false);
  };

  /** buscarCategoria: Esta funcion se va a encarga de buscar y mostrar todo segun la categoria */

  const buscarCategoria = async (servicio) => {
    /** ACA ESOTOY HACIENDO CONSULTA DE LA COLECCION tiposDeServicios (DATABASE) */

    console.log(servicio);

    const primeraConsulta = query(
      collection(db, "productos"),
      where("usuarioId", "==", usuario),
      servicio ? where("nombreProducto", "==", servicio.label) : null || " ",
      limit(pageSize)
    );
    const documentSnapshots = await getDocs(primeraConsulta);

    const productosData = documentSnapshots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setProductos(productosData);
    setIsLoading(false);
  };

  /** paginaSiguiente : Esta funcion cuando le dan al boton Siguiente y avanzo a los 4 valores siguientes */

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "productos"),
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

      const productosData = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setProductos(productosData);
    } else {
      console.log("no existen mas datos");
    }
  };

  /** paginaAnterior : Esta funcion cuando le dan al boton Anterior retorna a los 4 valores anteriores */

  const paginaAnterior = async () => {
    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "productos"),
        orderBy("usuarioId"),
        where("usuarioId", "==", usuario),
        endBefore(primerDocVisible),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      console.log(documentSnapshots.docs);
      if (documentSnapshots.docs.length > 0) {
        console.log("en el  if");
        const primerVisible = documentSnapshots.docs[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        const productosData = documentSnapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(primerDocVisible);
        setPrimerDocVisible(primerVisible);
        setUltimoDoc(ultimoVisible);

        setProductos(productosData);
      } else {
        console.log("no existe mas datos");
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const getProductoById = async (id) => {
    const productoDoc = doc(db, "productos", id);
    const productoEncontrado = await getDoc(productoDoc);
    if (productoEncontrado.exists()) {
      return { id: productoEncontrado.id, ...productoEncontrado.data() };
    } else {
      return null;
    }
  };

  const addProducto = async (nuevoProducto) => {
    try {
      await addDoc(productosColletion, nuevoProducto);
      getProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProducto = async (id, productoActualizado) => {
    try {
      console.log(productoActualizado);
      const productoDoc = doc(db, "productos", id);
      await updateDoc(productoDoc, productoActualizado);
      getProductos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProducto = async (id) => {
    const productoDoc = doc(db, "productos", id);
    await deleteDoc(productoDoc);
    getProductos();
  };

  useEffect(() => {
    getProductos();
    getProductosAll();
  }, [user]);

  return {
    productos,
    deleteProducto,
    isLoading,
    addProducto,
    getProductoById,
    updateProducto,
    paginaSiguiente,
    paginaAnterior,
    getProductosAll,
    getProductos,
    buscarCategoria,
    productosAll,
  };
};

export default useProductoLogic;
