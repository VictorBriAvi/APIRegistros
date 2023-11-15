import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
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
import moment from "moment";
import { useAuth } from "../components/context/authContext";

const useServicioLogic = () => {
  const [servicios, setServicios] = useState([]);
  const [serviciosRangoFecha, setServiciosRangoFecha] = useState([]);
  const [serviciosPorFecha, setServiciosPorFecha] = useState([]);
  const [cachedServicios, setCachedServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ultimoDoc, setUltimoDoc] = useState(null);
  const [primerDocVisible, setPrimerDocVisible] = useState([0]);

  const serviciosColletion = collection(db, "servicios");
  const { user } = useAuth();
  const usuario = user.uid;
  const pageSize = 10;

  useEffect(() => {
    // Cuando el componente se monta, intenta recuperar datos en caché desde localStorage
    const cachedData = localStorage.getItem("cachedServicios");
    if (cachedData) {
      setCachedServicios(JSON.parse(cachedData));
    }
  }, []);

  const getServicios = async (fecha) => {
    // Obtén la fecha actual en el formato que estás utilizando en tus documentos

    const fechaHoy = moment().format("YYYY-MM-DD");

    const fechaConsulta = fecha ? fecha : fechaHoy;
    try {
      setIsLoading(true);

      const primeraConsulta = query(
        collection(db, "servicios"),
        where("fechaServicio", "==", fechaConsulta),
        where("usuarioId", "==", usuario),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(primeraConsulta);

      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      // Crear un array de promesas para obtener datos relacionados en paralelo
      const promises = documentSnapshots.docs.map(async (doc) => {
        const servicioData = doc.data();

        // Obtener referencias a datos relacionados
        const colaboradorRef = servicioData.nombreCompletoEmpleado;
        const clienteRef = servicioData.nombreCompletoCliente;
        const tipoDePagoRef = servicioData.nombreTipoDePago;
        const tipoDeServicioRef = servicioData.nombreServicio;

        // Usar Promise.all para obtener datos en paralelo
        const [
          colaboradorSnapshot,
          clienteSnapshot,
          tipoDePagoSnapshot,
          tipoDeServicioSnapshot,
        ] = await Promise.all([
          getDoc(colaboradorRef),
          getDoc(clienteRef),
          getDoc(tipoDePagoRef),
          getDoc(tipoDeServicioRef),
        ]);

        const colaboradorData = colaboradorSnapshot.data() || {};
        const clienteData = clienteSnapshot.data() || {};
        const tipoDePagoData = tipoDePagoSnapshot.data() || {};
        const tipoDeServicioData = tipoDeServicioSnapshot.data() || {};
        // Crear el objeto del servicio con los datos relacionados
        const servicio = {
          ...servicioData,
          id: doc.id,
          nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
          nombreCompletoCliente: clienteData.nombreCompletoCliente,
          nombreServicio: tipoDeServicioData.nombreServicio,
          nombreTipoDePago: tipoDePagoData.nombreTipoDePago,
          precioProducto: doc.data().precioProducto,
          fechaServicio: moment(doc.data().fechaServicio).format("MMMM DD"),
        };
        return servicio;
      });

      // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
      const serviciosCompletos = await Promise.all(promises);

      // Actualizar la caché con los nuevos datos
      localStorage.setItem(
        "cachedServicios",
        JSON.stringify(serviciosCompletos)
      );

      // Resto de tu código para actualizar el estado y gestionar la carga
      setCachedServicios(serviciosCompletos);
      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setServicios(serviciosCompletos);
      setServiciosPorFecha(serviciosCompletos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setIsLoading(false);
    }
  };

  const getServiciosPorRangoDeFecha = async (fechaInicio, fechaFin) => {
    console.log(fechaInicio);
    console.log(fechaFin);
    try {
      setIsLoading(true);

      const primeraConsulta = query(
        collection(db, "servicios"),
        where("usuarioId", "==", usuario),
        where("fechaServicio", ">=", fechaInicio),
        where("fechaServicio", "<=", fechaFin)
      );

      const documentSnapshots = await getDocs(primeraConsulta);

      const ultimoVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const primerVisible = documentSnapshots.docs[0];

      // Crear un array de promesas para obtener datos relacionados en paralelo
      const promises = documentSnapshots.docs.map(async (doc) => {
        const servicioData = doc.data();

        // Obtener referencias a datos relacionados
        const colaboradorRef = servicioData.nombreCompletoEmpleado;
        const clienteRef = servicioData.nombreCompletoCliente;
        const tipoDePagoRef = servicioData.nombreTipoDePago;
        const tipoDeServicioRef = servicioData.nombreServicio;

        // Usar Promise.all para obtener datos en paralelo
        const [
          colaboradorSnapshot,
          clienteSnapshot,
          tipoDePagoSnapshot,
          tipoDeServicioSnapshot,
        ] = await Promise.all([
          getDoc(colaboradorRef),
          getDoc(clienteRef),
          getDoc(tipoDePagoRef),
          getDoc(tipoDeServicioRef),
        ]);

        const colaboradorData = colaboradorSnapshot.data() || {};
        const clienteData = clienteSnapshot.data() || {};
        const tipoDePagoData = tipoDePagoSnapshot.data() || {};
        const tipoDeServicioData = tipoDeServicioSnapshot.data() || {};
        // Crear el objeto del servicio con los datos relacionados
        const servicio = {
          ...servicioData,
          id: doc.id,
          nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
          nombreCompletoCliente: clienteData.nombreCompletoCliente,
          nombreServicio: tipoDeServicioData.nombreServicio,
          nombreTipoDePago: tipoDePagoData.nombreTipoDePago,
          precioProducto: doc.data().precioProducto,
          fechaServicio: moment(doc.data().fechaServicio).format("MMMM DD"),
        };
        return servicio;
      });

      // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
      const serviciosCompletos = await Promise.all(promises);

      // Actualizar la caché con los nuevos datos
      localStorage.setItem(
        "cachedServicios",
        JSON.stringify(serviciosCompletos)
      );

      // Resto de tu código para actualizar el estado y gestionar la carga
      setCachedServicios(serviciosCompletos);
      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setServiciosRangoFecha(serviciosCompletos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setIsLoading(false);
    }
  };

  const paginaSiguiente = async () => {
    const paginacionSiguiente = query(
      collection(db, "servicios"),
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

      // Crear un array de promesas para obtener datos relacionados en paralelo
      const promises = documentSnapshots.docs.map(async (doc) => {
        const servicioData = doc.data();

        // Obtener referencias a datos relacionados
        const colaboradorRef = servicioData.nombreCompletoEmpleado;
        const clienteRef = servicioData.nombreCompletoCliente;
        const tipoDePagoRef = servicioData.nombreTipoDePago;
        const tipoDeServicioRef = servicioData.nombreServicio;

        // Usar Promise.all para obtener datos en paralelo
        const [
          colaboradorSnapshot,
          clienteSnapshot,
          tipoDePagoSnapshot,
          tipoDeServicioSnapshot,
        ] = await Promise.all([
          getDoc(colaboradorRef),
          getDoc(clienteRef),
          getDoc(tipoDePagoRef),
          getDoc(tipoDeServicioRef),
        ]);

        const colaboradorData = colaboradorSnapshot.data() || {};
        const clienteData = clienteSnapshot.data() || {};
        const tipoDePagoData = tipoDePagoSnapshot.data() || {};
        const tipoDeServicioData = tipoDeServicioSnapshot.data() || {};
        // Crear el objeto del servicio con los datos relacionados
        const servicio = {
          ...servicioData,
          id: doc.id,
          nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
          nombreCompletoCliente: clienteData.nombreCompletoCliente,
          nombreServicio: tipoDeServicioData.nombreServicio,
          nombreTipoDePago: tipoDePagoData.nombreTipoDePago,
          precioProducto: doc.data().precioProducto,
          fechaServicio: moment(doc.data().fechaServicio).format("MMMM DD"),
        };
        return servicio;
      });

      // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
      const serviciosCompletos = await Promise.all(promises);
      // Actualizar la caché con los nuevos datos
      localStorage.setItem(
        "cachedServicios",
        JSON.stringify(serviciosCompletos)
      );

      // Resto de tu código para actualizar el estado y gestionar la carga
      setCachedServicios(serviciosCompletos);
      setUltimoDoc(ultimoVisible);
      setPrimerDocVisible(primerVisible);
      setServicios(servicios);
    } else {
      console.log("no existen mas datos");
    }
  };

  const paginaAnterior = async () => {
    const serviciosDataArray = [];

    if (primerDocVisible) {
      const paginacionAnterior = query(
        collection(db, "servicios"),
        orderBy("usuarioId"),
        where("usuarioId", "==", usuario),
        endBefore(primerDocVisible),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(paginacionAnterior);

      if (documentSnapshots.docs.length > 0) {
        const primerVisible = serviciosDataArray[0];
        const ultimoVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // Crear un array de promesas para obtener datos relacionados en paralelo
        const promises = documentSnapshots.docs.map(async (doc) => {
          const servicioData = doc.data();

          // Obtener referencias a datos relacionados
          const colaboradorRef = servicioData.nombreCompletoEmpleado;
          const clienteRef = servicioData.nombreCompletoCliente;
          const tipoDePagoRef = servicioData.nombreTipoDePago;
          const tipoDeServicioRef = servicioData.nombreServicio;

          // Usar Promise.all para obtener datos en paralelo
          const [
            colaboradorSnapshot,
            clienteSnapshot,
            tipoDePagoSnapshot,
            tipoDeServicioSnapshot,
          ] = await Promise.all([
            getDoc(colaboradorRef),
            getDoc(clienteRef),
            getDoc(tipoDePagoRef),
            getDoc(tipoDeServicioRef),
          ]);

          const colaboradorData = colaboradorSnapshot.data() || {};
          const clienteData = clienteSnapshot.data() || {};
          const tipoDePagoData = tipoDePagoSnapshot.data() || {};
          const tipoDeServicioData = tipoDeServicioSnapshot.data() || {};
          // Crear el objeto del servicio con los datos relacionados
          const servicio = {
            ...servicioData,
            id: doc.id,
            nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
            nombreCompletoCliente: clienteData.nombreCompletoCliente,
            nombreServicio: tipoDeServicioData.nombreServicio,
            nombreTipoDePago: tipoDePagoData.nombreTipoDePago,
            precioProducto: doc.data().precioProducto,
            fechaServicio: moment(doc.data().fechaServicio).format("MMMM DD"),
          };
          return servicio;
        });

        // Esperar a que se resuelvan todas las promesas y obtener los servicios completos
        const serviciosCompletos = await Promise.all(promises);
        // Actualizar la caché con los nuevos datos
        localStorage.setItem(
          "cachedServicios",
          JSON.stringify(serviciosCompletos)
        );

        // Resto de tu código para actualizar el estado y gestionar la carga
        setCachedServicios(serviciosCompletos);
        setUltimoDoc(ultimoVisible);
        setPrimerDocVisible(primerVisible);
      }
    } else {
      console.log("no existen mas datos");
    }
  };

  const getServicioById = async (id) => {
    const servicioDoc = doc(db, "servicios", id);
    const servicioEncontrado = await getDoc(servicioDoc);

    if (servicioEncontrado.exists()) {
      const servicioData = servicioEncontrado.data();
      const clienteRef = servicioData.nombreCompletoCliente;
      const colaboradorRef = servicioData.nombreCompletoEmpleado;
      const servicioRef = servicioData.nombreServicio;
      const tipoDePagoRef = servicioData.nombreTipoDePago;

      try {
        const [
          clienteSnapshot,
          colaboradorSnapshot,
          servicioSnapshot,
          tipoDePagoSnapshot,
        ] = await Promise.all([
          getDoc(clienteRef),
          getDoc(colaboradorRef),
          getDoc(servicioRef),
          getDoc(tipoDePagoRef),
        ]);

        const clienteData = clienteSnapshot.data() || {};
        const colaboradorData = colaboradorSnapshot.data() || {};
        const tipoDeServicioData = servicioSnapshot.data() || {};
        const tipoDeDatoData = tipoDePagoSnapshot.data() || {};

        return {
          id: servicioEncontrado.id,
          nombreCompletoCliente: clienteData.nombreCompletoCliente,
          nombreCompletoEmpleado: colaboradorData.nombreCompletoEmpleado,
          nombreServicio: tipoDeServicioData.nombreServicio,
          nombreTipoDepago: tipoDeDatoData.nombreTipoDePago,
          precioProducto: servicioData.precioProducto,
        };
      } catch (error) {
        console.error("Error al obtener datos relacionados:", error);
        return null;
      }
    } else {
      return null;
    }
  };

  const addServicio = async (nuevoServicio) => {
    try {
      console.log(nuevoServicio);

      // Obtener las referencias de los documentos utilizando los ID proporcionados en nuevoServicio
      const clienteRef = doc(db, nuevoServicio.nombreCompletoCliente);
      const colaboradorRef = doc(db, nuevoServicio.nombreCompletoEmpleado);
      const tipoDeServicioRef = doc(db, nuevoServicio.nombreServicio);
      const tipoDePagoRef = doc(db, nuevoServicio.nombreTipoDePago);

      // Generar y formatear la fecha actual con moment
      const fechaActual = moment().format("YYYY-MM-DD");

      // Crear el objeto de servicio con las referencias
      const servicio = {
        nombreCompletoCliente: clienteRef,
        nombreCompletoEmpleado: colaboradorRef,
        nombreServicio: tipoDeServicioRef,
        nombreTipoDePago: tipoDePagoRef,
        fechaServicio: fechaActual,
        precioProducto: nuevoServicio.precioProducto,
        usuarioId: nuevoServicio.usuarioId,
      };

      // Agregar el nuevo servicio a Firestore
      await addDoc(serviciosColletion, servicio);
      console.log(servicio);

      // Volver a cargar los servicios actualizados
      getServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const updateServicio = async (id, servicioActualizado) => {
    try {
      if (servicioActualizado.nombreTipoDePago) {
        const tipoDePagoRef = doc(db, servicioActualizado.nombreTipoDePago);
        servicioActualizado.nombreTipoDePago = tipoDePagoRef;
      }
      if (servicioActualizado.nombreCompletoEmpleado) {
        const empleadoRef = doc(db, servicioActualizado.nombreCompletoEmpleado);
        servicioActualizado.nombreCompletoEmpleado = empleadoRef;
      }
      if (servicioActualizado.nombreCompletoCliente) {
        const clienteRef = doc(db, servicioActualizado.nombreCompletoCliente);
        servicioActualizado.nombreCompletoCliente = clienteRef;
      }
      if (servicioActualizado.nombreServicio) {
        const servicioRef = doc(db, servicioActualizado.nombreServicio);
        servicioActualizado.nombreServicio = servicioRef;
      }

      const servicioDoc = doc(db, "servicios", id);
      console.log(servicioDoc);
      await updateDoc(servicioDoc, servicioActualizado);
      getServicios();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteServicio = async (id) => {
    const servicioDoc = doc(db, "servicios", id);
    await deleteDoc(servicioDoc);
    getServicios();
  };

  useEffect(() => {
    getServicios();
  }, []);

  return {
    servicios: cachedServicios,
    isLoading,
    addServicio,
    getServicioById,
    updateServicio,
    deleteServicio,
    paginaSiguiente,
    paginaAnterior,
    getServicios,
    serviciosPorFecha,
    getServiciosPorRangoDeFecha,
    serviciosRangoFecha,
  };
};

export default useServicioLogic;
