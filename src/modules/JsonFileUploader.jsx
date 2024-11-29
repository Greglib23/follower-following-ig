import { useState } from "react";
import FollowersInfo from "./FollowersInfo";

const JsonFileUploader = () => {
    const [json1, setJson1] = useState(null); // Estado para guardar los datos del JSON1
    const [json2, setJson2] = useState(null); // Estado para guardar los datos del JSON2
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleFileUpload = (event, setData) => {
        const file = event.target.files?.[0]; // Obtener el archivo seleccionado
        if (file) {
            const reader = new FileReader(); // Crear un lector de archivos
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result); // Analizar el contenido como JSON
                    setData(json); // Guardar los datos en el estado
                    setError(null); // Limpiar errores anteriores
                } catch (err) {
                    console.log(err);
                    setError("El archivo no es un JSON válido"); // Manejar errores de formato
                    setData(null);
                }
            };
            reader.readAsText(file); // Leer el contenido del archivo como texto
        }
    };

    return (
        <div>
            {(!json1 || !json2) && (
                <>
                    <h2>Cargar archivo following.json</h2>
                    <input type="file" accept=".json" onChange={(e) => handleFileUpload(e, setJson1)} />
                    <h2>Cargar archivo followers_1.json</h2>
                    <input type="file" accept=".json" onChange={(e) => handleFileUpload(e, setJson2)} />
                </>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {json1 && json2 && <FollowersInfo json1={json1} json2={json2} />
            }
        </div>
    );
};

export default JsonFileUploader;