import multer from "multer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// Obtenemos el nombre del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Subimos dos niveles desde el directorio actual para llegar a la raíz del proyecto
const rootDir = path.resolve(__dirname, '../../');

// Definimos la ruta donde queremos guardar los archivos (carpeta 'public' en la raíz)
const uploadPath = path.join(rootDir, '../public');

// Si la carpeta 'public' no existe, la creamos recursivamente
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);  // carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // usar el nombre original del archivo
    }
});

// Exportamos el middleware multer configurado
export const uploader = multer({ storage });

